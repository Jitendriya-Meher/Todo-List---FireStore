import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {AiFillDelete} from "react-icons/ai";
import {BiEditAlt} from "react-icons/bi";
import {GrCompliance} from "react-icons/gr";

const TodoList = ({todo, handleDelete,handleEdit, toggleComplete}) => {

    const [newTitle, setNewTitle] = useState(todo.title);

    const handleChange = (e) => {

        e.preventDefault();
        if( todo.completed === true){
            return;
            toast.error("Todo can't be Edited");
        }
        else{
            setNewTitle(e.target.value);
        }
    }


  return (
    <div className=' mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded mx-20'>
      
      <input type="text"  
        onChange={handleChange}
        value={newTitle}
        style={{textDecoration: todo.completed && "line-through"}}
        className=" text-white w-[83%] overflow-auto bg-transparent border-0 outline-0 text-lg"
      />

      <div className=" flex justify-between gap-5">
        <button
        onClick={() => {
            toggleComplete(todo);
        }}
        className=" text-white bg-green-500 border-0 py-2 px-3 text-lg focus:outline-none hover:bg-green-600 rounded text-md transition-all duration-200 ">
            <GrCompliance></GrCompliance>
        </button>

        <button  onClick={() => {
            handleEdit(todo, newTitle);
        }}
        className=" text-white bg-yellow-500 border-0 py-2 px-3 text-lg focus:outline-none hover:bg-yellow-600 rounded text-md transition-all duration-200">
            <BiEditAlt></BiEditAlt>
        </button>

        <button  onClick={() => {
            handleDelete(todo.id);
        }}
        className=" text-white bg-red-500 border-0 py-2 px-3 text-lg focus:outline-none hover:bg-red-600 rounded text-md transition-all duration-200">
            <AiFillDelete></AiFillDelete>
        </button>
      </div>

    </div>
  )
}

export default TodoList
