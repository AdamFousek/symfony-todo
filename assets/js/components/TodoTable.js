import React, {useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Todo from "./Todo";

function TodoTable(props) {
  const todoCtx = useContext(TodoContext);
  const [insertedTask, setInsertedTask] = useState('');

  const submitFormHandler = (e) => {
    e.preventDefault();
    todoCtx.createTodo({id: + new Date(), task: insertedTask});
    setInsertedTask('');
  }

  const todos = todoCtx.todos.map((todo, index) => (
    <Todo todo={todo} key={'todo ' + index} />
  ));

  return (
    <form onSubmit={submitFormHandler}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField value={insertedTask} onChange={(e) => {setInsertedTask(e.target.value)}} label="New Task" fullWidth={true}/>
            </TableCell>
            <TableCell align="right">
              <IconButton type="submit">
                <AddIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
          {todos}
        </TableBody>
      </Table>
    </form>
  );
}

export default TodoTable;