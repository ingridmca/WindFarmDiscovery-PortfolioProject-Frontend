import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navbar/NavbarHomePage";

import DetailsPage from "./pages/DetailsPage/DetailsPage";
import HomePage from "./pages/HomePage/HomePage";
import { fetchTurbines } from "./store/windfarms/thunk";

function App() {
  const dispatch = useDispatch();

  //Fetch USWTDB API

  useEffect(() => {
    console.log("Fetch USWTDB API");
    dispatch(fetchTurbines("Fetch USWTDB API"));
  }, [dispatch]);

  const Login = () => {
    return <div>login</div>;
  };
  return (
    <div>
      <Routes>
        {/* more pages to be added here later */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:p_name" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
