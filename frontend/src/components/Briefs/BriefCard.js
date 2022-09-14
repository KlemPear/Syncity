import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { moneyFormatter, getNumberOfDays } from "../../util/textFormatHelper";

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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { Box, Stack, Divider, Badge, ButtonGroup } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import MuiLink from "@mui/material/Link";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

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
};

const colors = [red, deepPurple, blue, green, deepOrange, yellow, pink];

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

	renderReference = (ref) => {
		return (
			<Box key={ref.link}>
				<ul key={ref.link}>
					<li>
						<MuiLink underline="hover" href={ref.link}>
							{ref.title ? ref.title : "Link to reference song"}
						</MuiLink>
						{ref.comment ? (
							<ul>
								<li>
									<p>{ref.comment}</p>
								</li>
							</ul>
						) : null}
					</li>
				</ul>
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
				<Typography>
					<HourglassBottomIcon sx={{ m: 0, p: 0 }} />
					{numberOfDaysLeft > 0
						? `${numberOfDaysLeft} days left`
						: `${(numberOfDaysLeft * -1).toString()} days past due date`}
				</Typography>
				<Typography>Budget: {moneyFormatter.format(brief.budget)}</Typography>
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
			<Avatar
				sx={{ bgcolor: mediaMapping[media].color[500] }}
				aria-label="media"
			>
				{mediaMapping[media].icon}
			</Avatar>
		);
	}

	renderMuiBrief(brief) {
		return (
			<Card sx={{ maxWidth: 350 }} variant="outlined">
				<CardHeader
					avatar={this.renderAvatar(brief.media)}
					title={this.renderHeader(brief)}
					subheader={this.renderSubheader(brief)}
				/>
				<CardContent></CardContent>
				<CardContent>
					<Divider variant="middle" sx={{ margin: 1 }} />
					<Typography variant="body2" color="text.secondary">
						{brief.numberOfApplicationsWanted > 0
							? `Number of applications submitted: ${brief.numberOfApplicationsSubmitted} of ${brief.numberOfApplicationsWanted}`
							: null}
					</Typography>
				</CardContent>
				<CardContent>
					<Typography>Description:</Typography>
					<Typography variant="body1" color="text.primary">
						{brief.description}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<Divider variant="middle" sx={{ margin: 1 }} />
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
						<>
							{brief.numberOfApplicationsWanted ===
								brief.numberOfApplicationsSubmitted ||
							getNumberOfDays(new Date(Date.now()), brief.dueDate) < 0 ? (
								<Button variant="contained" color="primary">
									Closed
								</Button>
							) : (
								<Button
									variant="contained"
									color="secondary"
									component={Link}
									to={`show-brief/${brief._id}`}
								>
									Apply
								</Button>
							)}
						</>
					)}
					<ExpandMore
						expand={this.state.expanded}
						onClick={this.handleExpandClick}
						aria-expanded={this.state.expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>
				<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Divider variant="middle" sx={{ margin: 1 }} />
						<Typography>License Terms:</Typography>
						<ul>
							<li>Media: {brief.media}</li>
							<li>Use: {brief.use.join(", ")}</li>
							<li>License Duration: {brief.licenseDuration}</li>
							<li>Extract Duration: {brief.extractDuration} minutes</li>
							<li>Territory: {brief.territory.join(", ")}</li>
						</ul>
						<br />
						<Typography>Type Of Music Needed:</Typography>
						<ul>
							<li>Genre(s): {brief.genres.join(", ")}</li>
							<li>Vocal(s): {brief.vocals.join(", ")}</li>
							<li>Mood(s): {brief.moods.join(", ")}</li>
							<li>Instrument(s): {brief.instruments.join(", ")}</li>
							<li>Tempo: {brief.tempo}</li>
							<li>Exclusivity: {brief.exclusivity ? "Yes" : "No"}</li>
						</ul>
						<br />
						{brief.references?.length !== 0 ? (
							<>
								<Typography>Reference(s):</Typography>
								{brief.references?.map((ref) => this.renderReference(ref))}
							</>
						) : null}
					</CardContent>
				</Collapse>
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
			<Card sx={{ maxWidth: 350 }} variant="outlined">
				<CardHeader
					avatar={this.renderApplicationAvatar(application)}
					title={this.renderHeader(brief)}
					subheader={this.renderSubheader(brief)}
				/>
				<CardContent>
					<Divider variant="middle" sx={{ margin: 1 }} />
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
				<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography>License Terms:</Typography>
						<ul>
							<li>Media: {brief.media}</li>
							<li>Use: {brief.use.join(", ")}</li>
							<li>License Duration: {brief.licenseDuration}</li>
							<li>Extract Duration: {brief.extractDuration} minutes</li>
							<li>Territory: {brief.territory.join(", ")}</li>
						</ul>
						<br />
						<Typography>Type Of Music Needed:</Typography>
						<ul>
							<li>Genre(s): {brief.genres.join(", ")}</li>
							<li>Vocal(s): {brief.vocals.join(", ")}</li>
							<li>Mood(s): {brief.moods.join(", ")}</li>
							<li>Instrument(s): {brief.instruments.join(", ")}</li>
							<li>Tempo: {brief.tempo}</li>
							<li>Exclusivity: {brief.exclusivity ? "Yes" : "No"}</li>
						</ul>
						<br />
						{brief.references?.length !== 0 ? (
							<>
								<Typography>Reference(s):</Typography>
								{brief.references?.map((ref) => this.renderReference(ref))}
							</>
						) : null}
					</CardContent>
				</Collapse>
				<CardContent>
					<Divider variant="middle" sx={{ margin: 1 }} />
					<h4>Tracks that you submitted for this brief:</h4>
					<ul>
						{application.tracks.length !== 0
							? application.tracks.map((track) => (
									<li key={track._id}>
										<ListItem button component={MuiLink} href={track.link}>
											{track.title} - {track.artist}
										</ListItem>
									</li>
							  ))
							: null}
					</ul>
				</CardContent>
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

export default connect(mapStateToProps, {})(BriefCard);
