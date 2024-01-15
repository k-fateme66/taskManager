import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  data: [],
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
      localStorage.setItem("Tasks", JSON.stringify(state.data));
    },
    getTasks: (state) => {
      const task = JSON.parse(localStorage.getItem("Tasks")) || [];
      state.data = task;
      state.isLoading = false;
    },
    changeStatusTask: (state, action) => {
      let { data: tasks } = state;
      state.data = tasks.map((task) => {
        if (task.id === action.payload.id) {
          if (task.isNew) {
            task.isNew = false;
            task.isProcess = true;
          } else if (task.isProcess) {
            task.isProcess = false;
            task.isComplete = true;
          } else if (task.isComplete && task.isArchive) {
            task.isArchive = false;
          } else if (task.isComplete) {
            task.isProcess = true;
            task.isComplete = false;
          }
        }
        return task;
      });
      localStorage.setItem("Tasks", JSON.stringify(state.data));
    },
    deleteTask: (state, action) => {
      let { data: tasks } = state;
      state.data = tasks.filter((task) => task.id !== action.payload.id);
      localStorage.setItem("Tasks", JSON.stringify(state.data));
    },
    editTask: (state, action) => {
      let { data: tasks } = state;
      state.data = tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("Tasks", JSON.stringify(state.data));
    },
    addArchiveTask: (state, action) => {
      let { data: tasks } = state;
      state.data = tasks.map((task) => {
        if (task.id == action.payload.id && !task.isArchive) {
          task.isArchive = true;
          task.isComplete = true;
          task.isProcess = false;
          task.isNew = false;
          task.dateArchive = action.payload.dateArchive;
        }
        return task;
      });
      localStorage.setItem("Tasks", JSON.stringify(state.data));
    },
  },
});

export const {
  addTask,
  getTasks,
  changeStatusTask,
  deleteTask,
  editTask,
  addArchiveTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
