import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import PropTypes from "prop-types";

const DeleteDialog = (props) => {
  return (
    <Dialog onClose={props.onClose} fullWidth={true} maxWidth='sm' open={props.open}>
      <DialogTitle>Are you sure you wanna delete this todo?</DialogTitle>
      <DialogContent>
        {props.content}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default DeleteDialog;