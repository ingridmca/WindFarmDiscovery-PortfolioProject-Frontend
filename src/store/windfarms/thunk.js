import axios from "axios";
import { turbinesFetched } from "./slice";

const API_URL = `https://eersc.usgs.gov/api/uswtdb/v1`;

export const fetchTurbines = () => async (dispatch, getState) => {
  try {
    const columnKeys =
      "case_id,p_year,p_tnum,t_manu,t_model,t_cap,t_hh,p_name,t_cap,xlong,ylat";

    const selectedModels =
      "&or=(t_model.eq.V150-4.0,t_model.eq.V82-1.65, t_model.eq.GE2.0-116, t_model.eq.GE2.7-116,t_model.eq.G87-2.0,t_model.eq.G58-0.85)";

    const filterKeys = `&or=(t_manu.eq.Vestas, t_manu.eq.Gamesa, t_manu.eq.GE Wind)&t_model=neq.null${selectedModels}`;

    const response = await axios.get(
      `${API_URL}/turbines?${filterKeys}&select=${columnKeys}`
    );
    // const modelsarray = response.data.map((wt) => wt.t_model);
    // const models = [...new Set(modelsarray)].sort();
    // console.log("response", response, models);
    const turbines = response.data;
    dispatch(turbinesFetched(turbines));
  } catch (e) {
    console.log(e.message);
  }
};
