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
    return axiosClient.get("QuanLyNguoiDung/TimKiemNguoiDung", {
      params: {
        // tuKhoa:tuKhoa
        //MaNhom:"GP01"
      },
    });
  },
  addAccount: (account: {}) => {
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", account);
  },
  deleteAccount: (TaiKhoan: string) => {
    return axiosClient.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: TaiKhoan,
      },
    });
  },
  editAccount: (account: {}) => {
    return axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", account);
  },
};

export default authAPI;
