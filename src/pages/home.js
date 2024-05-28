import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi"; // Import the up arrow icon
import bin from '../Assets/bin.png'; // Import the PNG image for the button
import edit from '../Assets/edit.png'
import { Link, useParams } from 'react-router-dom';
import './home.css'
import Navbar from '../layout/Navbar';

export default function Home() {
    <Navbar />
    const [todos, setTodos] = useState([]);
    const [expandedTodo, setExpandedTodo] = useState(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const result = await axios.get('http://localhost:8080/getAllTodos');
            setTodos(result.data); // Update state with fetched data
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/deleteTodo/${id}`);
            loadTodos(); // Refresh todos after deletion
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const toggleDescription = (id) => {
        setExpandedTodo(expandedTodo === id ? null : id);
    };

    return (
        <div className='container'>
            <div className='py-4'>
            <br/>
                <div>
                <h1>Todo List</h1>
                </div>
                <br />
                <div>
                <Link className='btn addbtn' to="/addtodo">Add Todo</Link>
               </div>
                <br />
                <br/>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col" className='Display'>#</th>
                            <th scope="col">Title</th>
                            <th scope="col" className='Display'>Status</th>
                            <th scope="col" className='Displayt'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.length > 0 ? (
                            todos.map((todo, index) => (
                                <React.Fragment key={todo.id}>
                                    <tr>
                                        <th scope="row" className='Display'>{index + 1} </th>
                                        <td>{todo.title}</td>
                                        <td className='Display'>{todo.completed ? "Completed" : "Not Completed"} </td>
                                        <td>
                                         <div className='actions'>
                                        <button className='btn mx-2' onClick={() => deleteUser(todo.id)}>
                                        <img src={bin} alt="Bin" style={{ width: '20px', height: '20px' }} />
                                        </button>

                                        <Link className='btn mx-2'  to={`/editTodo/${todo.id}`}>
                                       <img src={edit} alt="Edit" style={{ width: '20px', height: '20px' }} />
                                       </Link>

                                            
                                            <button className='btn  mx-2' onClick={() => toggleDescription(todo.id)}>
                                                {expandedTodo === todo.id ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
                                                </button>
                                                </div>
                                        </td>
                                    </tr>
                                    {expandedTodo === todo.id && (
                                        <tr>
                                        <td colSpan="4">
                                            <div className="p-3 todo-details">
                                                 {todo.description}
                                             <br/>
                                              {todo.createdAt}
                                            </div>
                                         </td>

                                            
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No todos available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
