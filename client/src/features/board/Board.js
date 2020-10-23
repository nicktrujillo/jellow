import axios from "axios";
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
  }, []);

  function handleDelete(item) {
    console.log(item.id);
    dispatch(removeColumn(item.id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputText);
    dispatch(addColumn(inputText));
    setInputText("");
  }

  return (
    <div>
      <div class="nav">
        <h1>Jellow</h1>
        <div>
          <button class="logout">Log Out</button>
          <img class="user" src="user.png" />
        </div>
      </div>
      {projects.map((item) => (
        <div key={item.id}>
          <h1 className="project-title">{item.title}</h1>
        </div>
      ))}
      <div className="col-container">
        {columns.map((item) => (
          <div className="col" key={item.id}>
            <h3 class="list-title">{item.title}</h3>
            <Column id={item.id} />
            <button onClick={() => handleDelete(item)}>delete column</button>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="add new column"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          ></input>
        </form>
      </div>
    </div>
  );
}
