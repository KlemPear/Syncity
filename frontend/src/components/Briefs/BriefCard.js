import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";

class BriefCard extends React.Component {
	render() {
		return (
			<div className="card">
				<div className="content">
					<img
						className="right floated mini ui image"
						alt="logo"
						src={this.props.brief.logo}
					/>
					<div className="header">{this.props.brief.title}</div>
					<div className="meta">{`Budget: ${moneyFormatter.format(
						this.props.brief.budget
					)}`}</div>
					<div className="meta">{`Due Date: ${dateFormatter(
						this.props.brief.dueDate
					)}`}</div>
					{this.props.brief.numberOfApplicationsWanted > 0 ? (
						<div className="meta">{`Number of applications submitted: ${this.props.brief.numberOfApplicationsSubmitted} of ${this.props.brief.numberOfApplicationsWanted}`}</div>
					) : null}
					<div className="description">
						{this.props.brief.description.substring(0, 240)}...
					</div>
				</div>
				<div className="extra content">
					{this.props.brief.author === this.props.userId ? (
						<>
							<Link
								className="ui basic blue button"
								to={`show-briefs/edit/${this.props.brief._id}`}
							>
								Edit
							</Link>
							<Link
								className="ui basic blue button"
								to={`show-brief/${this.props.brief._id}/applications`}
							>
								View Applications
							</Link>
						</>
					) : (
						<>
							{this.props.brief.numberOfApplicationsWanted ===
							this.props.brief.numberOfApplicationsSubmitted ? (
								<button className="ui basic red button">Closed</button>
							) : (
								<Link
									className="ui basic green button"
									to={`show-brief/${this.props.brief._id}`}
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
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, {})(BriefCard);
