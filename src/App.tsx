import "./App.css";
import SideNav from "./SideNav";
import HomePage from "./Caged Section/HomePage";
import CAGEDInterface from "./Caged Section/CAGEDInterface";
import CustomInterface from "./Custom Section/CustomInterface";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <SideNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CAGED" element={<CAGEDInterface />} />
        <Route path="/Customize" element={<CustomInterface />} />
      </Routes>
    </div>
  );
}

export default App;
