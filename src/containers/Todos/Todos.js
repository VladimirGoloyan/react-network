import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { AppContext } from "../../context/AppContext";
import fbService from "../../api/fbService";
import { actionTypesRedux } from "../../reducers/actionTypesRedux";

import Todo from "../../components/Todo/Todo";
import { Button } from "@material-ui/core";
import ItemModal from "../../components/ItemModal/ItemModal";

import "./Todos.scss";

const Todos = (props) => {
  const limit = 3;
  const [todos, setTodos] = useState([]);
  const [start, setStart] = useState(4);
  const [hasMore, setHasMore] = useState(true);
  const [isModal, setIsModal] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [completeValue, setCompleteValue] = useState(false)

  const context = useContext(AppContext);

  const pushTodos = () => {
    fbService.pushTodos();
  };

  const toggleModal = () =>{
      setIsModal(!isModal);
  }

  const createTodo = () => {
    const newTodo = {
      title: titleValue,
      completed: completeValue,
      userId: 1,
    };
    fbService.createItem(newTodo, "todos").then((data) => {
      console.log('fbService create item :',data)
      props.createReduxTodo({
        type: actionTypesRedux.CREATE_POST,
        payload: { todos: data },
      });
      console.log('props :' ,props)
      toggleModal();
    });
  };

  useEffect(() => {
    console.log("props useEffect",props)
    if (!props.todos) {
      fbService
        .getItems(0, limit, "todos")
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
    console.log('start : ', start )
    console.log('limit : ', limit )
    console.log('newstart : ', newStart )
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
    fbService
        .getItems(0, start - 1 , "todos")
        .then((data) => {
          setTodos(data);
          props.setReduxTodos(data);
        })
        .catch((err) => {
          console.log("Caught an error : ", err);
        });
  };

  const changeValue = (e) =>{
      if(e.target.name == 'titleValue')
        setTitleValue(e.target.value)
      else if(e.target.name == "completeValue")
        setCompleteValue(e.target.value)
    }

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
          <Button
            className="app-todos__button"
            onClick={() => toggleModal()}
          >
            Create ToDo
          </Button>
          <Button className="app-todos__button" onClick={() => pushTodos()}>
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
                Get More Todos
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="app-todos__no-user">
          <span className="app-todos__no-user__text">
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
  createReduxTodo: (todo) => ({
    type: actionTypesRedux.CREATE_TODO,
    payload: {
      todo,
    },
  }),
  deleteReduxTodo: (todo) => ({
    type: actionTypesRedux.DELETE_TODO,
    payload: {
      todo,
    },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
