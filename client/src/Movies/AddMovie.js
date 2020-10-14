import React, { useState } from 'react'
import axios from 'axios'
import './AddMovie.css'
import { useHistory } from 'react-router-dom'

function AddMovie() {

   const history = useHistory();

   const [value, setValue] = useState({
      id: Date.now(),
      title: '',
      director: '',
      metascore: '',
      stars: [],
   })


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
         .post(`http://localhost:5000/api/movies`, value)
         .then(res => {
            console.log(res)

            setValue({
               id: Date.now(),
               title: '',
               director: '',
               metascore: '',
               stars: [],
            })
            history.push('/')
         })
   }

   return (
      <div className='add___movie'>
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
         <button type='submit'>Add</button>
      </form>
   </div>
   )
}

export default AddMovie
