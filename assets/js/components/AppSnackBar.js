import React, {useContext} from 'react';
import {Button, Snackbar, SnackbarContent} from "@material-ui/core";
import {TodoContext} from "../contexts/TodoContext";

const AppSnackBar = () => {
  const todoCtx = useContext(TodoContext);
  const message = todoCtx.message.text;
  return (
    <Snackbar autoHideDuration={6000} open={message !== undefined}>
      <SnackbarContent message={message} action={[
        <Button onClick={() => todoCtx.setMessage({})} key="dismiss">dismiss</Button>
      ]} />
    </Snackbar>
  );
};

export default AppSnackBar;