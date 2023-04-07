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
	Typography,
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
			description: `A track for ${this.props.brief.title} was liked!`,
			link: "/list-applications",
			date: Date.now(),
			user: updatedApp.author._id,
		};
		this.props.createNotification(notif);
	};

	onPlayTrack = (track) => {
		this.props.playTrack(track);
	};

	renderTracks = (tracks, tracksComments) => {
		var tracksCommentsObj = {};
		tracksComments?.map(
			(track) => (tracksCommentsObj[track.trackId] = track.comment)
		);
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
													<>
														{this.props.application.licensingJobStatus !==
														"None" ? (
															<Button variant="contained">
																{`License ${this.props.application.licensingJobStatus}`}
															</Button>
														) : (
															<Button
																variant="contained"
																onClick={() =>
																	this.props.onValidateOnSubmit(
																		track,
																		this.props.application
																	)
																}
															>
																License this track!
															</Button>
														)}
													</>
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
									{tracksCommentsObj[track._id] && (
										<ListItem>
											<Typography variant="body2">{`From pitcher: "${
												tracksCommentsObj[track._id]
											}"`}</Typography>
										</ListItem>
									)}
								</Box>
						  ))
						: null}
				</List>
			</>
		);
	};

	renderApplication(application) {
		return (
			<>
				<ListItem sx={{ border: 1, borderRadius: "16px", m: 1 }}>
					<ListItemAvatar>
						<Avatar sx={{ bgcolor: "#458FF7" }}>
							<AudiotrackIcon color="primary" />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={this.renderTracks(
							application.tracks,
							application.tracksComments
						)}
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
			return this.renderApplication(this.props.application);
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
