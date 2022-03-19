import React from "react";
import { connect } from "react-redux";
import { fetchBrief } from "../../actions";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";

class ApplicationCard extends React.Component {
	componentDidMount = () => {
		if (!this.props.brief) {
			this.props.fetchBrief(this.props.application.brief);
		}
	};

	render() {
		if (!this.props.brief) {
			return <div></div>;
		} else {
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
						<div className="description">
							<a href={this.props.application.link}>
								{this.props.application.title}
							</a>
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		userId: state.auth.user._id,
		brief: state.briefs[ownProps.application.brief],
	};
};

export default connect(mapStateToProps, { fetchBrief })(ApplicationCard);
