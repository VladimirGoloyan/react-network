import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

import { Button } from "@material-ui/core";
import "./Todo.scss";
import fbService from "../../api/fbService";

const Todo = ({ title, children, completed,remove,item}) => {
    const [complete,isComplete] = useState(completed) 

    const context = useContext(AppContext)

  const toggleComplete = () => {
    isComplete(!complete)
    console.log(item)
    item.completed = complete
    fbService.updateItem(item,'todos')
  };

  return (
    <div className='todo-container'>
      <div className='todo-container__title'>{title}</div>
      <div className='todo-container__buttons'>
      <Button disabled={!context.state.user} variant="contained" className={complete ? "todo-container__done" : "todo-container__not-done"} onClick={toggleComplete}>
        {complete ? "Completed":"Not Completed" }
      </Button>
      <Button onClick={()=>remove()}>Delete</Button>
      </div>
    </div>
  );
};

export default Todo;
