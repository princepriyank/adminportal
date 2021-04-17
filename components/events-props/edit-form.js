import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Delete, Link } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import React, { useState } from "react";

import { dateformatter } from "./../common-props/date-formatter";
import { ConfirmDelete } from "./confirm-delete";

export const EditForm = ({ data, handleClose, modal }) => {
	const [session, loading] = useSession();
	const [content, setContent] = useState({
		id: data.id,
		title: data.title,
		openDate: dateformatter(data.openDate),
		closeDate: dateformatter(data.closeDate),
		doclink: data.doclink,
		venue: data.venue,
	});

	const [verifyDelete, setVerifyDelete] = useState(false);
	const handleDelete = () => {
		setVerifyDelete(false);
	};
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
					<DialogTitle
						disableTypography
						style={{ fontSize: `2rem`, position: `relative` }}
					>
						Edit Event
						<i
							style={{ position: `absolute`, right: `15px`, cursor: `pointer` }}
						>
							<Delete
								type="button"
								onClick={() => setVerifyDelete(true)}
								style={{ height: `2rem`, width: `auto` }}
								color="secondary"
							/>
						</i>
					</DialogTitle>
					<ConfirmDelete
						modal={verifyDelete}
						handleClose={handleDelete}
						id={content.id}
					/>
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
