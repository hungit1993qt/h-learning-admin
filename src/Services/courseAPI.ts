import axiosClient from "./axiosClient";

const courseAPI = {
  getListCourse: (tenKhoaHoc:string) => {
    // Khai báo hàm call API dữ liệu trả về là Movie[]
    return axiosClient.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc",{
      params:{
        tenKhoaHoc:tenKhoaHoc
        //MaNhom:"GP01"
      }
    });
  },
  // getMovieDetails: (movieId: string) => {
  //   return axiosClient.get("QuanLyPhim/LayThongTinPhim", {
  //     params: {
  //       maPhim: movieId,
  //     },
  //   });
  // },
  // Và những còn lại liên quan đến movie...
  // addMovie: (movie: any) => {
  //   // Khi dữ liệu tải lên server có định dạng đặc biệt như File,..., ta cần chuyển thành dạng multipart/form-data bằng cách sử dụng đối tượng FormData
  //   const formData = new FormData();
  //   for (let key in movie) {
  //     formData.append(key, movie[key]);
  //   }
  //   formData.append("maNhom", "GP01");

  //   return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", formData);
  // },
};

export default courseAPI;
