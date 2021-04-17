import { Checkbox, FormControlLabel } from "@material-ui/core";
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
		isVisible: data.isVisible ? true : false,
		important: data.important ? true : false,
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

			isVisible: content.isVisible ? 1 : 0,
			important: content.important ? 1 : 0,
			openDate: open,
			closeDate: close,
			timestamp: now,
			email: session.user.email,
			attachments: [...attachments],
		};

		console.log(finaldata);
		let result = await fetch("/api/update/notice", {
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
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<DialogTitle
						disableTypography
						style={{ fontSize: `2rem`, position: "relative" }}
					>
						Edit Notice
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
