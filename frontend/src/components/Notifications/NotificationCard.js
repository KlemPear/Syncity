import React, { Component } from "react";
import { dateFormatter } from "../../util/textFormatHelper";
//mui
import {
	Card,
	CardContent,
	CardHeader,
	Typography,
	Avatar,
} from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
class NotificationCard extends Component {
	renderHeader(title) {
		return <Typography variant="subtitle2">{title}</Typography>;
	}
	renderSubHeader(subheader) {
		return <Typography variant="caption">{subheader}</Typography>;
	}
	renderAvatar(read) {
		return (
			<Avatar
				variant="rounded"
				sx={{ bgcolor: "#FFFFFF", width: 36, height: 36 }}
			>
				{read ? (
					<MarkChatReadIcon color="primary" />
				) : (
					<AnnouncementIcon color="secondary" />
				)}
			</Avatar>
		);
	}
	render() {
		const notif = this.props.notification;
		return (
			<>
				<Card sx={{ width: 300, height: 100 }} elevation={1}>
					<CardHeader
						avatar={this.renderAvatar(notif.read)}
						title={this.renderHeader(notif.title)}
						subheader={this.renderSubHeader(dateFormatter(notif.date))}
						sx={{ py: 0.5 }}
					/>
					<CardContent sx={{ py: 0.5 }}>
						<Typography variant="body2" sx={{ fontSize: 12 }}>
							{notif.description}
						</Typography>
					</CardContent>
				</Card>
			</>
		);
	}
}

export default NotificationCard;
