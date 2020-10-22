import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    projects: [],
    cards: [],
    columns: [],
  },
  reducers: {
    displayProjects: (state, action) => {
      state.projects = action.payload;
    },
    displayCards: (state, action) => {
      state.cards = action.payload;
    },
    displayColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export const {
  displayProjects,
  displayCards,
  displayColumns,
} = boardSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getProjects = () => (dispatch) => {
  axios.get("/api/projects").then((r) => dispatch(displayProjects(r.data)));
};
export const getColumns = () => (dispatch) => {
  axios.get("/api/columns").then((r) => dispatch(displayColumns(r.data)));
};
export const getCards = () => (dispatch) => {
  axios.get("/api/cards").then((r) => dispatch(displayCards(r.data)));
};

export const addColumn = (title) => (dispatch) => {
  axios.post("/api/columns", { title: title }).then((r) => {
    dispatch(getColumns());
  });
};

export const removeColumn = (id) => (dispatch) => {
  axios.delete("/api/todos/" + id).then((r) => {
    dispatch(getTodo());
  });
};
export const updateColumn = (obj) => (dispatch) => {
  axios.patch("/api/todos/" + obj.id, { status: obj.status }).then((r) => {
    dispatch(getTodo());
  });
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProjects = (state) => state.board.projects;
export const selectColumns = (state) => state.board.columns;
export const selectCards = (state) => state.board.cards;

export default dashboardSlice.reducer;
