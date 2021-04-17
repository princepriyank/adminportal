import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
	Edit,
	Flag,
	Star,
	StarBorder,
	Visibility,
	VisibilityOff,
} from "@material-ui/icons";
import React, { useState } from "react";
import { AddForm } from "./notices-props/add-form";
import { EditForm } from "./notices-props/edit-form";

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
	attached: {
		"& > span": { paddingLeft: `8px` },
		"& > span:first-child": {
			paddingLeft: 0,
		},
	},
}));

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
