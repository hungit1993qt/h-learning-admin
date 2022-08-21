import axiosClient from "./axiosClient";

const authAPI = {
  getListAccount: (tuKhoa:string) => {
    // Khai báo hàm call API dữ liệu trả về là Movie[]
    return axiosClient.get("QuanLyNguoiDung/TimKiemNguoiDung",{
      params:{
        tuKhoa:tuKhoa
        //MaNhom:"GP01"
      }
    });
  },
  
};

export default authAPI;
