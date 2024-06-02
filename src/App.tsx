import "./App.css";
import SideNav from "./SideNav";
import HomePage from "./HomePage";
import CAGEDInterface from "./CAGEDInterface";
import CustomFretboard from "./CustomFretboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <SideNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CAGED" element={<CAGEDInterface />} />
        <Route path="/Customize" element={<CustomFretboard />} />
      </Routes>
    </div>
  );
}

export default App;
