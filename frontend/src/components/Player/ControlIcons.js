import React from "react";
import "../../style/ControlIcons.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { FastRewind } from "@mui/icons-material";
import { FastForwardSharp } from "@mui/icons-material";
import { PlayArrowSharp } from "@mui/icons-material";
import { PauseSharp } from "@mui/icons-material";
import { VolumeUp } from "@mui/icons-material";
import { VolumeOff } from "@mui/icons-material";
//import { Fullscreen } from "@mui/icons-material";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";

const ControlIcons = ({
	playandpause,
	playing,
	muting,
	muted,
	volumeChange,
	volumeSeek,
	volume,
	playRate,
	playerbackRate,
	onSeek,
	played,
	playedSeconds,
	loadedSeconds,
	onSeekMouseUp,
	onSeekMouseDown,
	fullMovieTime,
	playedTime,
	title,
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handlePopOver = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "playbackrate-popover" : undefined;

	function ValueLabelComponent(props) {
		const { children, value } = props;

		return (
			<Tooltip enterTouchDelay={0} placement="top" title={value}>
				{children}
			</Tooltip>
		);
	}

	const PrettoSlider = styled(Slider)({
		height: 5,
		"& .MuiSlider-track": {
			border: "none",
		},
		"& .MuiSlider-thumb": {
			height: 16,
			width: 16,
			backgroundColor: "#fff",
			border: "2px solid currentColor",
			"&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
				boxShadow: "inherit",
			},
			"&:before": {
				display: "none",
			},
		},
		"& .MuiSlider-valueLabel": {
			lineHeight: 1.2,
			fontSize: 12,
			background: "unset",
			padding: 0,
			width: 32,
			height: 32,
			borderRadius: "50% 50% 50% 0",
			backgroundColor: "#52af77",
			transformOrigin: "bottom left",
			transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
			"&:before": { display: "none" },
			"&.MuiSlider-valueLabelOpen": {
				transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
			},
			"& > *": {
				transform: "rotate(45deg)",
			},
		},
	});
	return (
		<div className="controls__div">
			{/* Bottom Controls */}
			<Grid
				container
				direction="column"
				alignItems="left"
				justifyContent="space-around"
				style={{ padding: 8 }}
				color="background"
			>
				<Grid item>
					<Typography variant="h6" color="primary" sx={{ paddingLeft: 2 }}>
						{title}
					</Typography>
				</Grid>

				<Grid
					container
					direction="row"
					alignItems="center"
					justifyContent="space-around"
					color="background"
				>
					<Grid item>
						<Grid
							container
							alignItems="center"
							justifyContent="space-between"
							direction="row"
						>
							<IconButton
								className="controls__icons"
								aria-label="reqind"
								onClick={playandpause}
							>
								{playing ? (
									<PauseSharp fontSize="large" color="primary" />
								) : (
									<PlayArrowSharp fontSize="large" color="primary" />
								)}
							</IconButton>

							<IconButton
								className="controls__icons"
								aria-label="reqind"
								onClick={muting}
							>
								{muted ? (
									<VolumeOff fontSize="large" color="primary" />
								) : (
									<VolumeUp fontSize="large" color="primary" />
								)}
							</IconButton>

							{/* <Typography
							color="secondary"
							style={{ paddingTop: "5px", paddingRight: "5px" }}
						>
							{volume * 100}
						</Typography>
						<Slider
							min={0}
							max={100}
							value={Math.floor(volume * 100)}
							onChange={volumeChange}
							onChangeCommitted={volumeSeek}
							className="volume__slider"
							color="primary"
						/> */}
						</Grid>
					</Grid>

					<Grid item xs={6} sm={8} md={10}>
						<PrettoSlider
							min={0}
							max={100}
							//max={fullAudioTimeInSec}
							value={played * 100}
							//value={playedSeconds}
							onChange={onSeek}
							onMouseDown={onSeekMouseDown}
							onChangeCommitted={onSeekMouseUp}
							valueLabelDisplay="off"
							// aria-label="custom thumb label"
							components={{
								ValueLabel: ValueLabelComponent,
							}}
							color="secondary"
							sx={{ paddingBottom: 0 }}
						/>
						<Grid container direction="row" justifyContent="space-between">
							<Typography variant="h7" color="primary">
								{playedTime}
							</Typography>
							<Typography variant="h7" color="primary">
								{fullMovieTime}
							</Typography>
						</Grid>
					</Grid>

					{/* 
				<Grid item>
					<Button
						variant="text"
						onClick={handlePopOver}
						className="bottom__icons"
					>
						<Typography>{playerbackRate}X</Typography>
					</Button>

					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
					>
						<Grid container direction="column-reverse">
							{[0.5, 1, 1.5, 2].map((rate) => (
								<Button
									variant="text"
									key={rate}
									onClick={() => playRate(rate)}
								>
									<Typography
										color={rate === playerbackRate ? "secondary" : "default"}
									>
										{rate}
									</Typography>
								</Button>
							))}
						</Grid>
					</Popover>
				</Grid> */}
				</Grid>
			</Grid>
		</div>
	);
};

export default ControlIcons;
