import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div>
      <Routes>
        {/* more pages to be added here later */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
