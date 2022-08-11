import React from "react";
import { connect } from "react-redux";
import { fetchBrief } from "../../actions";


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
					<img src={logo} alt="" />
				</div>
				<div className="content">
					<div className="header">{title}</div>
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
							<i className="big thumbs down outline icon"></i>
						</div>
						<div className="ui label basic button green">
							<i className="big thumbs up outline icon"></i>
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
			// return (
			// 	<div className="ui cards">
			// 		<BriefCard key={this.props.brief._id} brief={this.props.brief} />
			// 	</div>
			// );
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
