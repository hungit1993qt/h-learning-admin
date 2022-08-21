import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ListAccount } from "Interface/listAccount";
import authAPI from "Services/authAPI";

interface State {
  listAccount: ListAccount[];
  user:any;
}

const initialState: State = {
  listAccount: [],
  user:{},
};

// Viết actions login và register
export const getListAccount = createAsyncThunk(
  "auth/getListAccount",
  async () => {
    try {
      const respone = await authAPI.getListAccount();
      const data = respone.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListAccount.fulfilled, (state, { payload }) => {
      state.listAccount = payload;
    });
  },
});

export default authSlice.reducer;
