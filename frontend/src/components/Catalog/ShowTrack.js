import React, { Component } from "react";

//mui
import {
	Typography,
	Stack,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiLink from "@mui/material/Link";

class ShowTrack extends Component {
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
						<Typography component={MuiLink} href={track.link}>
							{track.title}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Stack direction="row" justifyContent="space-between">
						<Typography>
							Master: {track.masterContact} - Publisher:{" "}
							{track.publisherContact}
						</Typography>
						{this.props.button}
						</Stack>
					</AccordionDetails>
				</Accordion>
			</>
		);
	}
}

export default ShowTrack;
