import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "Filter",
  initialState: { filterToggle: false, isGridView: true },
  reducers: {
    toggleFilterWindow: (state) => {
      if (state.filterToggle === true) {
        state.filterToggle = false;
      } else {
        state.filterToggle = true;
      }
    },
    toggleGridListView: (state, action) => {
      state.isGridView = action.payload;
    },
  },
});

export const { toggleFilterWindow, toggleGridListView } = filterSlice.actions;
export default filterSlice.reducer;
