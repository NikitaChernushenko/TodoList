import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: Date.now(),
  tasks: [],
  completed: [],
  renderTasks: [],
  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    get: (state, { payload }) => {
      if (payload) {
        state.tasks = payload;
        state.renderTasks = payload;
      }
    },
    add: (state, { payload }) => {
      if (payload) {
        state.tasks.push({
          id: state.id++,
          text: payload,
          checked: false,
        });
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }

      // todo implement function for add new todo into list
    },
    remove: (state, { payload }) => {
      state.tasks = state.tasks.filter((el) => el.id !== payload);
      state.completed = state.tasks.filter((el) => el.checked === true);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      // todo implement function for remove todo from the list
    },
    markAsChecked: (state, { payload }) => {
      state.tasks.forEach((el) => {
        if (el.id === payload) {
          el.checked = !el.checked;
        }
      });
      state.completed = state.tasks.filter((el) => el.checked === true);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      // todo implement function for mark task checked by id
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((el) => el.checked !== true);
      state.completed = [];
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      //todo implement funciton for remove all completed (checked ) tasks
    },
    checkAll: (state) => {
      state.tasks.forEach((el) => {
        if (el.checked === false) {
          el.checked = true;
          state.completed.push(el);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    renderTasks: (state, { payload }) => {
      switch (payload) {
        case "All": {
          state.renderTasks = state.tasks.map((el) => el);
          break;
        }
        case "ToDo": {
          state.renderTasks = state.tasks.filter((el) => el.checked === false);
          break;
        }
        case "Completed": {
          state.renderTasks = state.tasks.filter((el) => el.checked === true);
          break;
        }
        default: {
          break;
        }
      }
    },
  },
});
console.log(`todoSlice`, initialState);

export const actions = todoSlice.actions;

export default todoSlice.reducer;
