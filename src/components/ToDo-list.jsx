import React from 'react';
import './Form.css'

const ToDoList = ({toDo,handleDelete,handleEdit,handleComplete}) => {
    if(toDo[0]){
        return (
            <div>
                <ul>
                    {
                        toDo.map((todo)=>(
                            <div key={todo.id} className='todo-list' style={todo.completed ? {textDecoration : 'line-through'} : {textDecoration:'none'}}  >
                                <li onClick={()=>handleComplete(todo)} >{todo.title}</li>
                                <div className='list-icons'>
                                <i style={{color:'#629e4d'}} className="fa fa-pencil" onClick={()=>handleEdit(todo)} aria-hidden="true"></i>
                                <i style={{color:'#f06565'}} className="fa fa-trash" onClick={()=>handleDelete(todo)} aria-hidden="true"></i>
                                </div>
                            </div>
                        ))
                    }
                </ul>
            </div>
        );
    }
    return <div className='message'> <h1>Add Some Todos..</h1> </div>
    }

export default ToDoList;
