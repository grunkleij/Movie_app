import React, { useContext } from 'react'
import { useEffect, useState } from "react";

import axios from "axios";
import Card from '../card/Card';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import './PopMovies.css'



const PopMovies = () => {
  const {token}=useContext(LoginContext)
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const {yes,setYes}=useContext(LoginContext)
    console.log("haha",token)
  
    const fetchMovies = (pageNumber) => {
      


      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=582913cbc1255e68ef241e0956a7ae7c&page=${pageNumber}`
        )
        .then((res) => {
          setMovie(res.data.results);
          console.log(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const nextPage = () => {
      setPage(page + 1);
    };
  
    const prevPage = () => {
      if (page > 1) {
        setPage(page - 1);
      }
    };
  
    useEffect(() => {

      const createSession = async () => {
        try {
          // Step 1: Fetch Request Token
          if(yes===null){

          
           axios.get(
            "https://api.themoviedb.org/3/authentication/token/new?api_key=582913cbc1255e68ef241e0956a7ae7c")
            .then((res)=>{
              const reqToken=res.data.request_token;
              window.location.href =`https://www.themoviedb.org/authenticate/${reqToken}?api_key=582913cbc1255e68ef241e0956a7ae7c&redirect_to=http://localhost:3000/`
              setYes(reqToken);
             
            })
            .catch((err)=>{
              console.log(err);
            })
          
          // Step 2: Create Session
       
          
          }
          console.log(yes);

            
          axios.post('https://api.themoviedb.org/3/authentication/session/new?api_key=582913cbc1255e68ef241e0956a7ae7c',{
            request_token:yes
          })
          .then((res)=>{
            const sessionId=res.data.session_id;
            console.log(sessionId,"session id");
            axios.get(`https://api.themoviedb.org/3/account?api_key=582913cbc1255e68ef241e0956a7ae7c&session_id=${sessionId} `)
            .then((res)=>{
              console.log(res.data);
            })
          })
          .catch((err)=>{
            console.log(err);
          })
      
         
          
        } catch (error) {
          // Handle errors
          console.error("Error creating session:", error.message);
        }
      };
        createSession();
      fetchMovies(page);
    }, [page]);
  
  return (
    <div className='back '>
      <h1 className="text-center heading">Popular Movies</h1>
          <div className="wrap">
            {movie.map((e) => (
              <Link key={e.id} to={`/movied/${e.id}`}><Card className="shadow" image={e.poster_path} key={e.id} title={e.original_title} /></Link>
            ))}
          </div>
          <div className="d-flex justify-content-between">
          <button
              onClick={prevPage}
              type="button"
              className="btn btn-primary m-3"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              type="button"
              className="btn btn-primary m-3"
            >
              Next
            </button>
          </div>
    </div>
  )
}

export default PopMovies

