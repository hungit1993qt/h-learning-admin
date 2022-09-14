import { createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../Services/authAPI";
import Swal from "sweetalert2";
import { getListAccount } from "./auth";

// thunk actions
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (TaiKhoan: string, { dispatch }) => {
    try {
      const respone = await authAPI.deleteAccount(TaiKhoan);
      const data = respone.data;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Xóa thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getListAccount());
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
