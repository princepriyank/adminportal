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
		venue: "",
		doclink: "",
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

		let result = await fetch("/api/create/event", {
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
						Add Event
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
						<TextField
							margin="dense"
							id="venue"
							label="Venue"
							type="text"
							fullWidth
							placeholder={"Venue of Event"}
							name="venue"
							type="text"
							required
							onChange={(e) => handleChange(e)}
							value={content.venue}
						/>
						<TextField
							margin="dense"
							id="Doclink"
							label="Registration form link (like: Google Doc, etc.) "
							type="text"
							fullWidth
							placeholder={"Leave it blank if not available"}
							name="doclink"
							type="text"
							onChange={(e) => handleChange(e)}
							value={content.doclink}
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
		doclink: data.doclink,
		venue: data.venue,
	});

	const [attachments, setAttachments] = useState(data.attachments);
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (e) => {
		if (e.target.name == "important" || e.target.name == "isVisible") {
			setContent({ ...content, [e.target.name]: e.target.checked });
		} else {
			setContent({ ...content, [e.target.name]: e.target.value });
		}
		// console.log(content);
	};

	const handleAttachments = (e, idx) => {
		let attach = [...attachments];
		attach[idx].caption = e.target.value;
		setAttachments(attach);
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
			attachments: [...attachments],
		};

		console.log(finaldata);
		let result = await fetch("/api/update/event", {
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
						Edit Event
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
						<TextField
							margin="dense"
							id="venue"
							label="Venue"
							type="text"
							fullWidth
							placeholder={"Venue of Event"}
							name="venue"
							type="text"
							required
							onChange={(e) => handleChange(e)}
							value={content.venue}
						/>
						<TextField
							margin="dense"
							id="Doclink"
							label="Registration form link (like: Google Doc, etc.) "
							type="text"
							fullWidth
							placeholder={"Leave it blank if not available"}
							name="doclink"
							type="text"
							onChange={(e) => handleChange(e)}
							value={content.doclink}
						/>

						{data.attachments && (
							<>
								<h2>Attachments</h2>
								{attachments.map((attachment, idx) => {
									return (
										<div key={idx}>
											<TextField
												id="attachments"
												margin="dense"
												type="text"
												value={attachment.caption}
												onChange={(e) => handleAttachments(e, idx)}
												InputLabelProps={{
													shrink: true,
												}}
											/>
											<a href={attachment.url} target="_blank">
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
					Recent Events
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

					const editModalOpen = () => {
						setEditModal(true);
					};

					const handleCloseEditModal = () => {
						setEditModal(false);
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
										{detail.attachments &&
											detail.attachments.map((attachment, idx) => {
												return (
													<span
														key={idx}
														style={{
															display: `inline-flex`,
															margin: `5px 0 `,
														}}
													>
														<Flag />
														<a href={attachment.url} target="_blank">
															{attachment.caption}
														</a>
													</span>
												);
											})}
										<span
											style={{
												display: `inline-flex`,
												margin: `5px 0 `,
											}}
										>
											<LocationOn color="secondary" />
											{detail.venue}
										</span>
									</div>

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
									style={{ textAlign: `center` }}
								>
									<a href={detail.doclink} style={{ textDecoration: `none` }}>
										<Link className={classes.icon} />
										<span>Reg Link</span>
									</a>
								</Paper>{" "}
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
