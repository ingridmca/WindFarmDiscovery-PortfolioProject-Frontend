import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windTurbines: [],
  filters: {
    supplier: null,
    ratedPower: 0,
    year: 1990,
    height: 50,
  },
  windFarmsDetails: null,
  windTurbinesFromAFarm: [],
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
    setOperationalYear: (state, action) => {
      state.filters.year = action.payload;
    },
    setHeight: (state, action) => {
      state.filters.height = action.payload;
    },
    windFarmDetailsFetched: (state, action) => {
      state.windFarmsDetails = { ...action.payload };
    },
    windTurbinesFromAFarmFetched: (state, action) => {
      state.windTurbinesFromAFarm = [...action.payload];
    },
  },
});

export const {
  turbinesFetched,
  setSupplier,
  setRatedPower,
  setOperationalYear,
  setHeight,
  windFarmDetailsFetched,
  windTurbinesFromAFarmFetched,
} = balanceSlice.actions;

export default balanceSlice.reducer;
