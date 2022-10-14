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
// import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Stack, Switch, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import {
	logOutUser,
	editUser,
	fetchNotifications,
	editNotification,
} from "../actions";
import { connect } from "react-redux";
import NotificationCard from "./Notifications/NotificationCard";
import history from "../util/history";
class ResponsiveAppBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorElNav: null,
			anchorElUser: null,
			anchorElNotification: null,
		};
	}

	componentDidMount() {
		if (this.props.user) {
			this.props.fetchNotifications({ user: this.props.user._id });
		}
	}

	handleDarkModeCheckChange = (event) => {
		const updatedUser = this.props.user;
		updatedUser.prefersDarkMode = event.target.checked;
		this.props.editUser(updatedUser);
		window.location.reload();
	};

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
					"Profile & Connections": "/profile",
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
	handleOpenNotificationMenu = (event) => {
		this.setState({ anchorElNotification: event.currentTarget });
	};

	handleCloseNavMenu = () => {
		this.setState({ anchorElNav: null });
	};
	handleCloseUserMenu = () => {
		this.setState({ anchorElUser: null });
	};
	handleCloseNotificationMenu = () => {
		this.setState({ anchorElNotification: null });
	};
	handleClickNotification = (notif) => {
		notif.read = true;
		this.props.editNotification(notif);
		this.handleCloseNotificationMenu();
		if (notif.link) {
			history.push(notif.link);
		}
	};
	render() {
		const { pages, settings } = this.getPagesAndSettings();
		return (
			<AppBar position="static" sx={{ mb: 2 }} color="third">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component={Link}
							to="list-briefs"
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
							<img
								style={{ width: 65, height: 65 }}
								src={
									this.props.user?.prefersDarkMode
										? process.env.PUBLIC_URL + "/NOST_logo_white.png"
										: process.env.PUBLIC_URL + "/NOST_logo_black.png"
								}
								alt="logo"
							/>
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
						<Typography
							variant="h5"
							noWrap
							component={Link}
							to="list-briefs"
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
							<img
								style={{ width: 65, height: 65 }}
								src={
									this.props.user?.prefersDarkMode
										? process.env.PUBLIC_URL + "/NOST_logo_white.png"
										: process.env.PUBLIC_URL + "/NOST_logo_black.png"
								}
								alt="logo"
							/>
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{Object.keys(pages).map((page) => (
								<Button
									key={page}
									component={Link}
									to={pages[page]}
									onClick={this.handleCloseNavMenu}
									sx={{ my: 2, display: "block" }}
									color="appBarButton"
								>
									{page}
								</Button>
							))}
						</Box>

						{settings != null ? (
							<Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }}>
								<Box sx={{ mr: 5 }}>
									<Tooltip title="Notifications">
										<Badge
											color="secondary"
											invisible={Boolean(!this.props.notifications)}
											badgeContent={
												this.props.notifications?.filter((o) => !o.read).length
											}
											max={99}
										>
											<IconButton
												color="primary"
												sx={{ p: 0 }}
												onClick={this.handleOpenNotificationMenu}
											>
												<CircleNotificationsIcon fontSize="large" />
											</IconButton>
										</Badge>
									</Tooltip>
									<Menu
										sx={{
											mt: "40px",
											height: 500,
											overflow: "hidden",
											overflowY: "auto",
											py: 0.5,
										}}
										id="menu-appbar"
										anchorEl={this.state.anchorElNotification}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(this.state.anchorElNotification)}
										onClose={this.handleCloseNotificationMenu}
									>
										{this.props.notifications.length === 0 ? (
											<MenuItem>0 Notifications.</MenuItem>
										) : null}
										{this.props.notifications?.map((notif) => (
											<MenuItem
												key={notif._id}
												onClick={() => {
													this.handleClickNotification(notif);
												}}
											>
												<NotificationCard notification={notif} />
											</MenuItem>
										))}
									</Menu>
								</Box>
								<Tooltip title="Open settings">
									<Button
										onClick={this.handleOpenUserMenu}
										sx={{ p: 0 }}
										startIcon={<AccountCircleIcon color="appBarButton" />}
										color="appBarButton"
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
									<MenuItem onClick={this.handleCloseUserMenu}>
										<Stack
											direction="row"
											sx={{ display: "flex", justifyContent: "center" }}
										>
											<Typography sx={{ mt: 1 }}>Dark Mode:</Typography>
											<Switch
												checked={this.props.user.prefersDarkMode ?? false}
												onChange={this.handleDarkModeCheckChange}
												inputProps={{ "aria-label": "controlled" }}
											/>
										</Stack>
									</MenuItem>
									{this.props.user?.briefSubscriptionPlan !== "Verified" ? (
										<MenuItem>
											<Typography
												component="a"
												href="https://tally.so/r/wob4vP"
												target="_blank"
												texalign="center"
												sx={{ textDecoration: "none", color: "inherit" }}
											>
												Become a verified briefer
											</Typography>
										</MenuItem>
									) : null}
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
		notifications: Object.values(state.notifications),
	};
};

export default connect(mapStateToProps, {
	logOutUser,
	editUser,
	fetchNotifications,
	editNotification,
})(ResponsiveAppBar);
