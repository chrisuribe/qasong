import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, TableRow, TableCell, IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { numberWithCommas } from "../../../../functions";
import uuid from "react-uuid";
import AddToQueueButton from "./AddToQueueButton/AddToQueueButton";

const qasongOrange = process.env.REACT_APP_QASONG_COLOR_1;

const useStyles = makeStyles({
  row: {
    backgroundColor: "transparent",
    "&:hover > *": {
      backgroundColor: "visible !important",
    },
  },
  media: {
    height: 65,
    width: 115,
  },
});

export default function ResultRow({ video, setNowPlaying, nowPlaying, queue, setQueue }) {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (nowPlaying && nowPlaying.videoId === video.videoId) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [nowPlaying]);

  function handlePlayButton(event) {
    event.stopPropagation();

    if (!playing) {
      setNowPlaying(video);
      setPlaying(true);
    } else {
      setNowPlaying({});
      setPlaying(false);
    }
  }

  function handleAddQueue(event) {
    event.stopPropagation();
    setQueue(
      queue.concat({
        ...video,
        qid: uuid(),
      })
    );
  }

  return (
    <TableRow
      className={classes.row}
      key={video.videoId}
      style={{ backgroundColor: playing && qasongOrange }}
    >
      <TableCell>
        <IconButton onClick={handlePlayButton} aria-label="Play">
          <PlayArrowIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <AddToQueueButton {...{ handleAddQueue }} />
      </TableCell>
      <TableCell>{video.title}</TableCell>
      <TableCell>{video.author.name}</TableCell>
      <TableCell>{numberWithCommas(video.views)}</TableCell>
      <TableCell>
        <CardMedia
          onClick={handlePlayButton}
          className={classes.media}
          image={video.thumbnail}
        />
      </TableCell>
    </TableRow>
  );
}
