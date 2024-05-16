import React, {useState, useEffect} from 'react'
import { NavLink ,useParams } from 'react-router-dom';
import {API_URL} from './context';
const Singlemovie = () => {
    const { id } = useParams();

    const[isLoading , setIsLoading] = useState(true);
    const [movie, setMovie]= useState("");
     
     
     const getMovies= async(url)=>{
        setIsLoading(true);
     try{
       const res= await fetch(url);
       const data= await res.json();
       console.log(data);
       if(data.Response==="True"){
           setIsLoading(false);
           
           setMovie(data);
       }
       
     }catch(error){
       console.log(error);
     }
     };

   useEffect(()=>{
     let timerOut=  setTimeout(()=>{
           getMovies(`${API_URL}&i=${id}`);
       }, 500);
      return () => clearTimeout(timerOut);
   },[id]);

   if(isLoading){
    return (
        <div className='movie-section'>
             <div className='loading'>
                 Loading....
             </div>
        </div>
    );
   }

  return (
    
      <section className='movie-section'>
         <div className='movie-card'>
            <figure>
                <img src={movie.Poster} alt="" />
            </figure>
            <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">Release Date : {movie.Released}</p>
          <p className="card-text">Genre : {movie.Genre}</p>
          <p className="card-text">IMDb Rating : {movie.imdbRating} / 10</p>
          <p className="card-text">Country : {movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>

         </div>
      </section>

    
  )
}

export default Singlemovie
