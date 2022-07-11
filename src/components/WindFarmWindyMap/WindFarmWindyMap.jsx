import { useEffect, useState } from "react";
import "./WindFarmWindyMap.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectWindTuebinesFromFarm } from "../../store/windfarms/selector";
import { turbinesFromAWindFarm } from "../../store/windfarms/thunk";

const WindFarmWindyMap = (props) => {
  const [map, setMap] = useState();
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
    dispatch(turbinesFromAWindFarm(windFarmName));
  }, [windFarmName, dispatch]);

  useEffect(() => {
    if (!map || !windTurbines) {
      return;
    }
    console.log(windTurbines);
    const windTurbineIcon = window.L.icon({
      iconUrl: "windmill.png",
      iconSize: [30, 32],
    });

    windTurbines.forEach((e) => {
      window.L.marker([e.ylat, e.xlong], { icon: windTurbineIcon }).addTo(map);

      // window.L.marker([e.ylat, e.xlong], { icon: windTurbineIcon })
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
