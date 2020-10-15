import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import './UpdateMovie.css'

function UpdateMovie({movieList, setMovieList}) {

   const { id } = useParams();
   const{ push } = useHistory();

   const [value, setValue] = useState({
      title: '',
      director: '',
      metascore: '',
      stars: [],
   })

   useEffect(() => {
      axios
         .get(`http://localhost:5000/api/movies/${id}`)
         .then(res => {
            res.data.stars = res.data.stars.join(',')
            setValue(res.data)
         })
   },[])

   console.log(value)

   const handleChange = (e) => {

      setValue({
         ...value,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      value.stars = value.stars.split(',')

      axios
         .put(`http://localhost:5000/api/movies/${id}`, value)
         .then(res => {
            const newMovieList = movieList.map(item=>{
               if(item.id === value.id){
                   return res.data
               } else {
                   return item
               }
            })
            setMovieList(newMovieList)
            push(`/`)
         })
   }
   return (
      <div className='update___movie'>
         <form onSubmit={handleSubmit}>
            <label htmlFor='title'>
               <p>title</p>
               <input name='title' value={value.title} onChange={handleChange} />
            </label>
            <label htmlFor='director'>
               <p>director</p>
               <input name='director' value={value.director} onChange={handleChange} />
            </label>
            <label htmlFor='metascore'>
               <p>metascore</p>
               <input name='metascore' value={value.metascore} onChange={handleChange} />
            </label>
            <label htmlFor='stars'>
               <p>stars</p>
               <input name='stars' value={value.stars} onChange={handleChange} />
            </label>
            <button type='submit'>Update</button>
         </form>
      </div>
   )
}

export default UpdateMovie
