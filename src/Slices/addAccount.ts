import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "Services/authAPI";
import Swal from "sweetalert2";
import { AddValueAccount } from "../Interface/AddValueAccount";
import { getListCourse } from "./showCourse";

interface State {
  addValueAccount: AddValueAccount | null;
  isLoading: boolean;
  error: string | null;
  actionMenu: boolean;
}

const initialState: State = {
  addValueAccount: null,
  isLoading: false,
  error: null,
  actionMenu: false,
};

// thunk actions
export const addAccount = createAsyncThunk(
  "auth/addAccount",
  async (account: {}, { dispatch }) => {
    try {
      const respone = await authAPI.addAccount(account);
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
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addAccount.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.addValueAccount = payload;
    });
    builder.addCase(addAccount.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });
  },
});
// export reducer
export default courseSlice.reducer;
