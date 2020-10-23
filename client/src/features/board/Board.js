import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  displayProjects,
  displayCards,
  displayColumns,
  getProjects,
  getColumns,
  getCards,
  addColumn,
  removeColumn,
  updateColumn,
  addCard,
  removeCard,
  updateCard,
  selectProjects,
  selectColumns,
  selectCards,
} from "./boardSlice";

export function Board() {
  const projects = useSelector(selectProjects);
  const columns = useSelector(selectColumns);
  const cards = useSelector(selectCards);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    dispatch(getColumns());
  }, [columns]);

  useEffect(() => {
    dispatch(getCards());
  }, [cards]);

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
          <h1>{item.title}</h1>
        </div>
      ))}
      {columns.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          {cards.map((item) => (
            <div key={item.id}>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
