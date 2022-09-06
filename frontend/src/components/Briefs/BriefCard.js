import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";

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
import { red, deepPurple, blue, green, deepOrange, yellow, pink } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const colors = [red, deepPurple, blue, green, deepOrange, yellow, pink ];

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
						<a href={ref.link}>Link to reference song</a>
					</li>
					<li>
						Comment: <p>{ref.comment}</p>
					</li>
				</ul>
			</Box>
		);
	};

	renderMuiBrief(brief) {
		return (
			<Card sx={{ maxWidth: 350 }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: colors[Math.floor(Math.random() * 7)][500] }} aria-label="media">
							{brief.media}
						</Avatar>
					}
					title={brief.title}
					subheader={`Due Date: ${dateFormatter(
						brief.dueDate
					)} - Budget: ${moneyFormatter.format(brief.budget)}`}
				/>
				<CardContent>
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
					{brief.author === this.props.userId ? (
						<>
							<Button component={Link} to={`show-brief/edit/${brief._id}`}>
								Edit
							</Button>
							<Button
								component={Link}
								to={`show-brief/${brief._id}/applications`}
							>
								View Applications
							</Button>
						</>
					) : (
						<>
							{brief.numberOfApplicationsWanted ===
							brief.numberOfApplicationsSubmitted ? (
								<Button>Closed</Button>
							) : (
								<Button component={Link} to={`show-brief/${brief._id}`}>
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
						<Typography>License Terms:</Typography>
						<ul>
							<li>Media: {brief.media}</li>
							<li>Use: {brief.use}</li>
							<li>License Duration: {brief.licenseDuration}</li>
							<li>Extract Duration: {brief.licenseDuration}</li>
							<li>Territory: {brief.territory}</li>
						</ul>
						<br />
						<Typography>Type Of Music Needed:</Typography>
						<ul>
							<li>Genre(s): {brief.genres}</li>
							<li>Vocal(s): {brief.vocals}</li>
							<li>Mood(s): {brief.moods}</li>
							<li>Instrument(s): {brief.instruments}</li>
							<li>Tempo: {brief.tempo}</li>
							<li>Exclusivity: {brief.exclusivity}</li>
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

	renderBrief(brief) {
		return (
			<div className="card">
				<div className="content">
					<img
						className="right floated mini ui image"
						alt="logo"
						src={brief.logo}
					/>
					<div className="header">{brief.title}</div>
					<div className="meta">{`Budget: ${moneyFormatter.format(
						brief.budget
					)}`}</div>
					<div className="meta">{`Due Date: ${dateFormatter(
						brief.dueDate
					)}`}</div>
					{brief.numberOfApplicationsWanted > 0 ? (
						<div className="meta">{`Number of applications submitted: ${brief.numberOfApplicationsSubmitted} of ${brief.numberOfApplicationsWanted}`}</div>
					) : null}
					<div className="description">
						{brief.description?.substring(0, 240)}...
					</div>
				</div>
				<div className="extra content">
					{brief.author === this.props.userId ? (
						<>
							<Link
								className="ui basic blue button"
								to={`show-brief/edit/${brief._id}`}
							>
								Edit
							</Link>
							<Link
								className="ui basic blue button"
								to={`show-brief/${brief._id}/applications`}
							>
								View Applications
							</Link>
						</>
					) : (
						<>
							{brief.numberOfApplicationsWanted ===
							brief.numberOfApplicationsSubmitted ? (
								<button className="ui basic red button">Closed</button>
							) : (
								<Link
									className="ui basic green button"
									to={`show-brief/${brief._id}`}
								>
									Apply
								</Link>
							)}
						</>
					)}
				</div>
			</div>
		);
	}

	renderApplication(application) {
		const brief = application.brief;
		return (
			<div className="card">
				<div className="content">
					<img
						className="right floated mini ui image"
						alt="logo"
						src={brief.logo}
					/>
					<div className="header">{brief.title}</div>
					{application.liked ? (
						<div className="meta">
							Your application was LIKED!{" "}
							<i className={`big thumbs up green icon`}></i>
						</div>
					) : null}
					<div className="meta">{`Budget: ${moneyFormatter.format(
						brief.budget
					)}`}</div>
					<div className="meta">{`Due Date: ${dateFormatter(
						brief.dueDate
					)}`}</div>
					<div className="description">
						{brief.description?.substring(0, 240)}...
					</div>
				</div>
				<div className="extra content">
					<h4>Tracks that you submitted for this brief:</h4>
					<ul>
						{application.tracks.length !== 0
							? application.tracks.map((track) => (
									<li key={track._id}>
										<a href={track.link}>
											{track.title} - {track.artist}
										</a>
									</li>
							  ))
							: null}
					</ul>
				</div>
			</div>
		);
	}

	render() {
		if (!this.props.application) {
			return this.renderMuiBrief(this.props.brief);
		} else {
			return this.renderApplication(this.props.application);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, {})(BriefCard);
