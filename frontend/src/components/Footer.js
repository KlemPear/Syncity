import React, { Component } from "react";
import { connect } from "react-redux";

//mui
import { Container, Grid, Box, Typography, AppBar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";

class Footer extends Component {
	render() {
		return (
			<AppBar
				position="fixed"
				sx={{ mt: 2, bottom: 0, top: "auto" }}
				color="white"
			>
				<Container maxWidth="xl">
					<Grid
						container
						spacing={5}
						sx={{
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
						}}
					>
						<Grid item xs={2} sm={2}>
							<Box>
								<Typography component="a" href="https://www.nost.audio/">
									<img
										style={{ width: 50, height: 50 }}
										src={process.env.PUBLIC_URL + "/NOST_logo_black.png"}
										alt="logo"
									/>
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={4} sm={8}>
							<Typography
								sx={{ display: "flex", justifyContent: "center" }}
								variant="caption"
							>
								Made with <FavoriteIcon sx={{ color: red[500], pb: 0.5 }} /> in
								Quebec and Colorado.
							</Typography>
						</Grid>
						<Grid item xs={2} sm={2}>
							<Typography variant="caption">Copyright © nost 2022</Typography>
						</Grid>
					</Grid>
				</Container>
			</AppBar>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(Footer);
