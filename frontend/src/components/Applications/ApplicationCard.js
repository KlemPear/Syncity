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

	renderApplicationItem(
		title,
		authorFirstName,
		authorLastName,
		description,
		logo,
		link
	) {
		return (
			<div className="item">
				<div className="image">
					<img src={logo} />
				</div>
				<div className="content">
					<a className="header">{title}</a>
					<div className="meta">
						<span className="cinema">
							{authorFirstName} {authorLastName}
						</span>
					</div>
					<div className="description">
						<p>{description}</p>
					</div>
					<div className="extra">
						<div className="ui label basic button red">
							<i class="big thumbs down outline icon"></i>
						</div>
						<div className="ui label basic button green">
							<i class="big thumbs up outline icon"></i>
						</div>
						<a href={link} className="ui right floated primary button">
							Link to song
							<i className="right chevron icon"></i>
						</a>
					</div>
				</div>
			</div>
		);
	}

	render() {
		if (!this.props.brief) {
			return <div></div>;
		} else {
			return this.renderApplicationItem(
				this.props.application.title,
				this.props.application.author.firstName,
				this.props.application.author.lastName,
				this.props.brief.description,
				this.props.brief.logo,
				this.props.application.link
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
