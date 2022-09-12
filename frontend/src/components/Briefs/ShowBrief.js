import React from "react";
import { connect } from "react-redux";
import { fetchBrief } from "../../actions";
import history from "../../util/history";
import Loader from "../Loader";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";
import BriefApplication from "./BriefApplication";

//mui
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
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
import { Box, Divider, Grid } from "@mui/material";

const colors = [red, deepPurple, blue, green, deepOrange, yellow, pink];

class ShowBrief extends React.Component {
	componentDidMount = () => {
		this.props.fetchBrief(history.location.pathname.split("/")[2]);
	};

	renderReference = (ref) => {
		return (
			<div key={ref.link}>
				<ul>
					<li>
						<a href={ref.link}>
							{ref.title ? ref.title : "Link to reference song"}
						</a>
						{ref.comment ? (
							<ul>
								<li>
									<p>{ref.comment}</p>
								</li>
							</ul>
						) : null}
					</li>
				</ul>
			</div>
		);
	};

	renderBrief(brief) {
		return (
			<Card sx={{ width: 0.9 }}>
				<CardHeader
					avatar={
						<Avatar
							sx={{ bgcolor: colors[Math.floor(Math.random() * 7)][500] }}
							aria-label="media"
						>
							{brief.media}
						</Avatar>
					}
					title={<Typography variant="h4">{brief.title}</Typography>}
					subheader={`Due Date: ${dateFormatter(
						brief.dueDate
					)} - Budget: ${moneyFormatter.format(brief.budget)}`}
				/>
				<CardContent>
					<Divider variant="middle" sx={{ margin: 1 }} />
					<Typography variant="body2" color="text.secondary">
						{brief.numberOfApplicationsWanted > 0
							? `Number of applications submitted: ${brief.numberOfApplicationsSubmitted} of ${brief.numberOfApplicationsWanted}`
							: null}
					</Typography>
				</CardContent>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						height: 400,
						overflow: "hidden",
						overflowY: "auto",
					}}
				>
					<CardContent>
						<Typography variant="h5">Description:</Typography>
						<Typography variant="body1" color="text.primary">
							{brief.description}
						</Typography>
					</CardContent>
					<CardContent>
						<Divider variant="middle" sx={{ margin: 1 }} />
						<Typography variant="h5">License Terms</Typography>
						<ul>
							<li>Media: {brief.media}</li>
							<li>Use: {brief.use}</li>
							<li>License Duration: {brief.licenseDuration}</li>
							<li>Extract Duration: {brief.licenseDuration}</li>
							<li>Territory: {brief.territory}</li>
						</ul>
					</CardContent>
					<CardContent>
						<Divider variant="middle" sx={{ margin: 1 }} />
						<Typography variant="h5">Type Of Music Needed</Typography>
						<ul>
							<li>Genre(s): {brief.genres}</li>
							<li>Vocal(s): {brief.vocals}</li>
							<li>Mood(s): {brief.moods}</li>
							<li>Instrument(s): {brief.instruments}</li>
							<li>Tempo: {brief.tempo}</li>
							<li>Exclusivity: {brief.exclusivity}</li>
						</ul>
					</CardContent>
					{brief.references?.length !== 0 ? (
						<CardContent>
							<Divider variant="middle" sx={{ margin: 1 }} />
							<Typography variant="h5">Reference(s)</Typography>
							<Box>
								{brief.references?.map((ref) => this.renderReference(ref))}
							</Box>
						</CardContent>
					) : null}
				</Box>
			</Card>
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
						columns={{ sm: 1, md: 2 }}
						justifyContent="space-evenly"
					>
						<Grid item xs={1} sm={1} md={1} key="1">
							{this.renderBrief(brief)}
						</Grid>
						<Grid item xs={1} sm={1} md={1} key="2">
							{this.props.brief.numberOfApplicationsWanted ===
							this.props.brief.numberOfApplicationsSubmitted ? (
								<>
									<Typography variant="h3">
										The applications are closed for this brief
									</Typography>
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
