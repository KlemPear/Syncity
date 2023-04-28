import React from "react";
import { connect } from "react-redux";
import { fetchBrief, playTrack } from "../../actions";
import history from "../../util/history";
import Loader from "../Loader";
import { moneyFormatter, getNumberOfDays } from "../../util/textFormatHelper";
import BriefApplication from "./BriefApplication";

//mui
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  Box,
  Divider,
  Grid,
  Stack,
  List,
  ListItem,
  Tooltip,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import mediaMapping from "../../util/mediaMapping";

class ShowBrief extends React.Component {
  componentDidMount = () => {
    this.props.fetchBrief(history.location.pathname.split("/")[2]);
  };
  onPlayTrack = (track) => {
    this.props.playTrack(track);
  };

  renderReference = (ref) => {
    return (
      <Box key={ref.link}>
        <List key={ref.link}>
          <ListItem>
            <Stack>
              <MuiLink
                underline="hover"
                onClick={() => this.onPlayTrack({ link: ref.link })}
              >
                {ref.title}
              </MuiLink>
              {ref.comment ? (
                <List>
                  <ListItem>
                    <Typography>Comment: {ref.comment}</Typography>
                  </ListItem>
                </List>
              ) : null}
            </Stack>
          </ListItem>
        </List>
      </Box>
    );
  };

  renderSubheader(brief) {
    const numberOfDaysLeft = getNumberOfDays(
      new Date(Date.now()),
      brief.dueDate
    );
    return (
      <>
        <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
          <HourglassBottomIcon sx={{ m: 0, p: 0 }} />
          {numberOfDaysLeft === 0 && `Last day to apply!`}
          {numberOfDaysLeft > 0 && `${numberOfDaysLeft} days left`}
          {numberOfDaysLeft < 0 &&
            `${(numberOfDaysLeft * -1).toString()} days past due date`}
        </Typography>
        <Typography>
          Budget: {moneyFormatter(brief.currency).format(brief.budget)} all in
        </Typography>
      </>
    );
  }

  renderHeader(brief) {
    return (
      <>
        <Typography variant="h6">{brief.title}</Typography>
      </>
    );
  }

  renderAvatar(media) {
    return (
      <Tooltip title={media}>
        <Avatar
          sx={{
            bgcolor: mediaMapping[media]?.color,
            width: "65px",
            height: "65px",
          }}
          aria-label="media"
        >
          {mediaMapping[media]?.icon}
        </Avatar>
      </Tooltip>
    );
  }

  renderBrief(brief) {
    return (
      <Card
        sx={{
          width: 0.9,
          boxShadow: `0 0 3px ${mediaMapping[brief.media]?.color}`,
        }}
      >
        <CardHeader
          avatar={this.renderAvatar(brief.media)}
          title={this.renderHeader(brief)}
          subheader={this.renderSubheader(brief)}
        />
        <Divider
          variant="middle"
          sx={{
            margin: 1,
            boxShadow: `0 0 3px ${mediaMapping[brief.media]?.color}`,
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {brief.numberOfApplicationsWanted > 0
              ? `Number of applications submitted: ${brief.numberOfApplicationsSubmitted} of ${brief.numberOfApplicationsWanted}`
              : null}
          </Typography>
        </CardContent>
        <Divider
          variant="middle"
          sx={{
            margin: 1,
            boxShadow: `0 0 3px ${mediaMapping[brief.media]?.color}`,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: 400,
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          <CardContent>
            <Box dangerouslySetInnerHTML={{ __html: brief.description }} />
          </CardContent>
          <CardContent>
            <Divider variant="middle" sx={{ margin: 1 }} />
            <Typography variant="h5">License Terms</Typography>
            <List>
              <ListItem>Media: {brief.media}</ListItem>
              <ListItem>Use: {brief.use.join(", ")}</ListItem>
              <ListItem>License Duration: {brief.licenseDuration}</ListItem>
              <ListItem>
                {"Extract Duration: "}
                {brief.extractDuration
                  ? `${brief.extractDuration}min`
                  : "00min"}
                {" : "}
                {brief.extractDurationSecond
                  ? `${brief.extractDurationSecond}sec`
                  : "00sec"}
              </ListItem>
              <ListItem>Territory: {brief.territory.join(", ")}</ListItem>
            </List>
          </CardContent>
          <CardContent>
            <Divider variant="middle" sx={{ margin: 1 }} />
            <Typography variant="h5">Type Of Music Needed</Typography>
            <List>
              <ListItem>Genre(s): {brief.genres.join(", ")}</ListItem>
              <ListItem>Vocal(s): {brief.vocals.join(", ")}</ListItem>
              <ListItem>Mood(s): {brief.moods.join(", ")}</ListItem>
              <ListItem>Instrument(s): {brief.instruments.join(", ")}</ListItem>
              <ListItem>Tempo: {brief.tempo}</ListItem>
              <ListItem>
                Exclusivity: {brief.exclusivity ? "Yes" : "No"}
              </ListItem>
            </List>
          </CardContent>
          {brief.references?.length !== 0 ? (
            <CardContent>
              <Divider variant="middle" sx={{ margin: 1 }} />
              <Typography variant="h5">Reference(s)</Typography>
              <Box>
                {brief.references?.map((ref) => this.renderReference(ref))}
              </Box>
            </CardContent>
          ) : null}
        </Box>
      </Card>
    );
  }

  render() {
    if (!this.props.brief) {
      return (
        <div>
          <Loader />
        </div>
      );
    } else {
      const { brief } = this.props;
      return (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ sm: 1, md: 2 }}
            justifyContent="space-evenly"
          >
            <Grid item xs={1} sm={1} md={1} key="1">
              {this.renderBrief(brief)}
            </Grid>
            <Grid item xs={1} sm={1} md={1} key="2">
              {this.props.brief.numberOfApplicationsWanted ===
              this.props.brief.numberOfApplicationsSubmitted ? (
                <>
                  <Typography variant="h3">
                    The applications are closed for this brief
                  </Typography>
                </>
              ) : (
                <BriefApplication brief={this.props.brief} />
              )}
            </Grid>
          </Grid>
        </>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.auth?.user?._id,
    brief: state.briefs
      ? state.briefs[history.location.pathname.split("/")[2]]
      : null,
  };
};

export default connect(mapStateToProps, { fetchBrief, playTrack })(ShowBrief);
