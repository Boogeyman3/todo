
import React,{useState, useEffect} from 'react'
import logo from './logo.svg';
import Todo from './components/Todo';
import Form from './components/Form';
import Filter from './components/Filter';
import './index.css';



function App(props) {

  const [filter, setFilter] = useState("All");


  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  
  const FILTER_NAMES = Object.keys(FILTER_MAP);

   const [data, setData] = useState([]);
 const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/todos/?populate=*');
     
        const jsonData = await response.json();
        setData(jsonData);
    
    } catch (error) {
      
    }
     
  };
  useEffect(()=> {
    fetchData();
   }, [])
 
  
  function Filter(props) {
    return (
      <button
        type="button"
        className="btn toggle-btn"
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.name)}>
        <span className="visually-hidden">Show </span>
        <span>{props.name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    );
  }
  

  const [tasks, setTasks] = useState([]);
  const editTask= (id, newName) => {
    const url = `http://localhost:1337/api/todos/${id}`;
    const payload = {
      data: {
    
          text: newName,
          description: "mr k",
          completed:false
      }
    };
    
    fetch(url, {
      method: "put",
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
    fetchData()
    
  }
  
  
  function toggleTaskCompleted(id) {
    const updatedTasks = data?.data.map((task) => {
      if (id === task.id) {
            return { ...task, completed: !task.completed };
      }
      return task;
    });
    setData(updatedTasks);
  }

  // function deleteTask(id) {
  
  // }
  console.log(data.data)
  const  deleteTask = (id) => {
    const url = `http://localhost:1337/api/todos/${id}`;
    
    
    fetch(url, {
      method: "delete",
      headers: {
        'Content-Type': 'application/json'
      },
   
    })
      .then(response => response.json())
      .then(m => {
      setData(prevData => ({
  ...prevData,
  data: prevData?.data.filter(item => item.id !== id)
}))
      })
      .catch(error => {
        console.error("error", error);
      });
     
  }
  
  
  

  
    

const taskList =data?.data?.filter(FILTER_MAP[filter])
.map((task) => (
  <Todo
    id={task.id}
    name={task.attributes?.text}
    completed={task.attributes.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
));


 const filterList = FILTER_NAMES.map((name) => (
  <Filter
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));

  
  
  return (
    
    <div className="todoapp stack-large">
    <h1>TodoMatic</h1>
      <Form  fetch={fetchData}/>
      <div className="filters btn-group stack-exception">
    {filterList} ddx  
     </div>
    <h2 id="list-heading">3 tasks remaining</h2>
    
    {taskList}
    {/* <ul role="list
     className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading">

  
    </ul> */}
  </div>
  
  );
}

export default App;
