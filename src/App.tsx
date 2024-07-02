import "./App.css";
import Header from "./Common/Header";
import SideNav from "./Common/SideNav";
import HomePage from "./CagedSection/HomePage";
import CAGEDInterface from "./CagedSection/CAGEDInterface";
import CustomInterface from "./CustomSection/CustomInterface";
import Progression from "./ProgressionsSection/Progression";
import ProgressionTemplate from "./ProgressionsSection/ProgressionTemplate";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <SideNav />
      <div className="content">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="CAGED" element={<CAGEDInterface />} />
          <Route path="Customize" element={<CustomInterface />} />
          <Route path="Progressions" element={<ProgressionTemplate />} />
          <Route path="Progressions/:userTitle" element={<Progression />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
