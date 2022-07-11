import { NavigationHomePage } from "../../components/Navbar/NavbarHomePage";
import WindyMap from "../../components/WindyMap/windyMap";

const HomePage = () => {
  return (
    <div>
      <NavigationHomePage />
      <div style={{ position: "relative", marginTop: -64 }}>
        <WindyMap />
      </div>
    </div>
  );
};

export default HomePage;
