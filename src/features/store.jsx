import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice";
import tasksSlice from "./tasks/tasksSlice";
import formShowSlice from "./formShow/formShowSlice";

export default configureStore({
  reducer: {
    tasks: tasksSlice,
    auth: authSlice,
    formShow: formShowSlice,
  },
});
