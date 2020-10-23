import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  displayProjects,
  displayCards,
  displayColumns,
  getProjects,
  getColumns,
  getCards,
  getBoard,
  addColumn,
  removeColumn,
  updateColumn,
  addCard,
  removeCard,
  updateCard,
  selectProjects,
  selectColumns,
  selectCards,
  selectBoard,
} from "./boardSlice";
import Column from "./Column";

export function Board() {
  const projects = useSelector(selectProjects);
  const columns = useSelector(selectColumns);
  const cards = useSelector(selectCards);
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    dispatch(getColumns());
  }, [projects]);

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     dispatch(addTodo(inputText));
  //     setInputText("");
  //   }
  //   function handleDelete(item) {
  //     dispatch(removeTodo(item.id));
  //   }
  //   function handleUpdate(id, status) {
  //     dispatch(updateTodo({ id, status }));
  //   }

  return (
    <div className="container">
      {/* <form className="todo-form" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInputText(e.target.value)}
          className="todo-input"
          placeholder="Enter your todo here"
          value={inputText}
        ></input>
      </form>
      {todo.map((item) => (
        <div className="todo-item-container" key={item.id} id={item.id}>
          <div className="todo-description">{item.description}</div>
          <div className="todo-status-container">
            <div className="todo-status">Status: {item.status}</div>
            <div className="toggle-todo">
              <div
                className="todo-completed"
                onClick={() => handleUpdate(item.id, "completed")}
              >
                Completed
              </div>
              <div
                className="todo-active"
                onClick={() => handleUpdate(item.id, "active")}
              >
                Active
              </div>
            </div>
            <button
              className="todo-delete-btn"
              onClick={() => handleDelete(item)}
            >
              Delete todo
            </button>
          </div>
        </div>
      ))} */}
      {projects.map((item) => (
        <div key={item.id}>
          <h1 className="project-title">{item.title}</h1>
        </div>
      ))}
      <div className="column-container">
        {columns.map((item) => (
          <div className="column" key={item.id}>
            <h2>{item.title}</h2>
            <Column id={item.id} />
            <button>delete column</button>
          </div>
        ))}
      </div>
    </div>
  );
}
