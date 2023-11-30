import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import Card from '../card/Card';
import  './Watchlist.css'
import { useWatchContext } from '../hooks/useWatchContext';


const Watchlist = () => {
  const { token } = useContext(LoginContext);
  const [movies, setMovies] = useState([]);
  const [flag, setFlag] = useState(1);
  const {watch,dispatch}=useWatchContext();





  useEffect(() => {
    console.log("inside")
    axios.get(`http://localhost:1234/user/${token.email}`)
      .then((res) => {
        console.log(res.data[0].movieWatchList);
        const watchArray = res.data[0].movieWatchList;
        // Set movies state and then proceed with the additional logic

        setMovies(watchArray);
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
  }, []); // Dependency array to ensure the effect runs when token.email changes

  return (
    <div>
        <h1>WatchList</h1>
        <div className="container watchlist">

      {
          watch&&watch.map((e) => (
              <Card className="shadow"id={e.id}  image={e.poster_path} key={e.id} title={e.original_title}  />
              ))
            }
      {/* Additional JSX */}
            </div>
    </div>
  );
};

export default Watchlist;
