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
    <>
      <div className="nav">
        <h1>Jellow</h1>
        <div>
          <button className="logout">Log Out</button>
          <img className="user" src="./user.jpg" />
        </div>
      </div>
      {projects.map((item) => (
        <div key={item.id}>
          <h2 className="project-title">{item.title}</h2>
        </div>
      ))}
      <div className="col-container">
        {columns.map((item) => (
          <div className="col" key={item.id}>
            <h6 class="list-title">{item.title}</h6>
            <Column id={item.id} />
            <button
              className="btn xbtn x-col"
              onClick={() => handleDelete(item)}
            >
              <i class="fa fa-trash-o"></i>
            </button>
          </div>
        ))}
        <div class="col">
          <form onSubmit={handleSubmit}>
            <input
              className="btn add-col"
              type="text"
              placeholder="+ Add new column"
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}
