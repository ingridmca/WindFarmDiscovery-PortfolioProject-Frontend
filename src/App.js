import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import DetailsPage from "./pages/DetailsPage/DetailsPage";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import PerformancePage from "./pages/PerformancePage/PerformancePage";
import { SignUp } from "./pages/Singup/SignUp";
import { fetchTurbines } from "./store/windfarms/thunk";

function App() {
  const dispatch = useDispatch();

  //Fetch USWTDB API

  useEffect(() => {
    // console.log("Fetch USWTDB API");
    dispatch(fetchTurbines("Fetch USWTDB API"));
  }, [dispatch]);

  return (
    <div>
      <Routes>
        {/* more pages to be added here later */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/:p_name" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
