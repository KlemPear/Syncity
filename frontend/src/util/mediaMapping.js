// Media Icons
import FilmIcon from "@mui/icons-material/Theaters";
import WebIcon from "@mui/icons-material/RssFeed";
import TvIcon from "@mui/icons-material/Tv";
import AdvertisingIcon from "@mui/icons-material/Sell";
import VideoGameIcon from "@mui/icons-material/SportsEsports";
import TrailerIcon from "@mui/icons-material/Movie";
import RadioIcon from "@mui/icons-material/Radio";
import PodcastIcon from "@mui/icons-material/Podcasts";
import CorporateIcon from "@mui/icons-material/CorporateFare";
import OtherIcon from "@mui/icons-material/AudioFile";
// colors
import {
  red,
  deepPurple,
  blue,
  green,
  deepOrange,
  yellow,
  pink,
  teal,
  amber,
  indigo,
	cyan
} from "@mui/material/colors";

const mediaMapping = {
  Film: {
    icon: (
      <FilmIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: green[400],
  },
  Web: {
    icon: (
      <WebIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: deepPurple[400],
  },
  TV: {
    icon: (
      <TvIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: red[400],
  },
  Advertising: {
    icon: (
      <AdvertisingIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: yellow[400],
  },
  "Video Game": {
    icon: (
      <VideoGameIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: blue[400],
  },
  Trailer: {
    icon: (
      <TrailerIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: amber[400],
  },
  Radio: {
    icon: (
      <RadioIcon
        sx={{
          wwidth: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: deepOrange[400],
  },
  Podcast: {
    icon: (
      <PodcastIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: teal[400],
  },
  Corporate: {
    icon: (
      <CorporateIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: pink[400],
  },
  Other: {
    icon: (
      <OtherIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: indigo[400],
  },
  "All Media": {
    icon: (
      <OtherIcon
        sx={{
          width: "40px",
          height: "40px",
          color: "#232323",
        }}
      />
    ),
    color: cyan[400],
  },
};

export default mediaMapping;
