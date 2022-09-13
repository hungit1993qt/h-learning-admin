import { createAsyncThunk } from "@reduxjs/toolkit";
import courseAPI from "../Services/courseAPI";
import Swal from "sweetalert2";
import { getListCourse } from "./showCourse";

// thunk actions
export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (maKhoaHoc: string, { dispatch }) => {
    try {
      const respone = await courseAPI.deleteCourse(maKhoaHoc);
      const data = respone.data;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Xóa thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getListCourse(``));
      return data;
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${error} Xóa thất bại`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
);

