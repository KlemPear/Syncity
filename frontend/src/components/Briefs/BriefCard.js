import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { moneyFormatter, getNumberOfDays } from "../../util/textFormatHelper";
import { playTrack } from "../../actions";
import TrackLink from "../Catalog/TrackLink";
//mui
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import {
  Box,
  Stack,
  Divider,
  Badge,
  ButtonGroup,
  List,
  Tooltip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import MuiLink from "@mui/material/Link";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import mediaMapping from "../../util/mediaMapping";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

class BriefCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
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
        <MuiLink
          variant="h6"
          component={Link}
          to={`/show-brief/${brief._id}`}
          underline="hover"
        >
          {brief.title}
        </MuiLink>
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

  renderCollaspableInfo(brief) {
    return (
      <>
        <Typography>License Terms:</Typography>
        <List>
          <ListItem>Media: {brief.media}</ListItem>
          <ListItem>Use: {brief.use.join(", ")}</ListItem>
          <ListItem>License Duration: {brief.licenseDuration}</ListItem>
          <ListItem>
            {"Extract Duration: "}
            {brief.extractDuration ? `${brief.extractDuration}min` : "00min"}
            {":"}
            {brief.extractDurationSecond
              ? `${brief.extractDurationSecond}sec`
              : "00 sec"}
          </ListItem>
          <ListItem>Territory: {brief.territory.join(", ")}</ListItem>
        </List>
        <br />
        <Typography>Type Of Music Needed:</Typography>
        <List>
          <ListItem>Genre(s): {brief.genres.join(", ")}</ListItem>
          <ListItem>Vocal(s): {brief.vocals.join(", ")}</ListItem>
          <ListItem>Mood(s): {brief.moods.join(", ")}</ListItem>
          <ListItem>Instrument(s): {brief.instruments.join(", ")}</ListItem>
          <ListItem>Tempo: {brief.tempo}</ListItem>
          <ListItem>Exclusivity: {brief.exclusivity ? "Yes" : "No"}</ListItem>
        </List>
        <br />
        {brief.references?.length !== 0 ? (
          <>
            <Typography>Reference(s):</Typography>
            {brief.references?.map((ref) => this.renderReference(ref))}
          </>
        ) : null}
      </>
    );
  }

  renderMuiBrief(brief) {
    return (
      <Card
        sx={{
          width: 375,
          height: "auto",
          minHeight: 300,
          maxHeight: 550,
          boxShadow: `0 0 3px ${mediaMapping[brief.media]?.color}`,
          borderRadius: "15px",
        }}
        elevation={8}
      >
        <CardHeader
          avatar={this.renderAvatar(brief.media)}
          title={this.renderHeader(brief)}
          subheader={this.renderSubheader(brief)}
          sx={{
            height: 150,
            overflow: "hidden",
            overflowY: "auto",
          }}
        />
        <Divider
          variant="middle"
          sx={{
            margin: 1,
            boxShadow: `0 0 3px ${mediaMapping[brief.media]?.color}`,
          }}
        />
        <CardContent sx={{ py: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {brief.numberOfApplicationsWanted > 0
              ? `${brief.numberOfApplicationsSubmitted} / ${brief.numberOfApplicationsWanted} applications already submitted`
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
            height: 100,
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          <CardContent sx={{ py: 0.5 }}>
            {/* <Typography sx={{ mt: 0.5 }}>Description:</Typography> */}

            <Box dangerouslySetInnerHTML={{ __html: brief.description }} />
          </CardContent>
        </Box>
        <CardActions disableSpacing>
          <Box
            sx={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexGrow: 5,
            }}
          >
            {brief.author === this.props.userId ? (
              <ButtonGroup
                variant="outlined"
                color="primary"
                size="small"
                aria-label="outlined button group"
              >
                <Button component={Link} to={`show-brief/edit/${brief._id}`}>
                  Edit
                </Button>
                <Button
                  component={Link}
                  to={`show-brief/${brief._id}/applications`}
                >
                  View Applications
                </Button>
              </ButtonGroup>
            ) : (
              <Box>
                {brief.numberOfApplicationsWanted ===
                  brief.numberOfApplicationsSubmitted ||
                getNumberOfDays(new Date(Date.now()), brief.dueDate) < 0 ? (
                  <Button variant="contained" color="primary">
                    Closed
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`show-brief/${brief._id}`}
                  >
                    Apply
                  </Button>
                )}
              </Box>
            )}
          </Box>
          <ExpandMore
            expand={this.state.expanded}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more"
            sx={{ alignSelf: "flex-end" }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: 150,
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <Divider variant="middle" sx={{ margin: 1 }} />
            <CardContent>{this.renderCollaspableInfo(brief)}</CardContent>
          </Collapse>
        </Box>
      </Card>
    );
  }

  renderApplicationAvatar(application) {
    const brief = application.brief;
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
    }));

    if (application.likedTracks?.length > 0) {
      return (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <SmallAvatar sx={{ bgcolor: "white" }} aria-label="media">
              <FavoriteIcon sx={{ color: red[500] }} size="small" />
            </SmallAvatar>
          }
        >
          {this.renderAvatar(brief.media)}
        </Badge>
      );
    } else {
      return <>{this.renderAvatar(brief.media)}</>;
    }
  }

  renderApplicationStatus(application) {
    if (
      application.licensingJobStatus === "None" &&
      application.likedTracks.length > 0
    ) {
      return `The briefer liked your track(s): ${application.tracks
        .filter((t) => application.likedTracks.includes(t._id))
        .map((t) => {
          return `${t.title} - ${t.artist}`;
        })
        .join(", ")}.
				You are in the short list!`;
    }
    if (application.licensingJobStatus === "Pending") {
      return `Your application has been selected! The licensing process is pending. You should receive an email from us shortly.`;
    }
    if (application.licensingJobStatus === "Obtained") {
      return `Congratulations! This application was selected and the license was delivered.`;
    }
    return `Application pending. The briefer might still be reviewing application or chose a different one.`;
  }

  renderMuiApplication(application) {
    const brief = application.brief;
    return (
      <Card
        sx={{
          width: 375,
          height: "auto",
          minHeight: 450,
          maxHeight: 450,
          boxShadow: `0 0 5px ${mediaMapping[brief.media]?.color}`,
          borderRadius: "15px",
        }}
        elevation={8}
      >
        <CardHeader
          avatar={this.renderApplicationAvatar(application)}
          title={this.renderHeader(brief)}
          subheader={this.renderSubheader(brief)}
          sx={{
            height: 150,
            overflow: "hidden",
            overflowY: "auto",
            py: 0.5,
          }}
        />
        <Divider
          variant="middle"
          sx={{
            margin: 1,
            boxShadow: `0 0 3px ${mediaMapping[brief.media]?.color[500]}`,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: 100,
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          <CardContent>
            <Typography variant="body2">
              {this.renderApplicationStatus(application)}
            </Typography>
          </CardContent>
        </Box>
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
            maxHeight: 150,
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          <CardContent sx={{ py: 0.5 }}>
            <Typography variant="body2">Tracks you submitted:</Typography>
            <List>
              {application.tracks.length !== 0
                ? application.tracks.map((track) => (
                    <ListItem key={track._id}>
                      <TrackLink track={track} />
                    </ListItem>
                  ))
                : null}
            </List>
          </CardContent>
        </Box>
      </Card>
    );
  }

  render() {
    if (!this.props.application) {
      return this.renderMuiBrief(this.props.brief);
    } else {
      return this.renderMuiApplication(this.props.application);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user._id,
  };
};

export default connect(mapStateToProps, { playTrack })(BriefCard);
