import React from "react";
import { connect } from "react-redux";
import { editApplication } from "../../actions/index";

class ApplicationCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { thumbUp: this.props.application.liked };
	}

	onThumbUp = () => {
		this.setState({ thumbUp: true });
		const updatedApp = this.props.application;
		updatedApp.liked = true;
		this.props.editApplication(updatedApp);
	};

	onThumbDown = () => {
		this.setState({ thumbUp: false });
		const updatedApp = this.props.application;
		updatedApp.liked = false;
		this.props.editApplication(updatedApp);
	};

	renderApplicationItem(authorFirstName, authorLastName, tracks) {
		return (
			<div className="item">
				<div className="content">
					<div className="header">
						{authorFirstName} {authorLastName}
					</div>
					<div className="description">
						<ul>
							{tracks.length !== 0
								? tracks.map((track) => (
										<li key={track._id}>
											<a href={track.link}>
												{track.title} - {track.artist}
											</a>
											{this.state.thumbUp ? (
												<ul>
													<li>Publisher email: {track.publisherContact}</li>
													<li>Master email: {track.publisherContact}</li>
												</ul>
											) : null}
										</li>
								  ))
								: null}
						</ul>
					</div>
					<div className="extra">
						<div
							className={`ui label ${
								!this.state.thumbUp ? "" : "basic"
							} button red`}
							onClick={() => this.onThumbDown()}
						>
							<i
								className={`big thumbs down ${
									!this.state.thumbUp ? "outline" : ""
								} icon`}
							></i>
						</div>
						<div
							className={`ui label ${
								this.state.thumbUp ? "" : "basic"
							} button green`}
							onClick={() => this.onThumbUp()}
						>
							<i
								className={`big thumbs up ${
									this.state.thumbUp ? "outline" : ""
								} icon`}
							></i>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		if (!this.props.application) {
			return <div></div>;
		} else {
			return this.renderApplicationItem(
				this.props.application.author.firstName,
				this.props.application.author.lastName,
				this.props.application.tracks
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { editApplication })(ApplicationCard);
