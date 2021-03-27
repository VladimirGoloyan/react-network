import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { AppContext } from "../../context/AppContext";
import fbService from "../../api/fbService";
import {
  setReduxTodos,
  updateReduxTodo,
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
    isEditModalOpen: false,
    modalMode: true,
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
    props.createReduxTodo(newTodo);
    toggleModal();
  };

  useEffect(() => {
    if (!props.todos) {
      props.setReduxTodos(0, limit);
    }
  }, []);

  const getMore = async () => {
    const newStart = start + limit + 1;
    setState({ ...state, start: newStart });
    props.getMoreReduxTodos(start, limit);
  };

  const deleteTodo = async (id) => {
    props.deleteReduxTodo(id, start);
  };

  const updateTodo = async (newTodo) => {
    props.updateReduxTodo(newTodo);
  };

  const changeValue = (e) => {
    if (e.target.name === "titleValue")
      setState({ ...state, titleValue: e.target.value });
    else if (e.target.name === "completeValue")
      setState({ ...state, completeValue: e.target.value });
  };

  return (
    <>
      <ItemModal
        action={state.modalMode ? createTodo : updateTodo}
        checkBox={true}
        completeValue={completeValue}
        titleValue={titleValue}
        changeValue={changeValue}
        isOpen={isModal}
        onClose={toggleModal}
        buttonTitle={state.modalMode? "Create" : "Save"}
      />
      {context.state.user ? (
        <div className="app-todos">
          <Button
            className="app-todos__button"
            onClick={() => {
              setState({
                ...state,
                modalMode: true,
              });
              toggleModal();
            }}
          >
            Create ToDo
          </Button>
          {/* Reset tool button 
          
          <Button className="app-todos__button" onClick={() => pushTodos()}>
            Reset original todos
          </Button> */}
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
                      update={() => {
                        setState({
                          ...state,
                          modalMode: false,
                        });
                        toggleModal();
                        updateTodo({
                          ...el,
                          title: state.titleValue,
                          completed: state.completeValue,
                        });
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <Loader />
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
          <SignInToExplore />
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
  updateReduxTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
