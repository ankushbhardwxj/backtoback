import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "todos",
  initialState: {
    value: [{ name: "learn redux", done: false }],
  },
  reducers: {
    addTodo: function (state, action) {
      state.value.push({
        name: action.payload.name,
        done: false,
      });
    },
    toggleTodo: function (state, action) {
      const payload = state.value[action.payload];
      payload.done = !payload.done;
    },
    deleteTodo: function (state, action) {
      const idx = state.value.findIndex(function (item) {
        return item.name === action.payload;
      });
      state.value.splice(idx, 1);
    },
  },
});

const [{ addTodo, toggleTodo, deleteTodo }, todoReducer] = [
  slice.actions,
  slice.reducer,
];

const getTodos = function (state) {
  return state.todos;
};

const store = configureStore({
  reducer: { todos: todoReducer }, // from slice
});

const TodoList = function () {
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();

  const handleToggle = function (todoIdx) {
    dispatch(toggleTodo(todoIdx));
  };

  const handleDelete = function (todoIdx) {
    dispatch(deleteTodo(todoIdx));
  };

  const todolist = todos.value.map(function (item, idx) {
    return (
      <li key={idx}>
        <span onClick={() => handleToggle(idx)}>
          {item.name} {item.done ? "😇" : "❌"}
        </span>
        <span onClick={() => handleDelete(item.name)}> del </span>
      </li>
    );
  });

  if (todos.value.length > 0) return <ul>{todolist}</ul>;
  else return <p> ALL TODOS DONE ! </p>;
};

const TodoForm = function () {
  const [todoItem, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = function (evt) {
    evt.preventDefault();
    setTodo(evt.target.value);
  };

  const handleBtnSubmit = function () {
    dispatch(addTodo({ name: todoItem, done: false }));
    setTodo("");
  };

  return (
    <>
      <input
        type="text"
        value={todoItem}
        placeholder="Add a todo"
        onChange={handleInputChange}
      />
      <button onClick={handleBtnSubmit}>Submit</button>
    </>
  );
};

const App = function () {
  return (
    <>
      <h2> Todo jam </h2>
      <TodoForm />
      <TodoList />
    </>
  );
};

ReactDOM.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);
