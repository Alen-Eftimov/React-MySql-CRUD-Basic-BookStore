import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        image_cover: "",
    })
    
    const navigate = useNavigate()

    const handleChange = (e) => {
      setBook(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    // I variant with axios:
    const handleClick = async (e) => {
      e.preventDefault()
      try {
        await axios.post("http://192.168.1.126:8800/books", book)
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    }

    // II variant with fetch (works also):
    // const handleClick = async (e) => {
    //   e.preventDefault()
    //   try {
    //     await fetch("http://localhost:8800/books", {method: 'POST',
    //     body: JSON.stringify(book),
    //     headers: new Headers({
    //       'Content-Type': 'application/json; charset=UTF-8'
    //     })})
    //     navigate("/")
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    console.log(book);
  return (
    <div className='form'>
        <h1>Add New Book</h1>
        <input type="text" placeholder='title'  onChange={handleChange} name='title' />
        <input type="text" placeholder='description' onChange={handleChange} name='description' />
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>
        <input type="text" placeholder='image_cover' onChange={handleChange} name='image_cover'/>
        <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add