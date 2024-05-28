import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditTodo() {
    let navigate = useNavigate();
    const { id } = useParams(); // Get the id from URL params
    
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: '',
        createdAt: ''
    });

    const { title, description, completed, createdAt } = todo;

    const onInputChange = (e) => {
        e.preventDefault();
        setTodo({ ...todo, [e.target.name]: e.target.value });
    };

    const loadTodo = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/getbyid/${id}`);
            setTodo(result.data); 
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/updateTodo/${id}`, todo);
        navigate("/");
    };

    const clearForm = () => {
        setTodo({
            title: "",
            description: "",
            completed: "",
            createdAt: ""
        });
    };

    useEffect(() => {
        loadTodo();
    }, [id]); // Call loadTodo whenever id changes

    return (
        <div className='container'>
            <div className='row'>
                <div className='col md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Todo Details</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3 text-start'>
                            <label htmlFor='title' className='form-label'>
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
                        {/* <div className='mb-3 text-start'>
                            <label htmlFor='createdAt' className='form-label'>
                                Date :
                            </label>
                            <input
                                type={'date'}
                                className='form-control'
                                name='createdAt'
                                value={createdAt}
                                onChange={(e) => onInputChange(e)}
                            ></input>
                        </div> */}
                        <div className='d-flex justify-content-center'>
                            <button type='submit' className='btn btn-outline-primary'>
                                Submit
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
