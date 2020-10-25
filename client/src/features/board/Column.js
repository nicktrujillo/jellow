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

function Column(props) {
  const [cardList, setCardList] = useState([]);
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`/api/cards/${props.id}`).then((r) => {
      setCardList(r.data);
    });
  }, []);

  function getCards() {
    axios.get(`/api/cards/${props.id}`).then((r) => {
      setCardList(r.data);
    });
    setInputText("");
    setInputTextTwo("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`/api/cards`, { description: inputText, id: props.id })
      .then((r) => {
        getCards();
      });
  }

  function handleDelete(item) {
    console.log(item.id);
    axios.delete(`/api/cards/${item.id}`).then((r) => {
      getCards();
    });
  }

  //   MODAL
  const [activeCard, setActiveCard] = useState(null);
  const [inputTextTwo, setInputTextTwo] = useState("");
  const [members, setMembers] = useState([]);
  const [inputTextThree, setInputTextThree] = useState("");
  const columns = useSelector(selectColumns);

  function handleSave() {
    if (inputTextTwo === "") {
      setActiveCard(null);
    } else {
      axios
        .patch(`/api/cards/${activeCard.id}`, {
          description: inputTextTwo,
          column_id: props.id,
        })
        .then((r) => {
          getCards();
        });
      setActiveCard(null);
    }
  }

  function handleAdd() {
    members.push({ name: inputTextThree });
    setInputTextThree("");
  }

  function handleClick(id) {
    console.log(id);
    axios
      .patch(`/api/cards/${activeCard.id}`, {
        description: activeCard.description,
        column_id: id,
      })
      .then((r) => {
        getCards();
      });
    window.location.reload();
    setActiveCard(null);
  }

  return (
    <div>
      {activeCard ? (
        <div id="modalContainer">
          <h4 className="columnChangeTitle">Change Column:</h4>
          <div className="columnChange">
            {columns.map((item) => (
              <p
                className="newColumn"
                onClick={() => handleClick(item.id)}
                key={item.id}
              >
                {item.title}
              </p>
            ))}
          </div>
          <h4 className="members-title">Members:</h4>
          <ul>
            {members.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <div className="new-member">
            <input
              className="member-input"
              type="text"
              placeholder="new member"
              onChange={(e) => setInputTextThree(e.target.value)}
              value={inputTextThree}
            ></input>
            <button onClick={handleAdd}>add</button>
          </div>
          <h4 className="desc-title">Description:</h4>
          <p className="desc-body">{activeCard.description}</p>
          <input
            type="text"
            placeholder="update description"
            onChange={(e) => setInputTextTwo(e.target.value)}
            value={inputTextTwo}
            className="new-desc"
          ></input>
          <div className="save-exit">
            <button className="exit" onClick={() => setActiveCard(null)}>
              Exit
            </button>
            <button className="save" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : null}

      {cardList.map((item) => (
        <div key={item.id} className="list-row">
          <ul className="list-items">
            <li onClick={() => setActiveCard(item)}>{item.description}</li>
          </ul>
          <button className="btn xbtn" onClick={() => handleDelete(item)}>
            x
          </button>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="btn add-card"
          type="text"
          placeholder="+ Add new card"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        ></input>
      </form>
    </div>
  );
}

export default Column;
