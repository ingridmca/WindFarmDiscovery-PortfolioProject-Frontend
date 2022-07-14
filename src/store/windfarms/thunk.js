import axios from "axios";
import {
  turbinesFetched,
  windFarmDetailsFetched,
  windTurbinesFromAFarmFetched,
  windTurbinesPerformanceFetched,
} from "./slice";

const API_URL = `http://localhost:4000`;

export const fetchTurbines = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${API_URL}/turbine/farms`);

    dispatch(turbinesFetched(res.data));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchWindFarms = (turbineModel) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/windfarm`);
    const windFarm = response.data.filter((wf) => {
      // console.log("thunk response", wf.model, turbineModel);
      return wf.model === turbineModel;
    })[0];

    dispatch(windFarmDetailsFetched(windFarm));
    //console.log("response", response, windFarm);
  } catch (e) {
    console.log(e.message);
  }
};

export const turbinesFromAWindFarm =
  (windFarmName) => async (dispatch, getState) => {
    try {
      const res = await axios.get(`${API_URL}/turbine?p_name=${windFarmName}`);
      dispatch(windTurbinesFromAFarmFetched(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };

export const fetchwindTurbinesPerformance =
  () => async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/turbine/performance`);
      const windTurbinesPerformance = response.data;

      dispatch(windTurbinesPerformanceFetched(windTurbinesPerformance));
      //console.log("response", response);
    } catch (e) {
      console.log(e.message);
    }
  };
