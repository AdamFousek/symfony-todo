import React, {createContext, useState} from 'react';

export const TodoContext = createContext();

function TodoContextProvider(props) {
  const [todos, setTodos] = useState([{id: 1, task: 'do something'}]);

  const createTodo = (todo) => {
    setTodos((todos) => {
      return [todo, ...todos];
    })
  };

  const readTodo = () => {};

  const updateTodo = (updatedTodo) => {
    const ts = todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        todo.task = updatedTodo.task;
      }
      return todo;
    });
    setTodos(() => {
      return ts;
    })
  };

  const deleteTodo = () => {};

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