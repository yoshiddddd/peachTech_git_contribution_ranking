import { HomeScreen } from "./HomeScreen";
import { Routes, Route,Link } from "react-router-dom";
import { Useradd } from "./Useradd";
import './Useradd.css';

function App() {

    return (
    <body>
        <header>
            <div className='header'>
            🍑 Peach.Tech Contribution RANKING 👑
            </div>
            <div className="navigate">
                <Link className="useradd" to="/useradd">useradd</Link>
                <Link to="/">HOME</Link>
            </div>
        </header>
        <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/useradd" element={<Useradd/>}/>
        </Routes>
            {/* <HomeScreen/> */}
    </body>
    );
}

export default App;

                    // <Routes>
                    //     <Route path="/useradd" element={<Useradd />}/>
                    // </Routes>
                    // <Link to="/useradd">useradd</Link>