import React, { Component } from "react";

class ShowTrack extends Component {
	render() {
		const track = this.props.track;
		return (
			<div className="middle aligned content">
				<div className="header">
					<a href={track.link}>{track.title}</a> -{" "}
					<span className="cinema">{track.artist}</span>
				</div>
				<div className="meta">
					<p>
						Master: {track.masterContact} - Publisher: {track.publisherContact}
					</p>
				</div>
				<div className="extra">{this.props.button}</div>
			</div>
		);
	}
}

export default ShowTrack;
