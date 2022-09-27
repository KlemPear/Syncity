import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { moneyFormatter, getNumberOfDays } from "../../util/textFormatHelper";
import { playTrack } from "../../actions";
//mui
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import {
	Box,
	Stack,
	Divider,
	Badge,
	ButtonGroup,
	List,
	Tooltip,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import MuiLink from "@mui/material/Link";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

//colors
import {
	red,
	deepPurple,
	blue,
	green,
	deepOrange,
	yellow,
	pink,
	teal,
	amber,
	indigo,
} from "@mui/material/colors";
// Media Icons
import FilmIcon from "@mui/icons-material/Theaters";
import WebIcon from "@mui/icons-material/RssFeed";
import TvIcon from "@mui/icons-material/Tv";
import AdvertisingIcon from "@mui/icons-material/Sell";
import VideoGameIcon from "@mui/icons-material/SportsEsports";
import TrailerIcon from "@mui/icons-material/Movie";
import RadioIcon from "@mui/icons-material/Radio";
import PodcastIcon from "@mui/icons-material/Podcasts";
import CorporateIcon from "@mui/icons-material/CorporateFare";
import OtherIcon from "@mui/icons-material/AudioFile";

const mediaMapping = {
	Film: {
		icon: <FilmIcon />,
		color: red,
	},
	Web: {
		icon: <WebIcon />,
		color: deepPurple,
	},
	TV: {
		icon: <TvIcon />,
		color: blue,
	},
	Advertising: {
		icon: <AdvertisingIcon />,
		color: green,
	},
	"Video Game": {
		icon: <VideoGameIcon />,
		color: deepOrange,
	},
	Trailer: {
		icon: <TrailerIcon />,
		color: yellow,
	},
	Radio: {
		icon: <RadioIcon />,
		color: pink,
	},
	Podcast: {
		icon: <PodcastIcon />,
		color: teal,
	},
	Corporate: {
		icon: <CorporateIcon />,
		color: amber,
	},
	Other: {
		icon: <OtherIcon />,
		color: indigo,
	},
	"All Media": {
		icon: <OtherIcon />,
		color: indigo,
	},
};

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

class BriefCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expanded: false };
	}

	handleExpandClick = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	onPlayTrack = (track) => {
		this.props.playTrack(track);
	};

	renderReference = (ref) => {
		return (
			<Box key={ref.link}>
				<List key={ref.link}>
					<ListItem>
						<Stack>
							{/* <MuiLink underline="hover" href={ref.link}>
								{ref.title ? ref.title : "Link to reference song"}
							</MuiLink> */}
							<MuiLink
								underline="hover"
								onClick={() => this.onPlayTrack({ link: ref.link })}
							>
								{ref.title}
							</MuiLink>
							{ref.comment ? (
								<List>
									<ListItem>
										<Typography>Comment: {ref.comment}</Typography>
									</ListItem>
								</List>
							) : null}
						</Stack>
					</ListItem>
				</List>
			</Box>
		);
	};

	renderSubheader(brief) {
		const numberOfDaysLeft = getNumberOfDays(
			new Date(Date.now()),
			brief.dueDate
		);
		return (
			<>
				<Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
					<HourglassBottomIcon sx={{ m: 0, p: 0 }} />
					{numberOfDaysLeft > 0
						? `${numberOfDaysLeft} days left`
						: `${(numberOfDaysLeft * -1).toString()} days past due date`}
				</Typography>
				<Typography>
					Budget: {moneyFormatter.format(brief.budget)} all in
				</Typography>
			</>
		);
	}

	renderHeader(brief) {
		return (
			<>
				<Typography variant="h6">{brief.title}</Typography>
			</>
		);
	}

	renderAvatar(media) {
		return (
			<Tooltip title={media}>
				<Avatar
					sx={{ bgcolor: mediaMapping[media]?.color[500] }}
					aria-label="media"
				>
					{mediaMapping[media]?.icon}
				</Avatar>
			</Tooltip>
		);
	}

	renderCollaspableInfo(brief) {
		return (
			<>
				<Typography>License Terms:</Typography>
				<List>
					<ListItem>Media: {brief.media}</ListItem>
					<ListItem>Use: {brief.use.join(", ")}</ListItem>
					<ListItem>License Duration: {brief.licenseDuration}</ListItem>
					<ListItem>Extract Duration: {brief.extractDuration} minutes</ListItem>
					<ListItem>Territory: {brief.territory.join(", ")}</ListItem>
				</List>
				<br />
				<Typography>Type Of Music Needed:</Typography>
				<List>
					<ListItem>Genre(s): {brief.genres.join(", ")}</ListItem>
					<ListItem>Vocal(s): {brief.vocals.join(", ")}</ListItem>
					<ListItem>Mood(s): {brief.moods.join(", ")}</ListItem>
					<ListItem>Instrument(s): {brief.instruments.join(", ")}</ListItem>
					<ListItem>Tempo: {brief.tempo}</ListItem>
					<ListItem>Exclusivity: {brief.exclusivity ? "Yes" : "No"}</ListItem>
				</List>
				<br />
				{brief.references?.length !== 0 ? (
					<>
						<Typography>Reference(s):</Typography>
						{brief.references?.map((ref) => this.renderReference(ref))}
					</>
				) : null}
			</>
		);
	}

	renderMuiBrief(brief) {
		return (
			<Card
				sx={{ width: 300, height: "auto", minHeight: 350, maxHeight: 500 }}
				elevation={8}
			>
				<CardHeader
					avatar={this.renderAvatar(brief.media)}
					title={this.renderHeader(brief)}
					subheader={this.renderSubheader(brief)}
					sx={{
						height: 150,
						overflow: "hidden",
						overflowY: "auto",
						py: 0.5,
					}}
				/>
				<Divider variant="middle" sx={{ margin: 1 }} />
				<CardContent sx={{ py: 0.5 }}>
					<Typography variant="body2" color="text.secondary">
						{brief.numberOfApplicationsWanted > 0
							? `${brief.numberOfApplicationsSubmitted} / ${brief.numberOfApplicationsWanted} applications already submitted`
							: null}
					</Typography>
				</CardContent>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						height: 100,
						overflow: "hidden",
						overflowY: "auto",
					}}
				>
					<CardContent sx={{ py: 0.5 }}>
						<Typography sx={{ mt: 0.5 }}>Description:</Typography>
						<Typography variant="body1" color="text.primary">
							{brief.description}
						</Typography>
					</CardContent>
				</Box>
				<CardActions disableSpacing>
					<Box
						sx={{
							alignSelf: "center",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							flexGrow: 5,
						}}
					>
						{brief.author === this.props.userId ? (
							<ButtonGroup
								variant="outlined"
								color="primary"
								size="small"
								aria-label="outlined button group"
							>
								<Button component={Link} to={`show-brief/edit/${brief._id}`}>
									Edit
								</Button>
								<Button
									component={Link}
									to={`show-brief/${brief._id}/applications`}
								>
									View Applications
								</Button>
							</ButtonGroup>
						) : (
							<Box>
								{brief.numberOfApplicationsWanted ===
									brief.numberOfApplicationsSubmitted ||
								getNumberOfDays(new Date(Date.now()), brief.dueDate) < 0 ? (
									<Button variant="contained" color="primary">
										Closed
									</Button>
								) : (
									<Button
										variant="contained"
										color="primary"
										component={Link}
										to={`show-brief/${brief._id}`}
									>
										Apply
									</Button>
								)}
							</Box>
						)}
					</Box>
					<ExpandMore
						expand={this.state.expanded}
						onClick={this.handleExpandClick}
						aria-expanded={this.state.expanded}
						aria-label="show more"
						sx={{ alignSelf: "flex-end" }}
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						maxHeight: 150,
						overflow: "hidden",
						overflowY: "auto",
					}}
				>
					<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
						<Divider variant="middle" sx={{ margin: 1 }} />
						<CardContent>{this.renderCollaspableInfo(brief)}</CardContent>
					</Collapse>
				</Box>
			</Card>
		);
	}

	renderApplicationAvatar(application) {
		const brief = application.brief;
		const SmallAvatar = styled(Avatar)(({ theme }) => ({
			width: 22,
			height: 22,
			border: `2px solid ${theme.palette.background.paper}`,
		}));

		if (application.liked) {
			return (
				<Badge
					overlap="circular"
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					badgeContent={
						<SmallAvatar sx={{ bgcolor: "white" }} aria-label="media">
							<FavoriteIcon sx={{ color: red[500] }} />
						</SmallAvatar>
					}
				>
					{this.renderAvatar(brief.media)}
				</Badge>
			);
		} else {
			return <>{this.renderAvatar(brief.media)}</>;
		}
	}

	renderMuiApplication(application) {
		const brief = application.brief;
		return (
			<Card
				sx={{ width: 300, height: "auto", minHeight: 350, maxHeight: 600 }}
				elevation={8}
			>
				<CardHeader
					avatar={this.renderApplicationAvatar(application)}
					title={this.renderHeader(brief)}
					subheader={this.renderSubheader(brief)}
					sx={{
						height: 150,
						overflow: "hidden",
						overflowY: "auto",
						py: 0.5,
					}}
				/>
				<Divider variant="middle" sx={{ margin: 1 }} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						maxHeight: 100,
						overflow: "hidden",
						overflowY: "auto",
					}}
				>
					<CardContent sx={{ py: 0.5 }}>
						<Stack direction="row" justifyContent="space-between">
							<Typography>Description:</Typography>
							<ExpandMore
								expand={this.state.expanded}
								onClick={this.handleExpandClick}
								aria-expanded={this.state.expanded}
								aria-label="show more"
								align="right"
							>
								<ExpandMoreIcon align="right" />
							</ExpandMore>
						</Stack>

						<Typography variant="body1" color="text.primary">
							{brief.description}
						</Typography>
					</CardContent>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						maxHeight: 150,
						overflow: "hidden",
						overflowY: "auto",
					}}
				>
					<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
						<Divider variant="middle" sx={{ margin: 1 }} />
						<CardContent>{this.renderCollaspableInfo(brief)}</CardContent>
					</Collapse>
				</Box>
				<Divider variant="middle" sx={{ margin: 1 }} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						maxHeight: 150,
						overflow: "hidden",
						overflowY: "auto",
					}}
				>
					<CardContent sx={{ py: 0.5 }}>
						<Typography variant="h6">Tracks you submitted:</Typography>
						<List>
							{application.tracks.length !== 0
								? application.tracks.map((track) => (
										<ListItem key={track._id}>
											{/* <ShowTrack track={track} /> */}
											{track.title} - {track.artist}
										</ListItem>
								  ))
								: null}
						</List>
					</CardContent>
				</Box>
			</Card>
		);
	}

	render() {
		if (!this.props.application) {
			return this.renderMuiBrief(this.props.brief);
		} else {
			return this.renderMuiApplication(this.props.application);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { playTrack })(BriefCard);
