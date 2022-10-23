import React, { Component } from "react";
import { connect } from "react-redux";
import { playTrack } from "../../actions";
import TrackLink from "./TrackLink";
//mui
import {
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

class ShowTrack extends Component {
  onPlayTrack = () => {
    this.props.playTrack(this.props.track);
  };

  render() {
    const track = this.props.track;
    return (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <TrackLink track={track} />
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>
                  Master: {track.masterContact} - Publisher:{" "}
                  {track.publisherContact}
                </Typography>
                {this.props.button}
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </>
    );
  }
}

export default connect(null, { playTrack })(ShowTrack);
