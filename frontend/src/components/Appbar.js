import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Link } from "react-router-dom";
import { logOutUser } from "../actions";
import { connect } from "react-redux";

class ResponsiveAppBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorElNav: null,
			anchorElUser: null,
		};
	}

	getPagesAndSettings = () => {
		if (this.props.isSignedIn && !this.props.isUserPending) {
			return {
				pages: {
					Briefs: "/list-briefs",
					"My Applications": "/list-applications",
					"Music Catalog": "/catalog",
				},
				settings: {
					"Subscription Plans": "/buy-tokens",
					Profile: "/profile",
					Logout: "/",
				},
			};
		} else if (this.props.isUserPending) {
			return {
				pages: {
					Briefs: "/user-status-pending",
					"My Applications": "/user-status-pending",
					"Music Catalog": "/user-status-pending",
				},
				settings: null,
			};
		} else {
			return {
				pages: {
					"Sign Up": "/register",
					"Sign In": "/login",
				},
				settings: null,
			};
		}
	};

	onLogOutSubmit = () => {
		this.props.logOutUser();
	};

	handleOpenNavMenu = (event) => {
		this.setState({ anchorElNav: event.currentTarget });
	};
	handleOpenUserMenu = (event) => {
		this.setState({ anchorElUser: event.currentTarget });
	};

	handleCloseNavMenu = () => {
		this.setState({ anchorElNav: null });
	};

	handleCloseUserMenu = () => {
		this.setState({ anchorElUser: null });
	};

	render() {
		const { pages, settings } = this.getPagesAndSettings();
		return (
			<AppBar position="static" sx={{ mb: 2 }}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<LibraryMusicIcon
							sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						/>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="https://www.nost.audio/"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							NOST
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={this.handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={this.state.anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(this.state.anchorElNav)}
								onClose={this.handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{Object.keys(pages).map((page) => (
									<MenuItem key={page} onClick={this.handleCloseNavMenu}>
										<Typography
											component={Link}
											to={pages[page]}
											textalign="center"
											sx={{ textDecoration: "none", color: "inherit" }}
										>
											{page}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<LibraryMusicIcon
							sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
						/>
						<Typography
							variant="h5"
							noWrap
							component="a"
							href="https://www.nost.audio/"
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							NOST
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{Object.keys(pages).map((page) => (
								<Button
									key={page}
									component={Link}
									to={pages[page]}
									onClick={this.handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									{page}
								</Button>
							))}
						</Box>

						{settings != null ? (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<Button
										onClick={this.handleOpenUserMenu}
										sx={{ p: 0, color: "white" }}
										startIcon={
											<AccountCircleIcon
												sx={{ color: "white" }}
											/>
										}
									>
										{this.props.user.firstName} {this.props.user.lastName}
									</Button>
								</Tooltip>
								<Menu
									sx={{ mt: "40px" }}
									id="menu-appbar"
									anchorEl={this.state.anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(this.state.anchorElUser)}
									onClose={this.handleCloseUserMenu}
								>
									{Object.keys(settings).map((setting) => (
										<MenuItem key={setting} onClick={this.handleCloseUserMenu}>
											{setting === "Logout" ? (
												<Typography
													component={Link}
													to={settings[setting]}
													texalign="center"
													sx={{ textDecoration: "none", color: "inherit" }}
													onClick={this.onLogOutSubmit}
												>
													{setting}
												</Typography>
											) : (
												<Typography
													component={Link}
													to={settings[setting]}
													texalign="center"
													sx={{ textDecoration: "none", color: "inherit" }}
												>
													{setting}
												</Typography>
											)}
										</MenuItem>
									))}
								</Menu>
							</Box>
						) : null}
					</Toolbar>
				</Container>
			</AppBar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		isUserPending: state.auth.user?.status === "Pending",
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { logOutUser })(ResponsiveAppBar);