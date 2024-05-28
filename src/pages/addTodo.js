import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EditTodo() {

    let navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: '',
    description: '',
      completed: '',
      createdAt:''
    
  });

  const { title, description, completed, createdAt } = todo;

    const onInputChange = (e) => {
        e.preventDefault();
    setTodo({ ...todo, [e.target.name]: e.target.value });
    };
    

    const clearForm = () => {
        setTodo({
            title: "",
            description: "",
            completed: "",
            createdAt:""
        });
    };
    

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/addTodo", todo)
        navigate("/")
    }


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Add Todo</h2>
                  <br></br>
                  
                  <form onSubmit={(e)=>onSubmit(e)}>
          <div className='mb-3 text-start'>
            <label htmlFor='Name' className='form-label'>
              Todo :
            </label>
            <input
              type={'text'}
              className='form-control'
              placeholder='Enter Todo'
              name='title'
              value={title}
              onChange={(e) => onInputChange(e)}
            ></input>
          </div>
          <br></br>
          <div className='mb-3 text-start'>
            <label htmlFor='description' className='form-label'>
              Details :
            </label>
            <input
              type={'text'}
              className='form-control'
              placeholder='Enter todo details'
              name='description'
              value={description}
              onChange={(e) => onInputChange(e)}
            ></input>
          </div>
          <br></br>
          
                      
                      <br></br>
            <div className='d-flex justify-content-center'>
              <button type='submit' className='btn btn-outline-primary '>
                Add Todo
              </button>
              <Link className='btn btn-outline-danger mx-2' to="/" onClick={clearForm}>
                Cancel
               </Link>
                             
               </div>
                       
          </form>
        </div>
      </div>
    </div>
  );
}
