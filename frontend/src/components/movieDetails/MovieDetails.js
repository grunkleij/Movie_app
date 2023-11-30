import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { useWatchContext } from "../hooks/useWatchContext";

// import '..movieDetails/MovieDetails.css'

const MovieDetails = () => {
  const [movied, setMovied] = useState([]);
  const { id } = useParams();
  const {token}=useContext(LoginContext);
  const [wl,setWl]=useState(false);
  const {watch,dispatch}=useWatchContext();


  const handWatchList = () => {
    console.log(movied.id);
  
    const data = {
      email: token.email,
      movieWatchList: [movied.id],
    };
  
    if (watch.some((e) => e.id === movied.id)) {
      // Movie is in the watchlist, so remove it
      console.log("Removing movie with id:", movied.id);
  
      axios
        .delete(`http://localhost:1234/user/${token.email}/${movied.id}`)
        .then((res) => {
          console.log("Deleted successfully", res.data.valueD);
          dispatch({ type: 'REMOVIE_WATCH', payload: res.data.valueD });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Movie is not in the watchlist, so add it
      console.log("Adding movie with id:", movied.id);
  
      axios
        .post("http://localhost:1234/user/", data)
        .then((res) => {
          console.log("Success");
          console.log("id:", movied.id);
  
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${movied.id}?api_key=582913cbc1255e68ef241e0956a7ae7c`
            )
            .then((res) => {
              console.log('statedata', res.data);
              dispatch({ type: 'ADD_WATCH', payload: res.data });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=582913cbc1255e68ef241e0956a7ae7c`
      )
      .then((res) => {
        const daData = res.data;
        setMovied(daData);
        console.log("da data", daData);
  
        axios.get(`http://localhost:1234/user/${token.email}`)
      .then((res) => {
        console.log(res.data[0].movieWatchList);
        const watchArray = res.data[0].movieWatchList;
        // Set movies state and then proceed with the additional logic

        // setMovies(watchArray);
        console.log("yes")

        // Additional logic for each movie in the watch list  
        const moviePromises = watchArray.map((e) => {
          return axios.get(`https://api.themoviedb.org/3/movie/${e}?api_key=582913cbc1255e68ef241e0956a7ae7c`);
        });

        Promise.all(moviePromises)
          .then((responses) => {
            // Extract the movie data from each response
            const moviesData = responses.map((response) => response.data);
            // setMovied(moviesData);
            console.log('moveie getting')
            dispatch({type:'SET_WATCH',payload:moviesData})
            console.log(moviesData,"watchlist");
            

          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token.email, dispatch]);
  



  return (
    <div>
      <div
        className="img"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(117, 117, 117, 0), rgba(0, 0, 0, 0.58) 70%), url('https://image.tmdb.org/t/p/original//${movied.backdrop_path}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "100%",
          height: "100vh",
          textAlign: "center",
          color: " rgb(255, 255, 255)",
        }}
      ></div>

      <div
        style={{ position: "absolute", bottom: "8px", left: "16px", color:"white", fontSize:'100px',fontWeight:'bold'}}
      >
        {movied.title}
      <p onClick={handWatchList} className="watchlist"> {
       
     
   }
             <span>{watch.some((e) => e.id === movied.id) ?<FaBookmark/> : <CiBookmark/> }</span> 
     </p>
      </div>
    </div>
  );
};

export default MovieDetails;
