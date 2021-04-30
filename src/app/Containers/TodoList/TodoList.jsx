import React from "react";
import { connect } from "react-redux";
import TodoItem from "../../Components/TodoItem/TodoItem";
import { actions } from "./todoSlice";
/**
 * todo implement component called ToDoInput
 * which should receive onSubmit function which will be called on the press enter key
 * should receive placeholder value which should show as placeholder for the input
 * this input changes should be managed by local state inside ToDoInput component
 * Use this component for enter tasks name
 */
//import ToDoInput from "../../Components/TodoInput/ToDoInput";
// import { bindActionCreators } from "../../utils/store";

import "./TodoList.scss";
import RadioBadge from "../../Components/RadioBadge/RaidoBadge";

/**
 * todo use this list of the control badges to show them at the control panel
 */

import { controlBadges } from "../../constants/todo";
import { FormControl, InputGroup } from "react-bootstrap";

/**
 * todo implement HOC for display the list of the todos and control panel and input for add new todos
 */
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "", //todo setup local state
    };
  }

  componentDidMount() {
    this.props.dispatch(
      this.props.actions.get(JSON.parse(localStorage.getItem("tasks")))
    );
  }

  handleInput = (e) => {
    this.setState({ inputValue: e.target.value });
  };
  addTask = (e) => {
    if (e.charCode === 13) {
      this.props.dispatch(this.props.actions.add(this.state.inputValue));
      this.props.dispatch(this.props.actions.renderTasks("All"));
      this.setState({ inputValue: "" });
    }
  };
  deleteTasks = (taskId) => {
    this.props.dispatch(this.props.actions.remove(taskId));
    this.props.dispatch(this.props.actions.renderTasks("All"));
  };
  toggleChecked = (taskId) => {
    this.props.dispatch(this.props.actions.markAsChecked(taskId));
    this.props.dispatch(this.props.actions.renderTasks("All"));
  };
  clearCompleted = () => {
    this.props.dispatch(this.props.actions.clearCompleted());
    this.props.dispatch(this.props.actions.renderTasks("All"));
  };
  checkAll = () => {
    this.props.dispatch(this.props.actions.checkAll());
    this.props.dispatch(this.props.actions.renderTasks("All"));
  };
  sortTasks = (indexBadge) => {
    this.props.dispatch(this.props.actions.renderTasks(indexBadge));
  };

  render() {
    return (
      <div className='container'>
        <InputGroup className='enter_task'>
          <FormControl
            className='enterTask'
            value={this.state.inputValue}
            placeholder='Enter your task here'
            onKeyPress={this.addTask}
            onChange={this.handleInput}
          />
        </InputGroup>
        {this.props.renderTasks.map((el) => {
          return (
            <TodoItem
              key={el.id}
              id={el.id}
              textTask={el.text}
              checked={el.checked}
              toggleChecked={this.toggleChecked}
              deleteTasks={this.deleteTasks}
            />
          );
        })}
        {this.props.tasks.length !== 0 ? (
          <RadioBadge
            count={this.props.tasks.length - this.props.completed.length}
            clearCompleted={this.clearCompleted}
            checkAll={this.checkAll}
            controlBadges={controlBadges}
            sortTasks={this.sortTasks}
            completedLength={this.props.completed.length}
          />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  renderTasks: state.todo.renderTasks,
  tasks: state.todo.tasks,
  completed: state.todo.completed,
}); //todo setup this method for get info from the global state

const mapDispatchToProps = (dispatch) => ({ actions, dispatch }); //todo implement this function

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
