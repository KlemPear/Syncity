import React, { Component } from "react";
import { dateFormatter } from "../../util/textFormatHelper";
import { Link } from "react-router-dom";
//mui
import {
	Stack,
	Switch,
	Badge,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
	Button,
	Avatar,
} from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
class NotificationCard extends Component {
	renderHeader(title) {
		return <Typography variant="subtitle2">{title}</Typography>;
	}
	renderSubHeader(subheader) {
		return <Typography variant="caption">{subheader}</Typography>;
	}
	renderAvatar() {
		return (
			<Avatar
				variant="rounded"
				sx={{ bgcolor: "#FFFFFF", width: 36, height: 36 }}
			>
				<AnnouncementIcon color="secondary" />
			</Avatar>
		);
	}
	render() {
		const notif = this.props.notification;
		return (
			<>
				<Card sx={{ width: 300, height: 85 }} elevation={0}>
					<CardHeader
						avatar={this.renderAvatar()}
						title={this.renderHeader(notif.title)}
						subheader={this.renderSubHeader(dateFormatter(notif.date))}
						sx={{ py: 0.5 }}
					/>
					{/* <CardContent sx={{ py: 0.5 }}>
						<Typography variant="body2">{notif.description}</Typography>
					</CardContent> */}
					<CardActions
						sx={{ py: 0, display: "flex", justifyContent: "flex-end" }}
					>
						<Button size="small" component={Link} to={notif.link}>
							Check it out
						</Button>
					</CardActions>
				</Card>
			</>
		);
	}
}

export default NotificationCard;
