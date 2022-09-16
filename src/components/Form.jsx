import React,{useState,useEffect} from 'react'
import {v4} from 'uuid'
import ToDoList from './ToDo-list'
import './Form.css'

function Form() {
const initialState = JSON.parse(localStorage.getItem('todos')) || [] ;
const [input,setInput] = useState('')
const [toDo,setToDo] = useState(initialState)
const [editTodo,setEditTodo] = useState(null)
const handleChange = (event) =>{
    setInput(event.target.value)
}
const addTodo = () => {
    if(!editTodo && input !== ''){
        setToDo([...toDo , {id : v4() , title : input , completed : false}].reverse())
        setInput('')
    }else{
        updateTodo(input,editTodo.id,editTodo.completed)
    }
}
const updateTodo = (title,id,completed)=>{
    const newTodo = toDo.map((todo)=>
        todo.id === id ? {title,id,completed} : todo
        )
        setToDo(newTodo)
        setEditTodo('')
}
const handleDelete = ({id})=>{
    console.log(id);
    setToDo(toDo.filter((todo)=> todo.id !== id))
}
const handleEdit = ({id,title})=>{
    setInput(title)
    setEditTodo(toDo.find((todo)=> todo.id === id))
}
const handleComplete = (todo)=>{
    setToDo(
        toDo.map((item)=>{
            if(item.id === todo.id){
                return {...item,completed : !item.completed}
            }
            return item
        })
    )
}
useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(toDo))
},[toDo])

  return (
    <>
    <div className='form-container' >
        {
            toDo[0] ? <p onClick={()=>setToDo([])} className='clear' >Clear all</p> : null
        }
        
        <h1>My To-Do's</h1>
        <form>
            <input placeholder='Type Here...' className='input' value={input} onChange={handleChange} type="text"
             />
            <button className='add-btn' onClick={addTodo} type='button'>{editTodo ? 'Edit' : 'Add'}</button>
        </form>
    </div>
        <ToDoList toDo={toDo} handleDelete={handleDelete} handleEdit={handleEdit} handleComplete={handleComplete} />
    </>
  )
}

export default Form