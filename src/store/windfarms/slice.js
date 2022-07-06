import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windTurbines: [],
  filters: {
    supplier: null,
    ratedPower: 0,
  },
};

export const balanceSlice = createSlice({
  name: "windfarms",
  initialState,
  reducers: {
    turbinesFetched: (state, action) => {
      // console.log("turbinesFetched action", action);
      state.windTurbines = [...action.payload];
    },
    setSupplier: (state, action) => {
      state.filters.supplier = action.payload;
    },
    setRatedPower: (state, action) => {
      state.filters.ratedPower = action.payload;
    },
    turbinesFilter: (state, action) => {
      const filteredbySupplier =
        action.payload.supplier === ""
          ? state.windTurbines
          : state.windTurbines.filter(
              (wt) => wt.p_name === action.payload.supplier
            );

      const filteredbySupplierAndPower =
        action.payload.ratedPower === 0
          ? filteredbySupplier
          : filteredbySupplier.filter(
              (wt) => wt.t_cap <= action.payload.ratedPower
            );

      console.log(state.windTurbines, action.payload);
    },
  },
});

export const { turbinesFetched, turbinesFilter, setSupplier, setRatedPower } =
  balanceSlice.actions;

export default balanceSlice.reducer;
