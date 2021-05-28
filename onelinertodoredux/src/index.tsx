import React, { useState, FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface TodoObject {
  name: string;
  done: Boolean;
}

const slice = createSlice({
  name: "todos",
  initialState: {
    value: [{ name: "learn redux", done: false }],
  },
  reducers: {
    addTodo: function (state, action: PayloadAction<TodoObject>) {
      state.value.push({
        name: action.payload.name,
        done: false,
      });
    },
    toggleTodo: function (state, action: PayloadAction<number>) {
      const payload = state.value[action.payload];
      payload.done = !payload.done;
    },
    deleteTodo: function (state, action: PayloadAction<String>) {
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

const getTodos = function (state: ReturnType<typeof store.getState>) {
  return state.todos;
};

const store = configureStore({
  reducer: { todos: todoReducer }, // from slice
});

const TodoList: FunctionComponent = function () {
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();

  function handleToggle(todoIdx: number) {
    dispatch(toggleTodo(todoIdx));
  }

  function handleDelete(todoItemName: String) {
    dispatch(deleteTodo(todoItemName));
  }

  const todolist = todos.value.map(function (item: TodoObject, idx: number) {
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

const TodoForm: FunctionComponent = function () {
  const [todoItem, setTodo] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    setTodo(evt.target.value);
  }

  function handleBtnSubmit() {
    dispatch(addTodo({ name: todoItem, done: false }));
    setTodo("");
  }

  return (
    <React.Fragment>
      <input
        type="text"
        value={todoItem}
        placeholder="Add a todo"
        onChange={handleInputChange}
      />
      <button onClick={handleBtnSubmit}>Submit</button>
    </React.Fragment>
  );
};

const App: FunctionComponent = function () {
  return (
    <React.Fragment>
      <h2> Todo jam </h2>
      <TodoForm />
      <TodoList />
    </React.Fragment>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
