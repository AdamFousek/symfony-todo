// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from "./js/contexts/TodoContext";
import TodoTable from "./js/components/TodoTable";

function App(props) {
  return (
    <TodoContextProvider>
      <TodoTable />
    </TodoContextProvider>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'))

