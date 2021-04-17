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
		description: data.description,
	});
	const [submitting, setSubmitting] = useState(false);

	const [verifyDelete, setVerifyDelete] = useState(false);
	const handleDelete = () => {
		setVerifyDelete(false);
	};

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
		let result = await fetch("/api/update/news", {
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
						style={{ fontSize: `2rem`, position: "relative" }}
					>
						Edit Innovations
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
