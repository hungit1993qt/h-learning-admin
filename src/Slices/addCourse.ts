import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { AddValueCourse } from "../Interface/AddValueCourse";
import courseAPI from "../Services/courseAPI";
import { getListCourse } from "./showCourse";

interface State {
  addValueCourse: AddValueCourse | null;
  isLoading: boolean;
  error: string | null;
  actionMenu: boolean;
}

const initialState: State = {
  addValueCourse: null,
  isLoading: false,
  error: null,
  actionMenu: false,
};

// thunk actions
export const addCourse = createAsyncThunk(
  "course/addCourse",
  async (khoaHoc: {},{dispatch}) => {
    try {
      const respone = await courseAPI.addCourse(khoaHoc);
      const data = respone.data;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thêm khóa học thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getListCourse(``));
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCourse.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.addValueCourse = payload;
    });
    builder.addCase(addCourse.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });
  },
});
// export reducer
export default courseSlice.reducer;
