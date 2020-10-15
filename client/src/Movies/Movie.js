import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams, NavLink } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, deleteFromMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {

    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => { 
        setMovie(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err.response));

  },[params.id])


  const deleteMovie = (id) => {

    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res)
        setMovie(null)
        deleteFromMovieList(movie)
        history.push('/')
      })

  }


  const saveMovie = () => {
    addToSavedList(movie);
  };

  console.log(movie)
  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
        <NavLink className='edit-button' to={`/update-movie/${params.id}`}>Edit</NavLink>
        <div className='delete-button' onClick={()=> deleteMovie(params.id)}>
          Delete
        </div>
    </div>
  );
}

export default Movie;
