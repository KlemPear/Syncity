import React from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@mui/material";

function WaveFormPlayer(props) {
	const waveSurfer = React.useRef(null);
	const [currentTime, setCurrentTime] = React.useState(0);

	React.useEffect(() => {
		const options = {
			container: "#waveform",
			waveColor: "primary",
			progressColor: "blue",
			cursorColor: "white",
			barWidth: 3,
			barHeight: 1,
			responsive: true,
			normalize: true,
		};

		waveSurfer.current = WaveSurfer.create(options);

		// Load the audio file
		waveSurfer.current.load(props.url);

		// Update the current time as the audio plays
		waveSurfer.current.on("audioprocess", () => {
			setCurrentTime(waveSurfer.current.getCurrentTime());
		});

		return () => waveSurfer.current.destroy();
	}, []);

	const handleChange = (event, value) => {
		waveSurfer.current.seekTo(value / 100);
		setCurrentTime(waveSurfer.current.getCurrentTime());
	};

	const play = React.useCallback(() => {
		waveSurfer.current.playPause();
	}, []);

	return (
		<div>
			<div id="waveform" />
			<Button onClick={play}>Play / Pause</Button>
		</div>
	);
}

export default WaveFormPlayer;
