import React from "react";
import { connect } from "react-redux";
import { fetchBrief } from "../../actions";
import history from "../../util/history";
import Loader from "../Loader";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";
import BriefApplication from "./BriefApplication";

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
} from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { Box, Stack, Divider, Badge, ButtonGroup, Grid } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import MuiLink from "@mui/material/Link";

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

class ShowBrief extends React.Component {
	componentDidMount = () => {
		this.props.fetchBrief(history.location.pathname.split("/")[2]);
	};

	renderReference = (ref) => {
		return (
			<div key={ref.link}>
				<ul>
					<li>
						<a href={ref.link}>Link to reference song</a>
					</li>
					<li>
						Comment: <p>{ref.comment}</p>
					</li>
				</ul>
			</div>
		);
	};

	renderBrief(brief) {
		return (
			<div>
				<h1>{brief.title}</h1>
				<div>
					{`Budget: ${moneyFormatter.format(brief.budget)}`} -
					{`Due date: ${dateFormatter(brief.dueDate)}`}
				</div>
				<p>Description: {brief.description}</p>
				<hr />
				<h4>License Terms</h4>
				<ul>
					<li>Media: {brief.media}</li>
					<li>Use: {brief.use}</li>
					<li>License Duration: {brief.licenseDuration}</li>
					<li>Extract Duration: {brief.licenseDuration}</li>
					<li>Territory: {brief.territory}</li>
				</ul>
				<hr />
				<h4>Type Of Music Needed</h4>
				<ul>
					<li>Genre(s): {brief.genres}</li>
					<li>Vocal(s): {brief.vocals}</li>
					<li>Mood(s): {brief.moods}</li>
					<li>Instrument(s): {brief.instruments}</li>
					<li>Tempo: {brief.tempo}</li>
					<li>Exclusivity: {brief.exclusivity}</li>
				</ul>
				{brief.references?.length !== 0 ? (
					<>
						<hr />
						<h4>Reference(s)</h4>
						{brief.references?.map((ref) => this.renderReference(ref))}
					</>
				) : null}
			</div>
		);
	}

	render() {
		if (!this.props.brief) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			const { brief } = this.props;
			return (
				<>
					<Grid
						container
						spacing={{ xs: 2, md: 2 }}
						columns={{ sm: 1, md: 2, }}
						justifyContent="space-evenly"
					>
						<Grid item xs={1} sm={1} md={1} key="1">
							{this.renderBrief(brief)}
						</Grid>
						<Grid item xs={1} sm={1} md={1} key="2">
							{this.props.brief.numberOfApplicationsWanted ===
							this.props.brief.numberOfApplicationsSubmitted ? (
								<>
									<Typography variant="h3">The applications are closed for this brief</Typography>
								</>
							) : (
								<BriefApplication briefId={this.props.brief._id} />
							)}
						</Grid>
					</Grid>
				</>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		userId: state.auth.user._id,
		brief: state.briefs
			? state.briefs[history.location.pathname.split("/")[2]]
			: null,
	};
};

export default connect(mapStateToProps, { fetchBrief })(ShowBrief);
