import React, { useState } from "react";

import { Button } from "@material-ui/core";
import "./Todo.scss";
import fbService from "../../api/fbService";

const Todo = ({ title, children, completed,remove,item}) => {
    const [complete,isComplete] = useState(completed) 

  

  const toggleComplete = () => {
    isComplete(!complete)
    const newItem = {...item,  completed:!complete}
    console.log(newItem)
    fbService.updateItem(newItem,'todos')
  };

  return (
    <div className='todo-container'>
      <div className='todo-container__title'>{title}</div>
      <div className='todo-container__buttons'>
      <Button  variant="contained" className={complete ? "todo-container__done" : "todo-container__not-done"} onClick={toggleComplete}>
        {complete ? "Completed":"Not Completed" }
      </Button>
      <Button onClick={remove} className="todo-container__remove">Delete</Button>
      </div>
    </div>
  );
};

export default Todo;
