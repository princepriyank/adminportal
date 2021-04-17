import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useSession } from "next-auth/client";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import {
	Delete,
	Edit,
	Flag,
	Link,
	Visibility,
	Star,
	StarBorder,
	VisibilityOff,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: `${theme.spacing(1)} auto`,
		padding: theme.spacing(2),
		lineHeight: 1.5,
	},
	truncate: {
		display: `block`,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: `nowrap`,
	},
	icon: {
		display: `block`,
		fontSize: `2rem`,
		marginLeft: `auto`,
		marginRight: `auto`,
	},
}));

const AddAttachments = ({ attachments, setAttachments }) => {
	// const [attachments, setAttachments] = useState([{ value: "", file: "" }]);

	function handleChange(i, event) {
		const values = [...attachments];
		values[i].caption = event.target.value;
		setAttachments(values);
	}
	function handleChangeFile(i, event) {
		const values = [...attachments];
		values[i].url = event.target.files[0];
		values[i].value = event.target.value;
		// console.log(event);
		setAttachments(values);
	}

	function handleAdd() {
		const values = [...attachments];
		values.push({ caption: "", url: "", value: "" });
		setAttachments(values);
	}

	function handleRemove(i) {
		const values = [...attachments];
		values.splice(i, 1);
		setAttachments(values);
	}

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				type="button"
				onClick={() => handleAdd()}
			>
				+ Add Attachments
			</Button>
			{attachments.map((attachment, idx) => {
				return (
					<React.Fragment key={`${attachment}-${idx}`}>
						<TextField
							placeholder="SubTitle"
							fullWidth
							name="caption"
							value={attachment.caption}
							onChange={(e) => handleChange(idx, e)}
							style={{ margin: `8px` }}
						/>

						<TextField
							type="file"
							name="url"
							value={attachment.value}
							style={{ margin: `8px` }}
							onChange={(e) => {
								handleChangeFile(idx, e);
							}}
						/>

						<Button
							type="button"
							onClick={() => {
								handleRemove(idx);
							}}
							style={{ display: `inline-block`, fontSize: `1.5rem` }}
						>
							<Delete color="secondary" />{" "}
						</Button>
					</React.Fragment>
				);
			})}
			{/* <button type="button" onClick={() => console.log(attachments)}>
				Status
			</button> */}
		</>
	);
};

const dateformatter = (date) => {
	var format_date = new Date(date);
	var dd = format_date.getDate();

	var mm = format_date.getMonth() + 1;
	var yyyy = format_date.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}
	return yyyy + "-" + mm + "-" + dd;
};

const AddForm = ({ handleClose, modal }) => {
	const [session, loading] = useSession();
	const [content, setContent] = useState({
		title: "",
		openDate: "",
		closeDate: "",
		isVisible: false,
		important: false,
	});

	const [attachments, setAttachments] = useState([
		{ caption: "", url: "", value: "" },
	]);
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (e) => {
		if (e.target.name == "important" || e.target.name == "isVisible") {
			setContent({ ...content, [e.target.name]: e.target.checked });
		} else {
			setContent({ ...content, [e.target.name]: e.target.value });
		}
		// console.log(content);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		let open = new Date(content.openDate);
		let close = new Date(content.closeDate);
		open = open.getTime();
		close = close.getTime();
		let now = Date.now();

		let data = {
			...content,
			id: now,
			isVisible: content.isVisible ? 1 : 0,
			important: content.important ? 1 : 0,
			openDate: open,
			closeDate: close,
			timestamp: now,
			email: session.user.email,
			attachments: [...attachments],
		};
		for (let i = 0; i < data.attachments.length; i++) {
			delete data.attachments[i].value;
			// if (data.attachments[i].url === undefined) {
			// 	data.attachments[i].url = "";
			// }
			console.log(data.attachments[i]);

			if (data.attachments[i].url) {
				let file = new FormData();
				file.append("files", data.attachments[i].url);
				// console.log(file.get("files"));
				let viewLink = await fetch("/api/gdrive/uploadfiles", {
					method: "POST",
					body: file,
				});
				viewLink = await viewLink.json();
				// console.log("Client side link");
				// console.log(viewLink);
				data.attachments[i].url = viewLink[0].webViewLink;
			} else {
				console.log("Request Not Sent");
			}
		}
		// data.attachments = JSON.stringify(data.attachments);

		let result = await fetch("/api/create/notice", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		});
		result = await result.json();
		if (result instanceof Error) {
			console.log("Error Occured");
			console.log(result);
		}
		console.log(result);
		window.location.reload();
	};

	return (
		<>
			<Dialog open={modal} onClose={handleClose}>
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<DialogTitle disableTypography style={{ fontSize: `2rem` }}>
						Add Notice
					</DialogTitle>
					<DialogContent>
						<TextField
							margin="dense"
							id="label"
							label="Title"
							name="title"
							type="text"
							required
							fullWidth
							placeholder="Title"
							onChange={(e) => handleChange(e)}
							value={content.title}
						/>
						<TextField
							margin="dense"
							id="openDate"
							label="Open Date"
							name="openDate"
							type="date"
							required
							value={content.openDate}
							onChange={(e) => handleChange(e)}
							fullWidth
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							id="closeDate"
							label="Close Date"
							name="closeDate"
							margin="dense"
							required
							type="date"
							onChange={(e) => handleChange(e)}
							value={content.closeDate}
							fullWidth
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="important"
									checked={content.important}
									onChange={(e) => handleChange(e)}
								/>
							}
							label="Important"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="isVisible"
									checked={content.isVisible}
									onChange={(e) => handleChange(e)}
								/>
							}
							label="Visibility"
						/>
						<h2>Attachments</h2>
						<AddAttachments
							attachments={attachments}
							setAttachments={setAttachments}
						/>
						{/* <a href={data.attachments} target="__blank">
							<FontAwesomeIcon icon={faExternalLinkAlt} />
						</a> */}
					</DialogContent>
					<DialogActions>
						{submitting ? (
							<Button type="submit" color="primary" disabled>
								Submitting
							</Button>
						) : (
							<Button type="submit" color="primary">
								Submit
							</Button>
						)}
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

const EditForm = ({ data, handleClose, modal }) => {
	let openDate = dateformatter(data.openDate);
	// console.log(openDate);
	const [important, setImportant] = useState(data.important);
	const [isVisible, setIsVisible] = useState(data.isVisible);

	let closeDate = dateformatter(data.closeDate);
	const handleBooleanChange = (name) => {
		if (name == "important") {
			setImportant(!important);
		} else if (name == "visibility") {
			setIsVisible(!isVisible);
		}
	};

	return (
		<>
			<Dialog open={modal} onClose={handleClose}>
				<DialogTitle disableTypography style={{ fontSize: `2rem` }}>
					Edit Notice
					<Delete color="secondary" />
				</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						id="label"
						label="Title"
						type="text"
						fullWidth
						defaultValue={data.title}
					/>{" "}
					<TextField
						margin="dense"
						id="openDate"
						label="Open Date"
						type="date"
						fullWidth
						defaultValue={openDate}
						// onChange={(e) => {
						// 	console.log(e.target.value);
						// 	let da = new Date(e.target.value);
						// 	console.log(
						// 		" " +
						// 			da.getTime() +
						// 			" " +
						// 			da.getMonth() +
						// 			" " +
						// 			da.getDate() +
						// 			" " +
						// 			da.getFullYear()
						// 	);
						// }}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="closeDate"
						label="Close Date"
						margin="dense"
						type="date"
						fullWidth
						defaultValue={closeDate}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={important}
								onChange={(e) => {
									handleBooleanChange(e.target.name);
								}}
								name="important"
							/>
						}
						label="Important"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={isVisible}
								onChange={(e) => {
									handleBooleanChange(e.target.name);
								}}
								name="visibility"
							/>
						}
						label="Visibility"
					/>
					{data.attachments && (
						<>
							<h2>Attachments</h2>
							{data.attachments.map((attachment) => {
								return (
									<>
										<TextField
											id="attachments"
											margin="dense"
											type="text"
											value={attachment.caption}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										<a href={attachment.url} target="__blank">
											<Link />
										</a>
									</>
								);
							})}
						</>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

const DataDisplay = (props) => {
	const classes = useStyles();
	const [details, setDetails] = useState(props.data);

	const [addModal, setAddModal] = useState(false);
	const addModalOpen = () => {
		setAddModal(true);
	};
	const handleCloseAddModal = () => {
		setAddModal(false);
	};

	return (
		<div>
			<header>
				<Typography variant="h4" style={{ margin: `15px 0` }}>
					Recent Notices
				</Typography>
				<Button variant="contained" color="primary" onClick={addModalOpen}>
					ADD +
				</Button>
			</header>

			<AddForm handleClose={handleCloseAddModal} modal={addModal} />

			<Grid container spacing={3} className={classes.root}>
				{details.map((detail) => {
					let openDate = new Date(detail.timestamp);
					let dd = openDate.getDate();
					let mm = openDate.getMonth() + 1;
					let yyyy = openDate.getFullYear();
					openDate = dd + "/" + mm + "/" + yyyy;

					const [editModal, setEditModal] = useState(false);

					const editModalOpen = () => {
						setEditModal(true);
					};

					const handleCloseEditModal = () => {
						setEditModal(false);
					};

					return (
						<React.Fragment key={detail.id}>
							<Grid item xs={12} sm={6} lg={9}>
								<Paper className={classes.paper}>
									<span className={classes.truncate}>{detail.title}</span>
									{detail.attachments &&
										detail.attachments.map((attachment) => {
											return (
												<>
													<Flag />
													<a href={attachment.url}>{attachment.caption}</a>
												</>
											);
										})}

									<span style={{ float: "right" }}>{openDate}</span>
								</Paper>
							</Grid>
							<Grid item xs={4} sm={2} lg={1}>
								<Paper
									className={classes.paper}
									style={{ textAlign: `center` }}
								>
									{detail.isVisible ? (
										<>
											<Visibility className={classes.icon} />
											{/* <i className="fa fa-eye" style={{ color: "action" }}></i> */}
											<span>Visible</span>
										</>
									) : (
										<>
											{/* <i
												className="fa fa-eye-slash"
												style={{ color: "secondary" }}
											></i> */}
											<VisibilityOff
												color="secondary"
												className={classes.icon}
											/>
											<span>Archive</span>
										</>
									)}
								</Paper>
							</Grid>
							<Grid item xs={4} sm={2} lg={1}>
								<Paper
									className={classes.paper}
									style={{ textAlign: `center` }}
								>
									{detail.important ? (
										<>
											<Star className={classes.icon} />
											{/* <i className="fa fa-star" style={{ color: "secondary" }}></i> */}
											<span>Important</span>
										</>
									) : (
										<>
											{/* <i className="fa fa-star" style={{ color: "action" }}></i> */}
											<StarBorder className={classes.icon} />
											<span>Normal</span>
										</>
									)}
								</Paper>{" "}
							</Grid>
							<Grid item xs={4} sm={2} lg={1}>
								<Paper
									className={classes.paper}
									style={{ textAlign: `center`, cursor: `pointer` }}
									onClick={editModalOpen}
								>
									<Edit className={classes.icon} /> <span>Edit</span>
								</Paper>{" "}
								<EditForm
									data={detail}
									modal={editModal}
									handleClose={handleCloseEditModal}
								/>
							</Grid>
						</React.Fragment>
					);
				})}
				{/* <Grid >
            <Paper xs={12} sm={9}>{detail.title}</Paper>
         </Grid> */}
			</Grid>
		</div>
	);
};

export default DataDisplay;
