import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddValueAccount } from "Interface/AddValueAccount";
import authAPI from "Services/authAPI";
import Swal from "sweetalert2";
import { getListAccount } from "./auth";

interface State {
  editValueAccount: AddValueAccount | null;
  isLoading: boolean;
  error: string | null;
  actionMenu: boolean;
}

const initialState: State = {
  editValueAccount: null,
  isLoading: false,
  error: null,
  actionMenu: false,
};

// thunk actions
export const editAccount = createAsyncThunk(
  "auth/editAccount",
  async (account: {},{dispatch}) => {
    try {
      const respone = await authAPI.editAccount(account);
      const data = respone.data;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cập nhật tài khoản thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getListAccount());
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
    builder.addCase(editAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editAccount.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.editValueAccount = payload;
    });
    builder.addCase(editAccount.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });
  },
});
// export reducer
export default courseSlice.reducer;
