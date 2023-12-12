import { useEffect, useState } from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import toast from "react-hot-toast";

function App() {

  const [todos, setTodos] = useState([]);

  useEffect( () => {

    const q = query( collection(db,"todos"));
    // console.log("query",q);

    const unsub = onSnapshot( q, (querySnapshot) => {

      let todoArray = [];
      // console.log("querySnapshot",querySnapshot);
      querySnapshot.forEach( (doc) => {
        todoArray.push({
          ...doc.data(), id:doc.id
        })
      });
      setTodos(todoArray);
      console.log(todos);
    });

    return () => unsub();
  },[]);

  // console.log("todos",todos);

  const toggleComplete = async (todo) => {
    await updateDoc( doc(db, "todos", todo.id),{
      completed: !todo.completed
    });

    toast.success("todo updated successfully");
  }

  const handleEdit = async( todo, title) => {
    await updateDoc( doc(db, "todos", todo.id),{
      title:title
    });

    toast.success("Todo Edited successfully");
  }

  const handleDelete = async( id) => {
    await deleteDoc( doc(db, "todos", id)); 

    toast.error("Todo Deleted successfully");
  }

  return (
    <div className="">
      
      <div className="">

        <div className=" text-white text-4xl text-center mt-10">
            Todo List - FireStore
        </div>

        <InputTodo></InputTodo>
        
        <div className=' mb-7 mt-16'>

        {
          todos.length === 0 ? (
            <div className="mt-10 text-center text-2xl text-white">
              You have Completed your all Todos
           </div>
          ) :(
        
          
            todos.map( (todo) => (
              <TodoList key={todo.id} todo={todo} toggleComplete={toggleComplete} handleDelete={handleDelete} handleEdit={handleEdit}></TodoList>
            ))
          
          )
        }
        </div>

      </div>

    </div>
  );
}

export default App;
