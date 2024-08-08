import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TiltleCards = ({title,category}) => {

  const [apiData,setApiData]=useState([]);
  const cardsRef=useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODIxNGYyNmMzOWYwOWQ4ZGQxNmM5YTdkNDJhMDFmZSIsIm5iZiI6MTcyMzExNjMxMS41OTM2NzUsInN1YiI6IjY2YjRhOTlkOTQ4Yzc0MTVlY2E5MTkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aeM59OBQuszcOEQDKqScKOR73aAesPq2uUHbyex6i4w'
    }
  };
  

  const handelWheel = (event)=>{
  event.perventDefaults();
  cardsRef.current.scrollLeft += event.deltaYl;
} 

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handelWheel);
},[])

  return (
    <div className='titlecards'>
      <h2>{title ?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index} >
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TiltleCards