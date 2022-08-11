import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";

class BriefCard extends React.Component {
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
						{application.tracks.length != 0
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
			return this.renderBrief(this.props.brief);
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
