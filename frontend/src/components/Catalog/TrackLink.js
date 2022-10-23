import React, { Component } from "react";
import { connect } from "react-redux";
import MuiLink from "@mui/material/Link";
import { playTrack } from "../../actions";

class TrackLink extends Component {
  onPlayTrack = () => {
    this.props.playTrack(this.props.track);
  };

  render() {
    const track = this.props.track;
    if (
      track.link.includes("spotify") ||
      track.link.includes("youtube") ||
      track.link.includes("soundcloud")
    ) {
      return (
        <>
          <MuiLink
            variant="h6"
            onClick={this.onPlayTrack}
            underline="hover"
            rel="noopener noreferrer"
          >
            {track.title} - {track.artist}
          </MuiLink>
        </>
      );
    } else {
      return (
        <>
          <MuiLink
            variant="h6"
            component="a"
            href={track.link}
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            {track.title} - {track.artist}
          </MuiLink>
        </>
      );
    }
  }
}

export default connect(null, { playTrack })(TrackLink);
