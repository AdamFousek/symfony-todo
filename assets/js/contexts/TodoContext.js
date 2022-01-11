import React, {createContext, useEffect, useState} from 'react';
import axios  from 'axios';

export const TodoContext = createContext();

function TodoContextProvider(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    readTodo();
  }, [])

  const readTodo = () => {
    axios.get('/api/todo/read')
    .then(response => {
      setTodos(() => {
        return response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  };

  const createTodo = (todo) => {
    setTodos((todos) => {
      return [todo, ...todos];
    })
  };

  const updateTodo = (updatedTodo) => {
    const ts = todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        todo.task = updatedTodo.task;
      }
      return todo;
    });
    setTodos(() => {
      return ts;
    });
  };

  const deleteTodo = (id) => {
    const ts = todos.filter(todo => todo.id !== id);
    setTodos(() => {
      return ts
    });
  };

  return (
    <TodoContext.Provider value={{
      todos,
      createTodo,
      readTodo,
      updateTodo,
      deleteTodo,
    }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoContextProvider;