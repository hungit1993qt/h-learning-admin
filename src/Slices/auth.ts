import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ListAccount } from "Interface/listAccount";
import authAPI from "Services/authAPI";
import { LoginValue } from "Interface/loginValue";
import Swal from "sweetalert2";

interface State {
  listAccount: ListAccount[];
  admin: LoginValue | null;
}

const initialState: State = {
  listAccount: [],
  admin: JSON.parse(localStorage.getItem("adminLogin") as string) || null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (admin: LoginValue) => {
    try {
      // const data = await authAPI.login(values)
      const reponse = await authAPI.postUserLogin(admin!);
      const data = reponse.data;
      const statusReques: number = reponse.status;
      if (99 < statusReques && statusReques < 300) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng nhập thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("adminLogin", JSON.stringify(data));
      } else {
        Swal.fire({
          icon: "error",
          text: "Vui lòng nhập đúng thông tin",
          title: `${data}`,
          footer: '<a href="register">Bạn chưa có tài khoản? tạo ngay</a>',
        });
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("adminLogin");
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListAccount.fulfilled, (state, { payload }) => {
      state.listAccount = payload;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.admin = payload;
    });
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
