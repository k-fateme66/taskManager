import { createSlice } from "@reduxjs/toolkit";

const formShowSlice = createSlice({
  name: "formShow",
  initialState: {
    isFormShow: false,
  },
  reducers: {
    changeShow: (state, action) => {
      state.isFormShow = !state.isFormShow;
    },
  },
});
export const { changeShow } = formShowSlice.actions;
export default formShowSlice.reducer;
