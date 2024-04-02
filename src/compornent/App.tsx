import React, { useEffect } from "react";
import { HomeScreen } from "./HomeScreen";
import { Routes, Route } from "react-router-dom";
import { Useradd } from "./Useradd";

import "../css/App.css";

function App() {
  useEffect(() => {
    document.title = "contribution_ranking";
  }, []);
  return (
    <body>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/useradd" element={<Useradd />} />
      </Routes>
    </body>
  );
}

export default App;
