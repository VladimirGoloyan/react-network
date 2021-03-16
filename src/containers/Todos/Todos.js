import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { AppContext } from "../../context/AppContext";
import fbService from "../../api/fbService";
import { actionTypesRedux } from "../../reducers/actionTypesRedux";

import Todo from "../../components/Todo/Todo";
import { Button } from "@material-ui/core";

import "./Todos.scss";

const Todos = (props) => {
  const limit = 3;
  const [todos, setTodos] = useState([]);
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const context = useContext(AppContext);

  const pushTodos = () => {
    fbService.pushTodos();
  };

  useEffect(() => {
    if (!props.posts) {
      fbService
        .getItems(start, limit, "todos")
        .then((data) => {
          setTodos(data);
          props.setReduxTodos(data);
          console.log(props)
        })
        .catch((err) => {
          console.log("Caught an error : ", err);
        });
    }
  }, []);

  const getMore = async () => {
    const newStart = start + limit + 1;
    setStart(newStart);
    const res = await fbService.getItems(start, start + limit, "todos");
    setTodos(todos.concat(res));
    props.getMoreReduxTodos(res);
    console.log('props after getMore: ',props)
    res.length < limit ? setHasMore(false) : setHasMore(true);
  };

  const deleteTodo = async (id) => {
    await fbService.deleteItem(id, "todos");
    setTodos(
      todos.filter((el) => {
        return el.id != id;
      })
    );
  };

  return (
    <>
      {context.state.user ? (
        <div className="app-todos">
          <Button className="app-todos__reset" onClick={() => pushTodos()}>
            Reset original todos
          </Button>
          <div className="app-todos__container">
            { todos.map((el, idx) => {
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
              <Button className="app-todos__get-more__button" onClick={getMore}>
                Get More Posts
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="app-todos__no-user">
          <span className="app-todos__no-user__text">
            {" "}
            Sign in to explore to do lists
          </span>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = {
  setReduxTodos: (todos) => ({
    type: actionTypesRedux.SET_TODOS,
    payload: {
      todos,
    },
  }),
  getMoreReduxTodos: (todos) => ({
    type: actionTypesRedux.GET_MORE_TODOS,
    payload: {
      todos,
    },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
