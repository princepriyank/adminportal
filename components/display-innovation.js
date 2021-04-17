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
	LocationOn,
	Link,
	Description,
	Flag,
	VisibilityOff,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		boxSizing: `border-box`,
	},
	paper: {
		margin: `${theme.spacing(1)}px auto`,
		padding: `${theme.spacing(1.5)}px`,
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
	attached: {
		"& > span": { paddingLeft: `8px` },
		"& > span:first-child": {
			paddingLeft: 0,
		},
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
				+ Add Image
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
							inputProps={{ accept: "image/*" }}
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
		description: "",
	});
	const [submitting, setSubmitting] = useState(false);

	const [attachments, setAttachments] = useState([
		{ caption: "", url: "", value: "" },
	]);
	const handleChange = (e) => {
		setContent({ ...content, [e.target.name]: e.target.value });
		//console.log(content)
	};

	const handleSubmit = async (e) => {
		setSubmitting(true);
		e.preventDefault();
		let open = new Date(content.openDate);
		let close = new Date(content.closeDate);
		open = open.getTime();
		close = close.getTime();
		let now = Date.now();

		let data = {
			...content,
			id: now,
			openDate: open,
			closeDate: close,
			timestamp: now,
			email: session.user.email,
			author: session.user.name,
			image: [...attachments],
		};
		for (let i = 0; i < data.image.length; i++) {
			delete data.image[i].value;
			// if (data.image[i].url === undefined) {
			// 	data.image[i].url = "";
			// }
			console.log(data.image[i]);

			if (data.image[i].url) {
				let file = new FormData();
				file.append("files", data.image[i].url);
				// console.log(file.get("files"));
				let viewLink = await fetch("/api/gdrive/uploadfiles", {
					method: "POST",
					body: file,
				});
				viewLink = await viewLink.json();
				// console.log("Client side link");
				// console.log(viewLink);
				data.image[i].url = viewLink[0].webViewLink;
			} else {
				console.log("Request Not Sent");
			}
		}
		// data.attachments = JSON.stringify(data.attachments);

		let result = await fetch("/api/create/innovation", {
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
						Add Innovations
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
							id="desc"
							label="Description"
							type="text"
							fullWidth
							placeholder={"Description"}
							name="description"
							required
							onChange={(e) => handleChange(e)}
							value={content.description}
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

						<h2>Attachments</h2>
						<AddAttachments
							attachments={attachments}
							setAttachments={setAttachments}
						/>
						{/* <a href={data.attachments} target="_blank">
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
	const [session, loading] = useSession();
	const [content, setContent] = useState({
		id: data.id,
		title: data.title,
		openDate: dateformatter(data.openDate),
		closeDate: dateformatter(data.closeDate),
		description: data.description,
	});
	const [submitting, setSubmitting] = useState(false);

	const [image, setImage] = useState(data.image);
	const handleChange = (e) => {
		setContent({ ...content, [e.target.name]: e.target.value });
		//console.log(content)
	};
	const handleAttachments = (e, idx) => {
		let attach = [...image];
		attach[idx].caption = e.target.value;
		setImage(attach);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		let open = new Date(content.openDate);
		let close = new Date(content.closeDate);
		open = open.getTime();
		close = close.getTime();
		let now = Date.now();

		let finaldata = {
			...content,
			openDate: open,
			closeDate: close,
			timestamp: now,
			email: session.user.email,
			author: session.user.name,
			image: [...image],
		};

		console.log(finaldata);
		let result = await fetch("/api/update/innovation", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(finaldata),
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
				<form onSubmit={(e) => handleSubmit(e)}>
					<DialogTitle disableTypography style={{ fontSize: `2rem` }}>
						Edit Innovations
						<Delete color="secondary" />
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
							id="desc"
							label="Description"
							type="text"
							fullWidth
							placeholder={"Description"}
							name="description"
							required
							onChange={(e) => handleChange(e)}
							value={content.description}
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
						/>
						{data.image && (
							<>
								<h2>Images</h2>
								{image.map((img, idx) => {
									return (
										<div key={idx}>
											<TextField
												id="attachments"
												margin="dense"
												type="text"
												value={img.caption}
												onChange={(e) => handleAttachments(e, idx)}
												InputLabelProps={{
													shrink: true,
												}}
											/>
											<a href={img.url} target="_blank">
												<Link />
											</a>
										</div>
									);
								})}
							</>
						)}
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

const DescriptionModal = ({ handleClose, modal, data }) => {
	return (
		<>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={modal}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Description
				</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>{data.description}</Typography>
				</DialogContent>
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
					Recent Innovations
				</Typography>
				<Button variant="contained" color="primary" onClick={addModalOpen}>
					ADD +
				</Button>
			</header>

			<AddForm handleClose={handleCloseAddModal} modal={addModal} />

			<Grid container spacing={2} className={classes.root}>
				{details.map((detail) => {
					let openDate = new Date(detail.timestamp);
					let dd = openDate.getDate();
					let mm = openDate.getMonth() + 1;
					let yyyy = openDate.getFullYear();
					openDate = dd + "/" + mm + "/" + yyyy;

					const [editModal, setEditModal] = useState(false);
					const [descriptionModal, setDescriptionModal] = useState(false);

					const editModalOpen = () => {
						setEditModal(true);
					};

					const handleCloseEditModal = () => {
						setEditModal(false);
					};

					const descModalOpen = () => {
						setDescriptionModal(true);
					};

					const handleCloseDescModal = () => {
						setDescriptionModal(false);
					};

					return (
						<React.Fragment key={detail.id}>
							<Grid item xs={12} sm={8} lg={10}>
								<Paper
									className={classes.paper}
									style={{ minHeight: `50px`, position: `relative` }}
								>
									<span className={classes.truncate}>{detail.title}</span>
									<div className={classes.attached}>
										{detail.image &&
											detail.image.map((img, idx) => {
												return (
													<span
														key={idx}
														style={{
															display: `inline-flex`,
															margin: `5px 0 `,
														}}
													>
														<Flag />
														<a href={img.url} target="_blank">
															{img.caption}
														</a>
													</span>
												);
											})}
									</div>{" "}
									<span
										style={{
											position: `absolute`,
											right: `12px`,
											bottom: `12px`,
										}}
									>
										{openDate}
									</span>
								</Paper>
							</Grid>

							<Grid item xs={6} sm={2} lg={1}>
								<Paper
									className={classes.paper}
									style={{ textAlign: `center`, cursor: `pointer` }}
									onClick={descModalOpen}
								>
									<Description className={classes.icon} />
									<span>Description</span>
								</Paper>
								<DescriptionModal
									data={detail}
									handleClose={handleCloseDescModal}
									modal={descriptionModal}
								/>
							</Grid>
							<Grid item xs={6} sm={2} lg={1}>
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

// Extras
// 	<Grid item xs={4} sm={2} lg={1}>
// 								<Paper
// 									className={classes.paper}
// 									style={{ textAlign: `center` }}
// 								>
// 									{detail.isVisible ? (
// 										<>
// 											<Visibility className={classes.icon} />
// 											{/* <i className="fa fa-eye" style={{ color: "action" }}></i> */}
// 											<span>Visible</span>
// 										</>
// 									) : (
// 										<>
// 											{/* <i
// 												className="fa fa-eye-slash"
// 												style={{ color: "secondary" }}
// 											></i> */}
// 											<VisibilityOff
// 												color="secondary"
// 												className={classes.icon}
// 											/>
// 											<span>Archive</span>
// 										</>
// 									)}
// 								</Paper>
// 							</Grid >
