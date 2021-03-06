import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { IconButton, Box } from "@material-ui/core";
import { clear } from "../../../functions";

function ShareButton({ disabled, queue, setQueue }) {
  function handleClick() {
    let confirmClear = confirm("Are you sure you want to clear the queue?");
    if (confirmClear) {
      setQueue(clear(queue));
    }
  }

  return (
    <Box mt={1}>
      <IconButton
        edge="end"
        title="Clear the entire queue"
        disabled={disabled}
        onClick={handleClick}
        target="_blank"
        color={disabled ? "inherit" : "secondary"}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}

export default ShareButton;
