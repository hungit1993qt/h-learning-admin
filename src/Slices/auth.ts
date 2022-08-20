import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const message: string | null = "Hello"
// const number = message as string

const initialState = {
  // user: {
  //   taiKhoan: "dannguyen",
  //   email: "dan@gmail.com",
  //   accessToken: "abc123",
  // },
  user: JSON.parse(localStorage.getItem("user") as string) || null,
};

// Viết actions login và register
export const login = createAsyncThunk("auth/login", async (values) => {
  try {
    // const data = await authAPI.login(values)
    const data = { name: "aaa" };
    // Lưu thông tin user xuống localStorage
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      // state.user = payload
    });
  },
});

export default authSlice.reducer;
