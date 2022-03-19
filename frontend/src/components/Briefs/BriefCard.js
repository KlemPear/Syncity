import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";

class BriefCard extends React.Component {
	formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-Us");
	};

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
					<div className="description">
						{this.props.brief.description.substring(0, 240)}...
					</div>
				</div>
				<div className="extra content">
					{this.props.brief.author === this.props.userId ? (
						<>
							<Link
								className="ui basic blue button"
								to={`briefs/edit/${this.props.brief._id}`}
							>
								Edit
							</Link>
						</>
					) : (
						<Link
							className="ui basic green button"
							to={`briefs/${this.props.brief._id}`}
						>
							Apply
						</Link>
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