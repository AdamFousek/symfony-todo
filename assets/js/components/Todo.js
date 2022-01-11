import React, {Fragment, useContext, useState} from 'react';
import {IconButton, TableCell, TableRow, TextField} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {TodoContext} from "../contexts/TodoContext";

const Todo = (props) => {
  const todoCtx = useContext(TodoContext);
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState('');

  const closeHandler = () => {
    setShowEdit(false);
    setEditTask('');
  }

  const updateHandler = () => {
    todoCtx.updateTodo({id: props.todo.id, task: editTask});
    setShowEdit(false);
  }

  return (
    <TableRow>
      <TableCell>
        {showEdit ?
          <TextField
            fullWidth={true}
            value={editTask}
            onChange={(e) => { setEditTask(e.target.value) }}
            InputProps={{
              endAdornment: <Fragment>
                <IconButton onClick={closeHandler}><CloseIcon /></IconButton>
                <IconButton onClick={updateHandler}><DoneIcon /></IconButton>
              </Fragment>
            }}
          />
          :
          props.todo.task}
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => {setShowEdit(props.todo.id); setEditTask(props.todo.task) }}>
          <EditIcon/>
        </IconButton>
        <IconButton>
          <DeleteIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Todo;