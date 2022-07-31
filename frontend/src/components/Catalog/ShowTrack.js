import React, { Component } from "react";
import { Link } from "react-router-dom";

class ShowTrack extends Component {
	render() {
    const track = this.props.track;
		return (
			<div key={track._id} className="item">
				<div className="middle aligned content">
					<div className="header">
						<a href={track.link}>{track.title}</a> -{" "}
						<span className="cinema">{track.artist}</span>
					</div>
					<div className="meta">
						<p>
							Master: {track.masterContact} - Publisher:{" "}
							{track.publisherContact}
						</p>
					</div>
					<div className="extra">
						<Link
							to={`/catalog/${track._id}`}
							className="ui right floated button"
						>
							Edit
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default ShowTrack;
