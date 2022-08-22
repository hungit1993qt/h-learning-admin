import axiosClient from "./axiosClient";
import { LoginValue } from "../Interface/loginValue";

const authAPI = {
  postUserLogin: ({ taiKhoan, matKhau }: LoginValue) => {
    return axiosClient.post("QuanLyNguoiDung/DangNhap", {
      taiKhoan,
      matKhau,
    });
  },
  getListAccount: () => {
    // Khai báo hàm call API dữ liệu trả về là Movie[]
    return axiosClient.get("QuanLyNguoiDung/TimKiemNguoiDung",{
      params:{
        // tuKhoa:tuKhoa
        //MaNhom:"GP01"
      }
    });
  },
  
};

export default authAPI;
