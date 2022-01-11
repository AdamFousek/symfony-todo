import React, {Fragment, useContext, useState} from 'react';
import {IconButton, TableCell, TableRow, TextField} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {TodoContext} from "../contexts/TodoContext";
import DeleteDialog from "./DeleteDialog";

const Todo = (props) => {
  const todo = props.todo;
  const todoCtx = useContext(TodoContext);
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const closeHandler = () => {
    setShowEdit(false);
    setEditTask('');
  }

  const updateHandler = () => {
    todoCtx.updateTodo({id: todo.id, task: editTask});
    setShowEdit(false);
  }

  const deleteTodoHandler = () => {
    todoCtx.deleteTodo(todo.id);
    setShowDeleteConfirm(false);
  }

  return (
    <TableRow>
      <TableCell>
        {showEdit ?
          <TextField
            fullWidth={true}
            value={editTask}
            onChange={(e) => {
              setEditTask(e.target.value)
            }}
            InputProps={{
              endAdornment: <Fragment>
                <IconButton onClick={closeHandler}><CloseIcon/></IconButton>
                <IconButton onClick={updateHandler}><DoneIcon/></IconButton>
              </Fragment>
            }}
          />
          :
          todo.task}
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => {
          setShowEdit(todo.id);
          setEditTask(todo.task)
        }}>
          <EditIcon/>
        </IconButton>
        <IconButton onClick={() => {
          setShowDeleteConfirm(true);
        }}>
          <DeleteIcon/>
        </IconButton>
      </TableCell>
      {showDeleteConfirm && <DeleteDialog content={todo.task} open={showDeleteConfirm} onClose={() => {setShowDeleteConfirm(false)}} onConfirm={deleteTodoHandler} />}
    </TableRow>
  );
};

export default Todo;