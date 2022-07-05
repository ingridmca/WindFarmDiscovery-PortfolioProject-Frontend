import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navbar/Navbar";

import DetailsPage from "./pages/DetailsPage/DetailsPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        {/* more pages to be added here later */}
        <Route path="/" element={<HomePage />} />
        <Route path="/:p_name" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
