import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PopMovies from "./components/popMovies/PopMovies";
import MovieDetails from "./components/movieDetails/MovieDetails";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Watchlist from "./components/watchlist/Watchlist";


function App() {
 
  return (
    <div className="App">

        
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PopMovies/>}/>
          <Route path="/movied/:id" element={<MovieDetails/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/watchlist" element={<Watchlist/>}/>
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
