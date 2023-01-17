import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
								<Typography component={Link} to="/list-briefs">
									<img
										style={{ width: 50, height: 50 }}
										src={
											this.props.user?.prefersDarkMode
												? process.env.PUBLIC_URL + "/NOST_logo_white.png"
												: process.env.PUBLIC_URL + "/NOST_logo_black.png"
										}
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
								Quebec & Colorado.
							</Typography>
						</Grid>
						<Grid item xs={2} sm={2}>
							<Typography variant="caption">Copyright © nost 2023</Typography>
						</Grid>
					</Grid>
				</Container>
			</AppBar>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.auth.user,
	};
}

export default connect(mapStateToProps)(Footer);
