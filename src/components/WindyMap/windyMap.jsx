import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterWindFarms } from "../../store/windfarms/selector";
import WindTurbineFilters from "../WindTurbineFilters/WindTurbineFilters";

import "./windyMap.css";

const WindyMap = () => {
  const windFarms = useSelector(filterWindFarms);
  // eslint-disable-next-line no-unused-vars
  const [_, setMarkerLayer] = useState(null);
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

        setMap(map);
      }
    );
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerOnClick = (e) => {
      const windfarm = windFarms.filter(
        (wt) => wt.ylat === e.ylat && wt.xlong === e.xlong
      )[0].p_name;

      navigate(`/${windfarm}`);
    };

    const markers = windFarms.map((e) => {
      const marker = window.L.marker([e.ylat, e.xlong])
        .bindPopup(
          "Wind Farm: " +
            e.p_name +
            '<br/><button type="button" id="popup-button" class="btn btn-primary sidebar-open-button" data = "' +
            '" ' +
            ">Click for more</button>"
        )
        .on("popupopen", (a) => {
          const button = document.getElementById("popup-button");
          //console.log("do I have popup", e);

          button.addEventListener("click", (event) => {
            markerOnClick(e);
          });
        });

      return marker;
    });
    const newMarkersLayer = window.L.layerGroup(markers);
    map.addLayer(newMarkersLayer);

    setMarkerLayer((oldMarkerLayer) => {
      if (oldMarkerLayer) {
        oldMarkerLayer.clearLayers();
      }

      return newMarkersLayer;
    });
  }, [windFarms, map, navigate]);

  useEffect(() => {});

  return (
    <div>
      <div id="windy" className="windy"></div>

      <WindTurbineFilters windFarms={windFarms} />
    </div>
  );
};

export default WindyMap;
