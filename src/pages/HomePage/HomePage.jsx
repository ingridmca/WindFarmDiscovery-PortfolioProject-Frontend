import { useEffect } from "react";
import { useDispatch } from "react-redux";
import WindyMap from "../../components/WindyMap/windyMap";
import { fetchTurbines } from "../../store/windfarms/thunk";
import "./leaflet.css";

const HomePage = () => {
  const dispatch = useDispatch();

  //Fetch USWTDB API

  useEffect(() => {
    console.log("Fetch USWTDB API");
    dispatch(fetchTurbines("Fetch USWTDB API"));
  }, [dispatch]);

  return (
    <div style={{ position: "relative", marginTop: -64 }}>
      <WindyMap />
    </div>
  );
};

export default HomePage;
