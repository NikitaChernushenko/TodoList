import React, { useEffect } from "react";
import { combineReducers, createStore } from "redux";
import "./App.css";
import TodoList from "./app/Containers/TodoList/TodoList";
import { initialState } from "./app/Containers/TodoList/todoSlice";
import state from "./app/Containers/TodoList/todoSlice";
function App(props) {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Your todo list</p>
      </header>
      <section>
        <TodoList />
      </section>
    </div>
  );
}

export default App;
