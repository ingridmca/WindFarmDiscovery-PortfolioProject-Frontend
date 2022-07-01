import { useEffect } from "react";
import "./leaflet.css";

const HomePage = () => {
  useEffect(() => {
    window.windyInit(
      {
        key: "p8gpG9VT6Qp6VHhnGWjEKMfs7xjSO3lE",
        verbose: true,
        lat: 28.37,
        lon: -81.5194,
        zoom: 4,
      },
      (windyAPI) => {
        const { map } = windyAPI;

        window.L.popup()
          .setLatLng([28.37, -81.5194])
          .setContent("Hello World")
          .openOn(map);
      }
    );
  }, []);

  return (
    <div>
      <div id="windy"></div>
    </div>
  );
};

export default HomePage;
