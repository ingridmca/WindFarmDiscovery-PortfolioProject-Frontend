import { useEffect, useState } from "react";
import "./WindFarmWindyMap.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectWindTuebinesFromFarm } from "../../store/windfarms/selector";
import { turbinesFromAWindFarm } from "../../store/windfarms/thunk";

const WindFarmWindyMap = (props) => {
  const [map, setMap] = useState(null);
  const [ylat, setYLat] = useState(props.ylat);
  const [xlong, setXLong] = useState(props.xlong);
  const windFarmName = props.p_name;
  const dispatch = useDispatch();
  const windTurbines = useSelector(selectWindTuebinesFromFarm());

  //Fetch windy API
  useEffect(() => {
    window.windyInit(
      {
        key: "p8gpG9VT6Qp6VHhnGWjEKMfs7xjSO3lE",
        lat: props.ylat,
        lon: props.xlong,
        zoom: 11,
      },
      (windyAPI) => {
        const { map } = windyAPI;

        setMap(map);
      }
    );
  }, [props.ylat, props.xlong]);

  useEffect(() => {
    if (map) {
      console.log("pan to");
      map.panTo({ lon: xlong, lat: ylat });
    }
  }, [map, xlong, ylat]);

  useEffect(() => {
    dispatch(turbinesFromAWindFarm(windFarmName));
  }, [windFarmName, dispatch]);

  useEffect(() => {
    if (!windTurbines?.lenght) {
      return;
    }

    const maxXlong = Math.max(...windTurbines.map((wt) => wt.xlong));
    const minXlong = Math.min(...windTurbines.map((wt) => wt.xlong));
    const maxYlat = Math.max(...windTurbines.map((wt) => wt.ylat));
    const minYlat = Math.min(...windTurbines.map((wt) => wt.ylat));
    setYLat((maxYlat + minYlat) / 2);
    setXLong((maxXlong + minXlong) / 2);
  }, [windTurbines]);

  useEffect(() => {
    if (!map || !windTurbines || windTurbines.lenght === 0) {
      return;
    }

    const windTurbineIcon = window.L.icon({
      iconUrl: "windmill.png",
      iconSize: [30, 32],
    });

    windTurbines.forEach((e) => {
      window.L.marker([e.ylat, e.xlong], { icon: windTurbineIcon }).addTo(map);
    });
  }, [windTurbines, map]);

  return (
    <div>
      <Windy id="windy"></Windy>
    </div>
  );
};

export default WindFarmWindyMap;
const Windy = styled.div`
  height: 500px;
  width: 500px;
`;
