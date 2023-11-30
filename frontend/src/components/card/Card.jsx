import React, { useContext, useEffect, useState } from 'react';
import './Card.css';
import axios from 'axios';
import { LoginContext } from '../context/LoginContext';
import { useLocation } from 'react-router-dom';
import { useWatchContext } from '../hooks/useWatchContext';



const Card = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const {token}=useContext(LoginContext)
  const location = useLocation();
  const img = `https://image.tmdb.org/t/p/w200/${props.image}`;
  const key = props.id;
  const {dispatch}=useWatchContext();
 
  
  const removeW = (e) => {
    e.preventDefault();
    console.log("Removing movie with key:", key);
    axios.delete(`http://localhost:1234/user/${token.email}/${key}`)
      .then((res) => {
        console.log("Deleted successfully", res.data.valueD);
        dispatch({ type: 'REMOVIE_WATCH', payload: res.data.valueD });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  


  return (
    <div className="">

    <div
      className={`container mt-2 ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <img className='moviet' src={img} alt="" />
      <p className={`title ${isHovered ? 'visible' : ''}`}>{props.title}</p>
      </div>
      {location.pathname === '/watchlist' && (
        <form onSubmit={removeW}>

        <button  >remove from watchlist</button>
        </form>
        )}
        
        </div>
  );
};

export default Card;
