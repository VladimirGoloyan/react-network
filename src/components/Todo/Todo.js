import React, { useState } from "react";
import { connect } from "react-redux";
import { updateReduxTodo } from "../../actions/todoActions";
import fbService from "../../api/fbService";
import PropTypes from "prop-types";

import { Button } from "@material-ui/core";

import "./Todo.scss";

const Todo = ({ title, children, completed, remove, item, update }) => {
  const [complete, isComplete] = useState(completed);

  const toggleComplete = () => {
    isComplete(!complete);
    const newItem = { ...item, completed: !complete };
    console.log(newItem);
    fbService.updateItem(newItem, "todos");
  };

  return (
    <div className="todo-container">
      <div className="todo-container__title">{title}</div>
      <div className="todo-container__buttons">
        <Button
          variant="contained"
          className={
            complete ? "todo-container__done" : "todo-container__not-done"
          }
          onClick={toggleComplete}
        >
          {complete ? "Completed" : "Not Completed"}
        </Button>
        <Button onClick={update} className="todo-container__button">
          Edit
        </Button>
        <Button onClick={remove} className="todo-container__button">
          Delete
        </Button>
      </div>
    </div>
  );
};

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = {
  updateReduxTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
