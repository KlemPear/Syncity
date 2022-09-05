import React from "react";
import { connect } from "react-redux";
import { fetchBrief } from "../../actions";
import history from "../../util/history";
import Loader from "../Loader";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";
import BriefApplication from "./BriefApplication";

class ShowBrief extends React.Component {
	componentDidMount = () => {
		this.props.fetchBrief(history.location.pathname.split("/")[2]);
	};

	renderReference = (ref) => {
		return (
			<>
				<ul>
					<li>
						<a href={ref.link}>Link to reference song</a>
					</li>
					<li>
						Comment: <p>{ref.comment}</p>
					</li>
				</ul>
			</>
		);
	};

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
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<div>
						<img src={brief.logo} alt="" />
						<h1>Apply to Brief: {brief.title}</h1>
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
						{brief.references !== null ? (
							<>
								<hr />
								<h4>Reference(s)</h4>
							</>
						) : null}
						{brief.references?.map((ref) => this.renderReference(ref))}
					</div>
					<hr />
					{this.props.brief.numberOfApplicationsWanted ===
					this.props.brief.numberOfApplicationsSubmitted ? (
						<>
							<h4>The applications are closed for this brief</h4>
						</>
					) : (
						<BriefApplication briefId={this.props.brief._id} />
					)}
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
