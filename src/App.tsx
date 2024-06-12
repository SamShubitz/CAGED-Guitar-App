import "./App.css";
import SideNav from "./SideNav";
import HomePage from "./Caged Section/HomePage";
import CAGEDInterface from "./Caged Section/CAGEDInterface";
import CustomInterface from "./Custom Section/CustomInterface";
import ProgressionsList from "./ProgressionsList";
import Progression from "./Progression";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <SideNav />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="CAGED" element={<CAGEDInterface />} />
        <Route path="Customize" element={<CustomInterface />} />
        <Route path="Progressions" element={<ProgressionsList />} />
        <Route path="Progressions/:userTitle" element={<Progression />} />
      </Routes>
    </div>
  );
}

export default App;
