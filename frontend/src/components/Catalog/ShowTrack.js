import React, { Component } from "react";
import ReactPlayer from "react-player/lazy";
import Spotify from "react-spotify-embed";

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
						<Typography
							component={MuiLink}
							underline="hover"
							href={track.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							{track.title} - {track.artist}
						</Typography>
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
							{track.link.includes("spotify") ? (
								<Spotify link={track.link} height={100} width={400} />
							) : (
								<ReactPlayer
									url={track.link}
									controls={true}
									height={100}
									width={400}
								/>
							)}
						</Stack>
					</AccordionDetails>
				</Accordion>
			</>
		);
	}
}

export default ShowTrack;
