import React, {createContext, useEffect, useState} from 'react';
import axios  from 'axios';

export const TodoContext = createContext();

function TodoContextProvider(props) {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState({});

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
    axios.post('/api/todo/create', {
      name: todo.task
    }).then(response => {
      if (response.data.message.level === 'success') {
        setTodos((todos) => {
          return [response.data.todo, ...todos];
        })
      }
      setMessage(message => {
        return response.data.message;
      })
    }).catch(error => {
      console.log(error);
    })

  };

  const updateTodo = (updatedTodo) => {
    axios.put('/api/todo/update/' + updatedTodo.id, {
      id: updatedTodo.id,
      name: updatedTodo.task,
    })
    .then(response => {
      const ts = todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          todo.task = updatedTodo.task;
        }
        return todo;
      });
      setTodos(() => {
        return ts;
      });
    }).catch(error => {
      console.log(error);
    })

  };

  const deleteTodo = (id) => {
    axios.delete('/api/todo/delete/' + id)
      .then(response => {
        console.log(response);
        const ts = todos.filter(todo => todo.id !== id);
        setTodos(() => {
          return ts
        });
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <TodoContext.Provider value={{
      todos,
      message,
      setMessage,
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