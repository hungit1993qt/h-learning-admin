import axiosClient from "./axiosClient";

const courseAPI = {
  getListCourse: (tenKhoaHoc: string) => {
    // Khai báo hàm call API dữ liệu trả về là Movie[]
    return axiosClient.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
      params: {
        tenKhoaHoc: tenKhoaHoc,
      },
    });
  },
  addCourse: (khoaHoc: {}) => {
    return axiosClient.post("QuanLyKhoaHoc/ThemKhoaHocUploadHinh", khoaHoc);
  },
  deleteCourse: (MaKhoahoc: any) => {
    return axiosClient.delete("QuanLyKhoaHoc/XoaKhoaHoc", {
      params:{
        MaKhoahoc:MaKhoahoc
      }
    });
  },
};

export default courseAPI;
