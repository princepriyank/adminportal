import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import { AddAttachments } from "./../common-props/add-attachment";

export const AddForm = ({ handleClose, modal }) => {
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
