import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./Containers/TodoList/todoSlice";

export default configureStore({
  devTools: true,
  reducer: { todo: todoSlice.reducer },
  // todo: //todo link here todo reducer from the slice
});
