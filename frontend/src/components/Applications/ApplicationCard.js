import React from "react";
import { connect } from "react-redux";
import { editApplication } from "../../actions/index";

//mui
import {
	List,
	ListItem,
	ListItemIcon,
	Collapse,
	IconButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Link,
	Box
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import EmailIcon from "@mui/icons-material/Email";
import { red } from "@mui/material/colors";

class ApplicationCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { liked: this.props.application.liked };
	}

	onToggleLike = () => {
		this.setState({ liked: !this.state.liked });
		const updatedApp = this.props.application;
		updatedApp.liked = !this.props.application.liked;
		this.props.editApplication(updatedApp);
	};

	renderTracks(tracks) {
		return (
			<>
				<List>
					{tracks.length !== 0
						? tracks.map((track) => (
								<Box key={track._id}>
									<ListItem>
										<Link underline="hover" href={track.link}>
											{track.title} - {track.artist}
										</Link>
									</ListItem>
									<Collapse in={this.state.liked} timeout="auto" unmountOnExit>
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
									</Collapse>
								</Box>
						  ))
						: null}
				</List>
			</>
		);
	}

	renderApplication(authorFirstName, authorLastName, authorEmail, tracks) {
		return (
			<>
				<ListItem
					sx={{ border: 1, borderRadius: "16px", m: 1 }}
					secondaryAction={
						<IconButton edge="end" onClick={() => this.onToggleLike()}>
							{this.state.liked ? (
								<FavoriteIcon sx={{ color: red[500] }} />
							) : (
								<FavoriteIcon />
							)}
						</IconButton>
					}
				>
					<ListItemAvatar>
						<Avatar sx={{ bgcolor: "#F6CD45" }}>
							<AudiotrackIcon color="primary" />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						secondary={`Submitted by ${authorFirstName} ${authorLastName} - ${authorEmail}`}
						primary={this.renderTracks(tracks)}
					/>
				</ListItem>
			</>
		);
	}

	render() {
		if (!this.props.application) {
			return <div></div>;
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
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { editApplication })(ApplicationCard);
