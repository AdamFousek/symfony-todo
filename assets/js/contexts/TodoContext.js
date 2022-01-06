import React, {createContext, useState} from 'react';

export const TodoContext = createContext();

function TodoContextProvider(props) {
  const [todos, setTodos] = useState([{task: 'do something'}]);

  const createTodo = () => {};

  const readTodo = () => {};

  const updateTodo = () => {};

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