import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { AddValueCourse } from "../Interface/AddValueCourse";
import courseAPI from "../Services/courseAPI";
import { getListCourse } from "./showCourse";

interface State {
  editValueCourse: AddValueCourse | null;
  isLoading: boolean;
  error: string | null;
  actionMenu: boolean;
}

const initialState: State = {
  editValueCourse: null,
  isLoading: false,
  error: null,
  actionMenu: false,
};

// thunk actions
export const editCourse = createAsyncThunk(
  "course/editCourse",
  async (khoaHoc: {},{dispatch}) => {
    try {
      const respone = await courseAPI.editCourse(khoaHoc);
      const data = respone.data;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cập nhật khóa học thành công",
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
    builder.addCase(editCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editCourse.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.editValueCourse = payload;
    });
    builder.addCase(editCourse.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });
  },
});
// export reducer
export default courseSlice.reducer;
