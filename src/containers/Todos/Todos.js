import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import fbService from "../../api/fbService";
import Todo from "../../components/Todo/Todo";
import todosMockup from "../../data-mockup/todos-mockup";

import "./Todos.scss";

const Todos = () => {
  const limit = 3;
  const [todos, setTodos] = useState([]);
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const pushTodos = () => {
    fbService.pushTodos();
  };

  useEffect(() => {
    fbService
      .getItems(start, limit, "todos")
      .then((data) => {
        setTodos(data);
        
      })
      .catch((err) => {
        console.log("Caught an error : ", err);
      });
  }, []);

  const getMore = async() => {
    const newStart = start + limit + 1;
    setStart(newStart)
    const res = await fbService.getItems(start, start + limit, 'todos')
    setTodos(todos.concat(res))
    console.log(res.length)
    res.length < limit ? setHasMore(false) : setHasMore(true)
  }

  const deleteTodo = async (id) => {
    await fbService.deleteItem(id,'todos')
        setTodos(
       todos.filter((el) => {
          return el.id != id;
        }),
        )
  }

  return (
    <div className="app-todos">
      Todos
      <Button onClick={() => pushTodos()}>Reset original todos</Button>
      <div className="app-todos__container">
        {console.log(todos)}
        {todos.map((el, idx) => {
          return (
            <div key={idx} className="app-todos__container__item">
              <Todo
                key={el.id}
                item={el}
                title={el.title}
                completed={el.completed}
                remove={() => deleteTodo(el.id)}
              />
              {"--" + el.id + "--"}
            </div>
          );
        })}
      </div>
      {hasMore && (
              <div className="app-todos__get-more">
                <Button onClick={getMore}>Get More Posts</Button>
              </div>
            )}
    </div>
  );
};

export default Todos;
