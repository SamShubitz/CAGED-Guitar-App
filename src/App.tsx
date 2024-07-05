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
          <Route path="caged" element={<CAGEDInterface />} />
          <Route path="customize" element={<CustomInterface />} />
          <Route path="progressions" element={<ProgressionTemplate />} />
          <Route path="progressions/:userTitle" element={<Progression />} />
          <Route path="progressions/*" element={<ProgressionTemplate />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
