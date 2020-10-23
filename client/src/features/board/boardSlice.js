import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    projects: [],
    cards: [],
    columns: [],
    board: [],
  },
  reducers: {
    displayProjects: (state, action) => {
      state.projects = action.payload;
    },
    displayColumns: (state, action) => {
      state.columns = action.payload;
    },
    displayCards: (state, action) => {
      state.cards.push(action.payload);
    },
    displayBoard: (state, action) => {
      state.board.push(action.payload);
    },
  },
});

export const {
  displayProjects,
  displayCards,
  displayColumns,
  displayBoard,
} = boardSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getProjects = () => (dispatch) => {
  axios.get("/api/projects/1").then((r) => dispatch(displayProjects(r.data)));
};
export const getColumns = () => (dispatch) => {
  axios.get("/api/columns").then((r) => dispatch(displayColumns(r.data)));
};
export const getCards = (id) => (dispatch) => {
  axios.get(`/api/cards/${id}`).then((r) => dispatch(displayCards(r.data)));
};
export const getBoard = () => (dispatch) => {
  axios.get("/api/board").then((r) => dispatch(displayBoard(r.data)));
};

export const addColumn = (obj) => (dispatch) => {
  axios.post("/api/columns", { title: obj }).then((r) => {
    dispatch(getProjects());
  });
};
export const removeColumn = (id) => (dispatch) => {
  axios.delete("/api/columns/" + id).then((r) => {
    dispatch(getProjects());
  });
};
export const updateColumn = (obj) => (dispatch) => {
  axios.patch("/api/columns/" + obj.id, { status: obj.status }).then((r) => {
    dispatch(getProjects());
  });
};

export const addCard = (obj) => (dispatch) => {
  axios
    .post("/api/cards", { title: obj.description, column_id: obj.id })
    .then((r) => {
      dispatch(getProjects());
    });
};
export const removeCard = (id) => (dispatch) => {
  axios.delete("/api/columns/" + id).then((r) => {
    dispatch(getProjects());
  });
};
export const updateCard = (obj) => (dispatch) => {
  axios.patch("/api/columns/" + obj.id, { status: obj.status }).then((r) => {
    dispatch(getProjects());
  });
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProjects = (state) => state.board.projects;
export const selectColumns = (state) => state.board.columns;
export const selectCards = (state) => state.board.cards;
export const selectBoard = (state) => state.board.board;

export default boardSlice.reducer;
