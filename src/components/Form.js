

import React,{useState, useEffect}  from 'react'
import Todo from './Todo'


function Form(props) { 
    

 
    const [name, setName] = useState ("");

    function handlechange(e){
    setName(e.target.value)
    }
    const handleTodo = (name) => {
      const url = "http://localhost:1337/api/todos";
      const payload = {
        data: {
      
            text: name,
            description: "mr k",
            completed:false
        }
      };
      
      fetch(url, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error("error", error);
        });
        props.fetch()
        setName("")
    }
    
 
      
     return (

    
    <div>  
       
    <h2 className="label-wrapper">
      <label htmlFor="new-todo-input" className="label__lg">
        What needs to be done?
      </label>
    </h2>
    <input
      type="text"
      id="new-todo-input"
      className="input input__lg"
      name="text"
      autoComplete="off"
      onChange={handlechange}
      value={name}
    />
    <button className="btn btn__primary btn__lg" onClick={() => handleTodo(name)}>
      Add
    </button>
  </div>
  )
}

export default Form