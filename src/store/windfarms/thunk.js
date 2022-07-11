import axios from "axios";
import {
  turbinesFetched,
  windFarmDetailsFetched,
  windTurbinesFromAFarmFetched,
} from "./slice";

const API_URL = `https://eersc.usgs.gov/api/uswtdb/v1`;
const DB_URL = `http://localhost:4000`;

export const fetchTurbines = () => async (dispatch, getState) => {
  try {
    const columnKeys =
      "p_name, case_id, xlong,ylat,t_manu,t_cap, t_hh, p_year,t_model,p_tnum,p_cap";

    const selectedModels =
      "&or=(t_model.eq.V150-4.0,t_model.eq.V82-1.65, t_model.eq.GE2.0-116, t_model.eq.GE2.7-116,t_model.eq.G87-2.0,t_model.eq.G58-0.85)";

    const filterKeys = `&or=(t_manu.eq.Vestas, t_manu.eq.Gamesa, t_manu.eq.GE Wind)&t_model=neq.null${selectedModels}`;

    const responseFarms = await axios.get(
      `${API_URL}/turbines?${filterKeys}&select=${columnKeys}`
    );

    const windFarms = responseFarms.data;
    const uniqueWindFarms = {};

    for (let i = 0; i < windFarms.length; i++) {
      if (uniqueWindFarms[windFarms[i].p_name]) {
        continue;
      } else {
        uniqueWindFarms[windFarms[i].p_name] = {
          p_name: windFarms[i].p_name,
          case_id: windFarms[i].case_id,
          xlong: windFarms[i].xlong,
          ylat: windFarms[i].ylat,
          t_manu: windFarms[i].t_manu,
          t_cap: windFarms[i].t_cap,
          t_hh: windFarms[i].t_hh,
          p_year: windFarms[i].p_year,
          t_model: windFarms[i].t_model,
          p_tnum: windFarms[i].p_tnum,
          p_cap: windFarms[i].p_cap,
        };
      }
    }

    const uniqueWindFarmsArray = Object.values(uniqueWindFarms);

    dispatch(turbinesFetched(uniqueWindFarmsArray));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchWindFarms = (turbineModel) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${DB_URL}/windfarm`);
    const windFarm = response.data.filter((wf) => wf.model === turbineModel)[0];

    dispatch(windFarmDetailsFetched(windFarm));
    // console.log("response", windFarm);
  } catch (e) {
    console.log(e.message);
  }
};

export const turbinesFromAWindFarm =
  (windFarmName) => async (dispatch, getState) => {
    try {
      const columnKeys =
        "p_name, case_id, xlong,ylat,t_manu,t_cap, t_hh, p_year,t_model,p_tnum,p_cap";
      const filterKeys = `&p_name=eq.${windFarmName}`;
      const responseTurbines = await axios.get(
        `${API_URL}/turbines?${filterKeys}&select=${columnKeys}`
      );
      dispatch(windTurbinesFromAFarmFetched(responseTurbines.data));
    } catch (e) {
      console.log(e.message);
    }
  };
