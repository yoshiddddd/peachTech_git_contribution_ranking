import { HomeScreen } from "./HomeScreen";
import { Routes, Route,Link } from "react-router-dom";
import { Useradd } from "./Useradd";
import './Useradd.css';

function App() {

    return (
    <body>
        <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/useradd" element={<Useradd/>}/>
        </Routes>
    </body> 
    );
}

export default App;

