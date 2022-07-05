import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windTurbines: [],
};

export const balanceSlice = createSlice({
  name: "windfarms",
  initialState,
  reducers: {
    turbinesFetched: (state, action) => {
      // console.log("turbinesFetched action", action);
      state.windTurbines = [...action.payload];
    },
  },
});

export const { turbinesFetched } = balanceSlice.actions;

export default balanceSlice.reducer;
