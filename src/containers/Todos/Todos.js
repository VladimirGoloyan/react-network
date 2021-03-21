import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { AppContext } from "../../context/AppContext";
import fbService from "../../api/fbService";
import {
  setReduxTodos,
  getMoreReduxTodos,
  createReduxTodo,
  deleteReduxTodo,
} from "../../actions/todoActions";

import Todo from "../../components/Todo/Todo";
import { Button } from "@material-ui/core";
import ItemModal from "../../components/ItemModal/ItemModal";
import Loader from "../../components/Loader/Loader";
import SignInToExplore from "../../components/SIgnInToExplore/SignInToExplore";

import "./Todos.scss";

const Todos = (props) => {
  const limit = 3;

  const [state, setState] = useState({
    todos: [],
    start: 4,
    hasMore: true,
    isModal: false,
    titleValue: "",
    completeValue: false,
  });

  const { start, hasMore, isModal, titleValue, completeValue } = state;

  const context = useContext(AppContext);

  const pushTodos = () => {
    fbService.pushTodos();
  };

  const toggleModal = () => {
    setState({ ...state, isModal: !isModal });
  };

  const createTodo = () => {
    const newTodo = {
      title: titleValue,
      completed: completeValue,
      userId: 1,
    };
    fbService.createItem(newTodo, "todos").then((data) => {
      console.log("fbService create item :", data);
      props.createReduxTodo(data);
      toggleModal();
    });
  };

  useEffect(() => {
    if (!props.todos) {
      fbService
        .getItems(0, limit, "todos")
        .then((data) => {
          props.setReduxTodos(data);
          console.log(props);
        })
        .catch((err) => {
          console.log("Caught an error : ", err);
        });
    }
  }, []);

  const getMore = async () => {
    const newStart = start + limit + 1;
    setState({ ...state, start: newStart });
    console.log("state : ", state);
    const res = await fbService.getItems(start, start + limit, "todos");
    props.getMoreReduxTodos(res);
    res.length < limit
      ? setState({ ...state, hasMore: false })
      : setState({ ...state, hasMore: true });
  };

  const deleteTodo = async (id) => {
    await fbService.deleteItem(id, "todos");
    props.deleteReduxTodo(id);
    fbService
      .getItems(0, start - 1, "todos")
      .then((data) => {
        props.setReduxTodos(data);
      })
      .catch((err) => {
        console.log("Caught an error : ", err);
      });
  };

  const updateTodo = async (id) => {
    await fbService.updateItem(id, "todos");
  };

  const changeValue = (e) => {
    if (e.target.name == "titleValue")
      setState({ ...state, titleValue: e.target.value });
    else if (e.target.name == "completeValue")
      setState({ ...state, completeValue: e.target.value });
  };

  return (
    <>
      <ItemModal
        action={createTodo}
        checkBox={true}
        completeValue={completeValue}
        titleValue={titleValue}
        changeValue={changeValue}
        isOpen={isModal}
        onClose={toggleModal}
        buttonTitle="Create"
      />
      {context.state.user ? (
        <div className="app-todos">
          <Button className="app-todos__button" onClick={() => toggleModal()}>
            Create ToDo
          </Button>
          <Button className="app-todos__button" onClick={() => pushTodos()}>
            Reset original todos
          </Button>
          <div className="app-todos__container">
            {props.todos ? (
              props.todos.map((el, idx) => {
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
              })
            ) : (
              <Loader/>
            )}
          </div>
          {hasMore && (
            <div className="app-todos__get-more">
              <Button className="app-todos__button" onClick={getMore}>
                Get More Todos
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="app-todos__no-user">
          <SignInToExplore/>
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
  setReduxTodos,
  getMoreReduxTodos,
  createReduxTodo,
  deleteReduxTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
