import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterWindTurbines } from "../../store/windfarms/selector";
import WindTurbineFilters from "../WindTurbineFilters/WindTurbineFilters";

import "./windyMap.css";

const WindyMap = () => {
  const windTurbines = useSelector(filterWindTurbines);

  console.log(windTurbines);

  const [map, setMap] = useState();
  let navigate = useNavigate();

  //Fetch windy API
  useEffect(() => {
    window.windyInit(
      {
        key: "p8gpG9VT6Qp6VHhnGWjEKMfs7xjSO3lE",
        lat: 28.37,
        lon: -81.5194,
        zoom: 4,
      },
      (windyAPI) => {
        const { map } = windyAPI;

        // const windTurbineIcon = window.L.icon({
        //   iconUrl: "windmill.png",
        //   iconSize: [5, 10],
        // });

        setMap(map);
      }
    );
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    // clean up map before re-rendering the new filters.

    const markerOnClick = (e) => {
      const windfarm = windTurbines.filter(
        (wt) => wt.ylat === e.latlng.lat && wt.xlong === e.latlng.lng
      )[0].p_name;

      navigate(`/${windfarm}`);

      //console.log(e.latlng.lat, e.latlng.lng, windfarm);
    };

    windTurbines.forEach((e) => {
      window.L.marker([e.ylat, e.xlong]).addTo(map).on("click", markerOnClick);
      // window.L.marker([e.ylat, e.xlong], { icon: windTurbineIcon })
    });
  }, [windTurbines, map, navigate]);

  return (
    <div>
      <div id="windy"></div>

      <WindTurbineFilters windTurbines={windTurbines} />
    </div>
  );
};

export default WindyMap;
