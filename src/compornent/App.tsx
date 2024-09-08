import React, { useEffect } from "react";
import { HomeScreen } from "./HomeScreen";
import { Routes, Route } from "react-router-dom";
import { Useradd } from "./Useradd";

import "../css/App.css";
import { DetailPage } from "./DetailPage/DetailPage";

function App() {
  useEffect(() => {
    document.title = "contribution_ranking";
  }, []);
  return (
    <body>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/useradd" element={<Useradd />} />
        <Route path="/detail/:loginID" element={<DetailPage />} />
      </Routes>
    </body>
  );
}

export default App;
