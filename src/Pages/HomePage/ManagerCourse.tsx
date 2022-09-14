import styles from "_Playground/SCSS/HomePage/OverView.module.scss";
import stylesAddModal from "_Playground/SCSS/AddModal/AddModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { useEffect, useState } from "react";
import { getListCourse } from "Slices/showCourse";
import { addCourse } from "Slices/addCourse";
import { deleteCourse } from "Slices/deleteCourse";
import { editCourse } from "Slices/editCourse";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddValueCourse } from "Interface/AddValueCourse";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Moment from "moment";
import Swal from "sweetalert2";
//npm install react-datepicker --save
//npm install --save @types/react-datepicker
// import { useDebounce } from "usehooks-ts";

const schema = yup.object({
  maKhoaHoc: yup.string().required("Mã khóa học không được để trống"),
  tenKhoaHoc: yup.string().required("Tên khóa học không được để trống"),
  biDanh: yup.string().required("Bí danh không được để trống"),
  moTa: yup.string().required("Mô tả không được để trống"),
  luotXem: yup.string().required("Lượt xem không được để trống"),
  ngayTao: yup.string().required("Lượt xem không được để trống"),
  danhGia: yup.number().required("Đánh giá không được để trống"),
  hinhAnh: yup.mixed().test("required", "Vui lòng chọn ảnh", (value) => {
    return value && value.length;
  }),
});
Moment.locale("en");
const ManagerCourse = () => {
  const searchListCourse = () => {
    (async () => {
      const { value: tenKhoaHoc } = await Swal.fire({
        title: "Tìm Khóa Học",
        input: "text",
        inputLabel: "Nhập thông tin",
        inputPlaceholder: "Thông tin tìm kiếm",
      });

      if (tenKhoaHoc) {
        if (tenKhoaHoc === "all") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Tìm kiếm tất cả thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(getListCourse(` `));
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Tìm kiếm thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(getListCourse(tenKhoaHoc));
        }
      } else {
        dispatch(getListCourse(` `));
      }
    })();
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getListCourse(""));
  }, []);
  const { listCourse } = useSelector((state: RootState) => state.listCours);

  const [stylesAddCourseModal, setShowAddCourseModal] = useState(false);

  const [startDate, setDate] = useState(new Date());
  const today = new Date();

  const getValueLocalstorage = JSON.parse(
    localStorage.getItem("adminLogin") as string
  );
  const date: string = Moment(startDate).format("DD/MM/YYYY");

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<AddValueCourse>({
    defaultValues: {
      maNhom: "GP01",
      taiKhoanNguoiTao: getValueLocalstorage.taiKhoan,
    },
    mode: "onTouched",
    // cấu hình validation bằng yup schema
    resolver: yupResolver(schema),
  });
  const [isUpdateCourse, setisUpdateCourse] = useState(false);
  const handleChangeFile = (e: any) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      setImg(e.target.result);
    };
  };

  const onSubmit = (values: any) => {
    values.ngayTao = date;
    const data: any = {
      ...values,
      hinhAnh: values.hinhAnh[0],
      ngayTao: date,
    };

    let formData = new FormData();
    for (let key in data) {
      if (key !== "hinhAnh") {
        formData.append(key, data[key]);
      } else {
        if (data.hinhAnh !== null) {
          formData.append("hinhAnh", data.hinhAnh, data.hinhAnh.name);
        }
      }
    }
    if (isUpdateCourse) {
      console.log("edit");
      try {
        console.log(formData.get("hinhAnh"));
        dispatch(editCourse(formData));
        setisUpdateCourse(false);
        handleResetForm();
        setShowAddCourseModal(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        dispatch(addCourse(formData));
        handleResetForm();
        setShowAddCourseModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleResetForm = () => {
    resetField("maKhoaHoc");
    resetField("tenKhoaHoc");
    resetField("biDanh");
    resetField("luotXem");
    resetField("moTa");
    resetField("hinhAnh");
    setImg("");
  };
  const handleDeleteCourse = (maKhoaHoc: string) => {
    Swal.fire({
      title: "Chắc chắn muốn xóa khóa học này?",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: `thoát`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteCourse(maKhoaHoc));
      }
    });
  };
  const [danhGia, setDanhGia] = useState(0);
  const [danhMuc, setdanhMuc] = useState("");
  const [img, setImg] = useState("");

  const handleEditCourse = (Cours: any) => {
    setShowAddCourseModal(true);
    setisUpdateCourse(true);
    setValue("maKhoaHoc", Cours.maKhoaHoc);
    setValue("tenKhoaHoc", Cours.tenKhoaHoc);
    setValue("biDanh", Cours.biDanh);
    setValue("luotXem", Cours.luotXem);
    setDanhGia(Cours.danhGia);
    setValue("hinhAnh", null);
    setImg(Cours.hinhAnh);
    setValue("maNhom", Cours.maNhom);
    setValue("moTa", Cours.moTa);
    setdanhMuc(Cours.danhMucKhoaHoc.maDanhMucKhoahoc);
    setValue("taiKhoanNguoiTao", Cours.nguoiTao.taiKhoan);
  };

  return (
    <>
      <div
        className={
          stylesAddCourseModal
            ? `${stylesAddModal.modal} ${stylesAddModal.showAddModal}`
            : `${stylesAddModal.modal}`
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${stylesAddModal["modal-content"]} ${stylesAddModal.animate}`}
        >
          <div className={stylesAddModal["container"]}>
            <div>
              <label>
                <b>Mã Khóa Học</b>
              </label>
              <input
                type="text"
                placeholder="Vui lòng điền mã khóa học"
                {...register("maKhoaHoc")}
              />
              {errors.maKhoaHoc && (
                <span style={{ color: "red" }}>
                  {errors.maKhoaHoc?.message}
                </span>
              )}
            </div>
            <div>
              <label>
                <b>Bí Danh</b>
              </label>
              <input
                type="text"
                placeholder="Vui lòng điền bí danh"
                {...register("biDanh")}
              />
              {errors.biDanh && (
                <span style={{ color: "red" }}>{errors.biDanh?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Tên Khóa Học</b>
              </label>
              <input
                type="text"
                placeholder="Vui lòng điền tên khóa học"
                {...register("tenKhoaHoc")}
              />
              {errors.tenKhoaHoc && (
                <span style={{ color: "red" }}>
                  {errors.tenKhoaHoc?.message}
                </span>
              )}
            </div>

            <div>
              <label>
                <b>Lượt Xem</b>
              </label>
              <input
                type="number"
                placeholder="Vui lòng điền lượt xem"
                {...register("luotXem")}
              />
              {errors.luotXem && (
                <span style={{ color: "red" }}>{errors.luotXem?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Đánh Giá</b>
              </label>
              <select value={danhGia} {...register("danhGia")}>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
              {errors.danhGia && (
                <span style={{ color: "red" }}>{errors.danhGia?.message}</span>
              )}
            </div>
            <div className={stylesAddModal["inputHinhAnh"]}>
              <label>
                <b>Hình Ảnh</b>
              </label>
              {/* <label
                className={stylesAddModal["inputFile"]}
                htmlFor="imgUpload"
              >
                <b>Chọn ảnh</b>
              </label> */}
              <input
                type="file"
                {...register("hinhAnh")}
                id="imgUpload"
                onChange={handleChangeFile}
              />
              <img
                src={img}
                onError={(e: any) =>
                  (e.target.src = "../images/imgNotFound.png")
                }
                className={stylesAddModal["imgInput"]}
                alt=""
              />
            </div>
            {errors.hinhAnh && (
              <span style={{ color: "red" }}>{errors.hinhAnh?.message}</span>
            )}

            <div>
              <label>
                <b>Ngày Tạo</b>
              </label>
              <DatePicker
                dateFormat="dd/MM/yyy"
                selected={startDate}
                {...register("ngayTao", { value: startDate.toString() })}
                onChange={(day: any) => {
                  setDate(day);
                }}
                maxDate={today}
                todayButton={"Today"}
                className={stylesAddModal["dayPicker"]}
              />
            </div>
            <div>
              <label>
                <b>Mã Danh Mục Khóa Học</b>
              </label>
              <select value={danhMuc} {...register("maDanhMucKhoaHoc")}>
                <option value="BackEnd">Lập trình Backend</option>
                <option value="Design">Thiết kế Web</option>
                <option value="DiDong">Lập trình di động</option>
                <option value="FrontEnd">Lập trình Front end</option>
                <option value="FullStack">Lập trình Full Stack</option>
                <option value="TuDuy">Tư duy lập trình</option>
              </select>
              {errors.maDanhMucKhoaHoc && (
                <span>{errors.maDanhMucKhoaHoc?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Mã Nhóm</b>
              </label>
              <input type="text" {...register("maNhom")} disabled></input>
              {errors.maNhom && (
                <span style={{ color: "red" }}>{errors.maNhom?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Tài Khoản Người Tạo</b>
              </label>
              <input
                type="text"
                value={`${getValueLocalstorage.taiKhoan}`}
                {...register("taiKhoanNguoiTao")}
                disabled
              />
              {errors.taiKhoanNguoiTao && (
                <span style={{ color: "red" }}>
                  {errors.taiKhoanNguoiTao?.message}
                </span>
              )}
            </div>
            <div>
              <label>
                <b>Mô Tả</b>
              </label>
              <textarea rows={4} {...register("moTa")} />
              {errors.moTa && (
                <span style={{ color: "red" }}>{errors.moTa?.message}</span>
              )}
            </div>

            <div className={stylesAddModal["gr-btn"]}>
              <button
                type="button"
                onClick={() => {
                  setShowAddCourseModal(false);
                  handleResetForm();
                }}
              >
                Thoát
              </button>
              <button type="button" onClick={handleResetForm}>
                Xóa
              </button>
              <button className={isUpdateCourse ? "hide" : ""}>Thêm</button>
              <button
                className={isUpdateCourse ? "" : "hide"}
                onClick={() => setisUpdateCourse(true)}
              >
                Sửa
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles["list-Course"]}>
        <div className={styles["title"]}>
          <h2 className={styles["section--title"]}>Danh Sách Khóa Học</h2>

          <button
            onClick={() => setShowAddCourseModal(true)}
            className={styles["add"]}
          >
            <i className="fa fa-plus"></i>
            Thêm
          </button>
        </div>
        <div className={styles["tableListCourse"]}>
          <table>
            <thead>
              <tr>
                <th onClick={() => searchListCourse()}>
                  {/* <input
                      placeholder="Tìm khóa học..."
                      className={styles.inputSearch}
                      type="text"
                      onChange={handlSearchListCourse}
                      name=""
                      id=""
                    /> */}
                  Click tìm kiếm ...
                </th>
                <th>Mã Khóa Học</th>
                {/* <th>Bí Danh</th> */}

                <th>Mô Tả</th>
                {/* <th>Lượt Xem</th> */}
                <th>Ảnh</th>
                {/* <th>Ngày Tạo</th> */}
                {/* <th>Danh Mục </th> */}
                {/* <th>Người Tạo</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listCourse.map((Course: any) => {
                return (
                  <tr key={Course.maKhoaHoc}>
                    <td>{Course.tenKhoaHoc}</td>
                    <td>
                      <i
                        onClick={() =>
                          Swal.fire(`Mã khóa học: ${Course.maKhoaHoc}`)
                        }
                        style={{ cursor: "pointer" }}
                        className="fa fa-eye-slash"
                      ></i>
                    </td>
                    {/* <td>
                          <i
                            onClick={() =>
                              Swal.fire(`Bí danh: ${Course.biDanh}`)
                            }
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td> */}
                    <td>
                      <i
                        onClick={() => Swal.fire(`Mô tả: ${Course.moTa}`)}
                        style={{ cursor: "pointer" }}
                        className="fa fa-eye-slash"
                      ></i>
                    </td>
                    {/* <td className={styles["pending"]}>
                          <i
                            onClick={() =>
                              Swal.fire(`Mô tả: ${Course.luotXem}`)
                            }
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td> */}

                    <td>
                      <i
                        onClick={() =>
                          Swal.fire({
                            title: `${Course.tenKhoaHoc}`,
                            html: `
                                  Bí danh: ${Course.biDanh}.</br>
                                  Lượt xem: ${Course.luotXem}</br>
                                  Ngày tạo: ${Course.ngayTao}</br>
                                  Danh mục khóa học: ${Course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</br>
                                  Người tạo: ${Course.nguoiTao.taiKhoan}</br>
                                `,

                            imageUrl: `${Course.hinhAnh}`,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image",
                          })
                        }
                        className="fa fa-image"
                      ></i>
                    </td>
                    {/* <td>
                          <i
                            onClick={() =>
                              Swal.fire(`Mô tả: ${Course.ngayTao}`)
                            }
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td> */}
                    {/* <td>
                          {" "}
                          <i
                            onClick={() =>
                              Swal.fire(
                                `Mô tả: ${Course.danhMucKhoaHoc.tenDanhMucKhoaHoc}`
                              )
                            }
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td>
                        <td>
                          <i
                            onClick={() =>
                              Swal.fire(`Bí danh: ${Course.nguoiTao.hoTen}`)
                            }
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td> */}
                    <td>
                      <span>
                        <i
                          onClick={() => handleEditCourse(Course)}
                          className={`fa fa-edit ${styles.edit}`}
                        ></i>
                        <i
                          onClick={() => handleDeleteCourse(Course.maKhoaHoc)}
                          className={`fa fa-trash ${styles.delete}`}
                        ></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManagerCourse;
