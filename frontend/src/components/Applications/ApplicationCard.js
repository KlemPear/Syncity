import React from "react";
import { connect } from "react-redux";
import { likeApplication } from "../../actions/index";
import Loader from "../Loader";
import { playTrack, createNotification } from "../../actions";
import TrackLink from "../Catalog/TrackLink";
//mui
import {
	List,
	ListItem,
	IconButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Box,
	Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { red } from "@mui/material/colors";

class ApplicationCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			liked: this.props.application?.liked,
			likedTracks: this.props.likedTracks ?? [],
		};
	}

	onToggleLikeTrack = (trackId) => {
		if (!this.props.userId) {
			return null;
		}
		const currentLikedTracks = this.state.likedTracks;
		const index = currentLikedTracks.indexOf(trackId);
		if (index > -1) {
			currentLikedTracks.splice(index, 1);
			this.setState({
				likedTracks: currentLikedTracks.length > 0 ? currentLikedTracks : [],
			});
		} else {
			currentLikedTracks.push(trackId);
			this.setState({ likedTracks: currentLikedTracks });
		}

		const updatedApp = this.props.application;
		updatedApp.likedTracks = this.state.likedTracks;
		this.props.likeApplication(updatedApp);
		// Notify application author that his track was liked
		const notif = {
			title: "Your track was liked!",
			description: `A track from your application for ${this.props.brief.title} was liked!`,
			link: "/list-applications",
			date: Date.now(),
			user: updatedApp.author._id,
		};
		this.props.createNotification(notif);
	};

	onPlayTrack = (track) => {
		this.props.playTrack(track);
	};

	renderTracks = (tracks) => {
		return (
			<>
				<List>
					{tracks.length !== 0
						? tracks.map((track) => (
								<Box key={track._id}>
									<ListItem
										secondaryAction={
											<Box>
												{this.props.likedTracks.includes(track._id) ? (
													<Button
														variant="contained"
														onClick={() => this.props.onValidateOnSubmit(track)}
													>
														License this track!
													</Button>
												) : null}
												<IconButton
													edge="end"
													onClick={() => this.onToggleLikeTrack(track._id)}
												>
													{this.props.likedTracks.includes(track._id) ? (
														<FavoriteIcon sx={{ color: red[500] }} />
													) : (
														<FavoriteIcon />
													)}
												</IconButton>
											</Box>
										}
									>
										<TrackLink track={track} />
									</ListItem>
									{/* <Collapse
										in={this.props.likedTracks.includes(track._id)}
										timeout="auto"
										unmountOnExit
									>
										<List component="div" disablePadding>
											<ListItem sx={{ pl: 4 }} disablePadding>
												<ListItemIcon>
													<EmailIcon />
												</ListItemIcon>
												<ListItemText
													primary={`Publisher: ${track.publisherContact}`}
												/>
											</ListItem>
											<ListItem sx={{ pl: 4 }} disablePadding>
												<ListItemIcon>
													<EmailIcon />
												</ListItemIcon>
												<ListItemText
													primary={`Master: ${track.publisherContact}`}
												/>
											</ListItem>
										</List>
									</Collapse> */}
								</Box>
						  ))
						: null}
				</List>
			</>
		);
	};

	renderApplication(authorFirstName, authorLastName, authorEmail, tracks) {
		return (
			<>
				<ListItem
					sx={{ border: 1, borderRadius: "16px", m: 1 }}
					// secondaryAction={
					// 	<IconButton edge="end" onClick={() => this.onToggleLike()}>
					// 		{this.state.liked ? (
					// 			<FavoriteIcon sx={{ color: red[500] }} />
					// 		) : (
					// 			<FavoriteIcon />
					// 		)}
					// 	</IconButton>
					// }
				>
					<ListItemAvatar>
						<Avatar sx={{ bgcolor: "#458FF7" }}>
							<AudiotrackIcon color="primary" />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						// secondary={`Submitted by ${authorFirstName} ${authorLastName} - ${authorEmail}`}
						primary={this.renderTracks(tracks)}
					/>
				</ListItem>
			</>
		);
	}

	render() {
		if (!this.props.application) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return this.renderApplication(
				this.props.application.author.firstName,
				this.props.application.author.lastName,
				this.props.application.author.email,
				this.props.application.tracks
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		userId: state.auth?.user?._id,
		application: state.applications[ownProps.applicationId],
		likedTracks: state.applications[ownProps.applicationId].likedTracks,
	};
};

export default connect(mapStateToProps, {
	likeApplication,
	playTrack,
	createNotification,
})(ApplicationCard);
