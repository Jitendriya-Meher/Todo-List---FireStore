import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const InputTodo = () => {

    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if( title.length === 0 ) {
            return;
        }

        try{
            const data = await addDoc( collection (db, "todos"),{
                title,
                completed:false
            });

            console.log(data);

            toast.success("Todo added successfully");
        }
        catch(err){
            console.log(err.message);

            toast.error(err.message);
        }

        setTitle("");
    }

  return (
    
    <form onSubmit={handleSubmit} className=' space-x-3 mt-12 mx-20 flex justify-between gap-10'>

        <input type="text"
        placeholder='Enter Todo...'
        onChange={(e) => {
            setTitle(e.target.value);
        }} 
        value={title}
        className=' bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out w-full'
        />

        <button type='submit'
        className=' text-white bg-indigo-500 border-0 py-2 w-[20%] rounded-md hover:bg-indigo-600 active:bg-indigo-700 active:scale-95'
        >Add Todo</button>

    </form>
  )
}

export default InputTodo
