import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterWindFarms } from "../../store/windfarms/selector";
import WindTurbineFilters from "../WindTurbineFilters/WindTurbineFilters";

import "./windyMap.css";

const WindyMap = () => {
  const windFarms = useSelector(filterWindFarms);
  const [markerLayer, setMarkerLayer] = useState();

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

    if (markerLayer) {
      markerLayer.clearLayers();
    }

    const markerOnClick = (e) => {
      const windfarm = windFarms.filter(
        (wt) => wt.ylat === e.latlng.lat && wt.xlong === e.latlng.lng
      )[0].p_name;

      navigate(`/${windfarm}`);

      //console.log(e.latlng.lat, e.latlng.lng, windfarm);
    };

    const markers = windFarms.map((e) => {
      const marker = window.L.marker([e.ylat, e.xlong]).on(
        "click",
        markerOnClick
      );

      // map.addLayer(marker);
      return marker;
      // window.L.marker([e.ylat, e.xlong], { icon: windTurbineIcon })
    });
    const newMarkersLayer = window.L.layerGroup(markers);
    map.addLayer(newMarkersLayer);

    setMarkerLayer(newMarkersLayer);
  }, [windFarms, map, navigate]);

  return (
    <div>
      <div id="windy"></div>

      <WindTurbineFilters windFarms={windFarms} />
    </div>
  );
};

export default WindyMap;
