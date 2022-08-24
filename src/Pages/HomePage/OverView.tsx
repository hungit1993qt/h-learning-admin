import styles from "_Playground/SCSS/HomePage/OverView.module.scss";
import stylesAddModal from "_Playground/SCSS/AddModal/AddModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { useEffect, useState } from "react";
import { getListCourse } from "Slices/Course";
import { getListAccount, logOut } from "Slices/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddValueCourse } from "Interface/AddValueCourse";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from "yup";
import Moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//npm install react-datepicker --save
//npm install --save @types/react-datepicker
// import { useDebounce } from "usehooks-ts";
import Swal from "sweetalert2";
const schema = object({
  maKhoaHoc: string().required("Mã khóa học không được để trống"),
  tenKhoaHoc: string().required("Tên khóa học không được để trống"),
  biDanh: string().required("Bí danh không được để trống"),
  moTa: string().required("Mô tả không được để trống"),
  luotXem: number()
    .required("Lượt xem không được để trống")

    .integer("Không đúng định dạng số"),
  ngayTao: string().required("Lượt xem không được để trống"),
  danhGia: number()
    .required("Đánh giá không được để trống")

    .integer("Không đúng định dạng số"),
});
Moment.locale("en");

const OverView = () => {
  // const [valueSearchListCourse, setValueSearchListCourse] =
  //   useState<string>("");
  const [valueSearchListAccountGV, setValueSearchListAccountGV] =
    useState<string>(" ");
  const [valueSearchListAccountHV, setValueSearchListAccountHV] =
    useState<string>(" ");
  // const debouncedValueListCourse = useDebounce<string>(
  //   valueSearchListCourse,
  //   500
  // );
  // const debouncedValueListAccount = useDebounce<string>(
  //   valueSearchListAccount,
  //   500
  // );
  // const handlSearchListCourse = (event: ChangeEvent<HTMLInputElement>) => {
  //   setValueSearchListCourse(event.target.value);
  // };
  // const handlSearchListAccount = (event: ChangeEvent<HTMLInputElement>) => {
  //   setValueSearchListAccount(event.target.value);
  // };
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

  const { actionMenu } = useSelector((state: RootState) => state.actionMenu);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getListCourse(""));
    dispatch(getListAccount());
  }, []);
  const { listCourse } = useSelector((state: RootState) => state.listCours);
  const { listAccount } = useSelector((state: RootState) => state.listAccount);
  let totalTeacher = 0;
  let totalStudent = 0;
  for (let i = 0; i < listAccount.length; i++) {
    if (listAccount[i].maLoaiNguoiDung === "GV") {
      totalTeacher += 1;
    } else {
      totalStudent += 1;
    }
  }
  const searchListAccountGV = () => {
    (async () => {
      const { value: tenTaikhoan } = await Swal.fire({
        title: "Tìm người dùng",
        input: "text",
        inputLabel: "Nhập thông tin",
        inputPlaceholder: "Thông tin tìm kiếm",
      });

      if (tenTaikhoan) {
        if (tenTaikhoan === "all") {
          Swal.fire({
            position: "center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setValueSearchListAccountGV("");
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setValueSearchListAccountGV(tenTaikhoan);
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          showConfirmButton: true,
          showCancelButton: true,
          title: "Bạn quên điền, Không dữ liệu",
          text: "Nhấn ok để hiễn thị all dữ liệu.",
        }).then((result) => {
          if (result.isConfirmed) {
            setValueSearchListAccountGV("");
          }
        });
      }
    })();
  };
  const searchListAccountHV = () => {
    (async () => {
      const { value: tenTaikhoan } = await Swal.fire({
        title: "Tìm người dùng",
        input: "text",
        inputLabel: "Nhập thông tin",
        inputPlaceholder: "Thông tin tìm kiếm",
      });

      if (tenTaikhoan) {
        if (tenTaikhoan === "all") {
          Swal.fire({
            position: "center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setValueSearchListAccountHV("");
        } else {
          setValueSearchListAccountHV(tenTaikhoan);
        }
      } else {
        setValueSearchListAccountHV("");
      }
    })();
  };
  const NotDataSearch = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      showConfirmButton: false,

      title: "Không dữ liệu",
      text: "Thông tin bạn tìm kiếm không có trong hệ thống.",
      timer: 2000,
    });
  };
  const ListCoursesGV = listAccount.filter((ac) => ac.maLoaiNguoiDung === "GV");
  const ListCoursesHV = listAccount.filter((ac) => ac.maLoaiNguoiDung === "HV");
  const resultSearchAccountGV = ListCoursesGV.filter((account) =>
    account.hoTen.toLocaleLowerCase().includes(valueSearchListAccountGV)
  );
  const resultSearchAccountHV = ListCoursesHV.filter((account) =>
    account.hoTen.toLocaleLowerCase().includes(valueSearchListAccountHV)
  );
  // const listAccountsGV = resultSearchAccountGV;
  // const listAccountsHV = resultSearchAccountHV;
  const listAccountsGV =
    resultSearchAccountGV.length > 0 ? resultSearchAccountGV : [];
  const listAccountsHV =
    resultSearchAccountHV.length > 0 ? resultSearchAccountHV : [];
  const [stylesAddCourseModal, setShowAddCourseModal] = useState(false);
  const [stylesAddGVModal, setShowAddGVModal] = useState(false);

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

  const onSubmit = (values: AddValueCourse) => {
    values.ngayTao = date;

    console.log(values);
    handleResetForm();
  };
  const handleResetForm = () => {
    resetField("maKhoaHoc");
    resetField("tenKhoaHoc");
    resetField("biDanh");
    resetField("luotXem");
    resetField("moTa");
    resetField("hinhAnh");
  };
  //const date: string = startDate.toLocaleDateString("en-CA");

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
              {errors.maKhoaHoc && <span>{errors.maKhoaHoc?.message}</span>}
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
              {errors.biDanh && <span>{errors.biDanh?.message}</span>}
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
              {errors.tenKhoaHoc && <span>{errors.tenKhoaHoc?.message}</span>}
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
              {errors.luotXem && <span>{errors.luotXem?.message}</span>}
            </div>
            <div>
              <label>
                <b>Đánh Giá</b>
              </label>
              <select {...register("danhGia")}>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
              {errors.danhGia && <span>{errors.danhGia?.message}</span>}
            </div>
            <div>
              <label>
                <b>Hình Ảnh</b>
              </label>
              <input
                type="file"
                placeholder="Vui lòng chọn hình ảnh"
                {...register("hinhAnh")}
              />
            </div>
            {errors.hinhAnh && <span>{errors.hinhAnh?.message}</span>}

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
              <select {...register("maDanhMucKhoaHoc")}>
                <option value="FullStack">FullStack</option>
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
              {errors.maNhom && <span>{errors.maNhom?.message}</span>}
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
                <span>{errors.taiKhoanNguoiTao?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Mô Tả</b>
              </label>
              {/* <textarea rows={4} defaultValue={""} {...register("moTa")} /> */}
              {/* {errors.moTa && <span>{errors.moTa?.message}</span>} */}
              <CKEditor
                editor={ClassicEditor}
                // config={config}
                data="<p>Hello from CKEditor 5!</p>"
                onInit={(editor:any) => {
                  // You can store the "editor" and use when it is needed.
                  console.log(
                    "Editor is ready to use!",
                    editor,
                    Array.from(editor.ui.componentFactory.names())
                  );
                }}
                onChange={(event:any, editor:any) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event:any, editor:any) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event:any, editor:any) => {
                  console.log("Focus.", editor);
                }}
              />
             
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
              <button>Thêm</button>
            </div>
          </div>
        </form>
      </div>
      <div
        className={
          stylesAddGVModal
            ? `${stylesAddModal.modal} ${stylesAddModal.showAddModal}`
            : `${stylesAddModal.modal}`
        }
      >
        <form
          className={`${stylesAddModal["modal-content"]} ${stylesAddModal.animate}`}
        >
          <div className={stylesAddModal["container"]}>
            <label>
              <b>Tài Khoản</b>
            </label>
            <input type="text" placeholder="Vui lòng điền mã khóa học" />
            <label>
              <b>Mật Khẩu</b>
            </label>
            <input type="password" placeholder="Vui lòng điền mật khẩu" />
            <label>
              <b>Họ Tên</b>
            </label>
            <input type="text" placeholder="Vui lòng điền họ tên " />
            <label>
              <b>Số Điện Thoại</b>
            </label>
            <input type="text" placeholder="Vui lòng điền số điện thoại" />
            <label>
              <b>Loại Tài Khoản</b>
            </label>
            <select>
              <option value="GV">Giáo Vụ</option>
              <option value="HV">Học Viên</option>
            </select>
            <label>
              <b>Nhóm</b>
            </label>
            <select>
              <option value="GP01">GP01</option>
              <option value="GP02">GP02</option>
            </select>
            <label>
              <b>Email</b>
            </label>
            <input type="email" placeholder="Vui lòng điền email" />

            <div className={stylesAddModal["gr-btn"]}>
              <button onClick={() => setShowAddGVModal(false)}>Thoát</button>
              <button>Xóa</button>
              <button>Thêm</button>
            </div>
          </div>
        </form>
      </div>

      <section className={styles["main"]}>
        <div
          className={
            actionMenu
              ? `${styles.sidebar} ${styles.active}`
              : `${styles.sidebar}`
          }
        >
          {/* ${styles.active} */}
          <ul className={styles["sidebar--items"]}>
            <li>
              <a href="#" id={styles["active--link"]}>
                <span className={`${styles.icon} ${styles["icon-1"]}`}>
                  <i className="fa fa-th-large"></i>
                </span>
                <span className={styles["sidebar--item"]}>Tổng Quan</span>
              </a>
            </li>
            {/* <li>
            <a href="#">
              <span className={`${styles.icon} ${styles["icon-2"]}`}>
                <i className="fa fa-calendar-alt"></i>
              </span>
              <span className={styles["sidebar--item"]}>QUẢN LÝ NGƯỜI DÙNG</span>
            </a>
          </li> */}
            <li>
              <a href="#">
                <span className={`${styles.icon} ${styles["icon-3"]}`}>
                  <i className="fa fa-chalkboard-teacher"></i>
                </span>
                <span
                  className={styles["sidebar--item"]}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Quản lý giáo vụ
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className={`${styles.icon} ${styles["icon-4"]}`}>
                  <i className="fa fa-user"></i>
                </span>
                <span
                  className={styles["sidebar--item"]}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Quản lý học viên
                </span>
              </a>
            </li>

            {/* <li>
            <a href="#">
              <span className={`${styles.icon} ${styles["icon-5"]}`}>
                <i className="fa fa-chart-line"></i>
              </span>
              <span className={styles["sidebar--item"]}>Activity</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className={`${styles.icon} ${styles["icon-6"]}`}>
                <i className="fa fa-server"></i>
              </span>
              <span className={styles["sidebar--item"]}>Support</span>
            </a>
          </li> */}
          </ul>
          <ul className={styles["sidebar--bottom-items"]}>
            <li>
              <a href="#">
                <span className={`${styles.icon} ${styles["icon-7"]}`}>
                  <i className="fa fa-cogs"></i>
                </span>
                <span
                  className={styles["sidebar--item"]}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Cài đặt
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className={`${styles.icon} ${styles["icon-8"]}`}>
                  <i className="fa fa-sign-out-alt"></i>
                </span>
                <span
                  onClick={() => dispatch(logOut())}
                  className={styles["sidebar--item"]}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Đăng xuất
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div
          className={
            actionMenu
              ? `${styles["main--content"]} ${styles.active}`
              : `${styles["main--content"]}`
          }
        >
          <div className={styles["overview"]}>
            <div className={styles["title"]}>
              <h2 className={styles["section--title"]}>Tổng Quan</h2>
              <select name="date" id="date" className={styles["dropdown"]}>
                <option value="today">Hôm nay</option>
                <option value="lastweek">Tuần trước</option>
                <option value="lastmonth">Tháng trước</option>
                <option value="lastyear">Năm trước</option>
                <option value="alltime">Tất cả</option>
              </select>
            </div>
            <div className={styles["cards"]}>
              <div className={`${styles.card} ${styles[`card-1`]} `}>
                <div className={styles["card--data"]}>
                  <div className={styles["card--content"]}>
                    <h5 className={styles["card--title"]}>Số Lượng Giáo Vụ</h5>
                    <h1>{totalTeacher}</h1>
                  </div>
                  <i className={`fa fa-user ${styles[`card--icon--lg`]}`} />
                </div>
                <div className={styles["card--stats"]}>
                  <span>
                    <i
                      className={`fa fa-chart-line ${styles[`card--icon`]} ${
                        styles[`stat--icon`]
                      }`}
                    />
                    65%
                  </span>
                  <span>
                    <i
                      className={`fa fa-angle-up ${styles[`card--icon`]} ${
                        styles[`up--arrow`]
                      }`}
                    />
                    10
                  </span>
                  <span>
                    <i
                      className={`fa fa-angle-down ${styles[`card--icon`]} ${
                        styles[`down--arrow`]
                      }`}
                    />
                    2
                  </span>
                </div>
              </div>
              <div className={`${styles.card} ${styles[`card-2`]} `}>
                <div className={styles["card--data"]}>
                  <div className={styles["card--content"]}>
                    <h5 className={styles["card--title"]}>Số Lượng Học Viên</h5>
                    <h1>{totalStudent}</h1>
                  </div>
                  <i className={`fa fa-user-alt ${styles[`card--icon--lg`]}`} />
                </div>
                <div className={styles["card--stats"]}>
                  <span>
                    <i
                      className={`fa fa-chart-line ${styles[`card--icon`]} ${
                        styles[`stat--icon`]
                      }`}
                    />
                    65%
                  </span>
                  <span>
                    <i
                      className={`fa fa-angle-up ${styles[`card--icon`]} ${
                        styles[`up--arrow`]
                      }`}
                    />
                    10
                  </span>
                  <span>
                    <i
                      className={`fa fa-angle-down ${styles[`card--icon`]} ${
                        styles[`down--arrow`]
                      }`}
                    />
                    2
                  </span>
                </div>
              </div>
              <div className={`${styles.card} ${styles[`card-3`]} `}>
                <div className={styles["card--data"]}>
                  <div className={styles["card--content"]}>
                    <h5 className={styles["card--title"]}>Số Lượng Khóa Học</h5>
                    <h1>{listCourse.length}</h1>
                  </div>
                  <i
                    className={`fa fa-book-open ${styles[`card--icon--lg`]}`}
                  />
                </div>
                <div className={styles["card--stats"]}>
                  <span>
                    <i
                      className={`fa fa-chart-line ${styles[`card--icon`]} ${
                        styles[`stat--icon`]
                      }`}
                    />
                    65%
                  </span>
                  <span>
                    <i
                      className={`fa fa-angle-up ${styles[`card--icon`]} ${
                        styles[`up--arrow`]
                      }`}
                    />
                    10
                  </span>
                  <span>
                    <i
                      className={`fa fa-angle-down ${styles[`card--icon`]} ${
                        styles[`down--arrow`]
                      }`}
                    />
                    2
                  </span>
                </div>
              </div>
              <div className={`${styles.card} ${styles[`card-4`]} `}>
                <div className={styles["card--data"]}>
                  <div className={styles["card--content"]}>
                    <h5 className={styles["card--title"]}>
                      SL Khóa Học Đăng Ký
                    </h5>
                    <h1>15</h1>
                  </div>
                  <i className={`fa fa-check ${styles[`card--icon--lg`]}`} />
                </div>
                <div className={styles["card--stats"]}>
                  <span>
                    <i
                      className={`fa fa-chart-line ${styles[`card--icon`]} ${
                        styles[`stat--icon`]
                      }`}
                    />
                    65%
                  </span>
                  <span>
                    <i
                      className={`fa fa-angle-up ${styles[`card--icon`]} ${
                        styles[`up--arrow`]
                      }`}
                    />
                    10
                  </span>
                  <span>
                    <i
                      className={`fa fa-angle-down ${styles[`card--icon`]} ${
                        styles[`down--arrow`]
                      }`}
                    />
                    2
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles["doctors"]}>
          <div className={styles["title"]}>
            <h2 className={styles["section--title"]}>Doctors</h2>
            <div className={styles["doctors--right--btns"]}>
              <select
                name="date"
                id="date"
                className={`${styles.dropdown} ${styles[`doctor--filter`]}`}
              >
                <option>Filter</option>
                <option value="free">Free</option>
                <option value="scheduled">Scheduled</option>
              </select>
              <button className={styles["add"]}>
                <i className="fa fa-plus"></i>
                Add Doctor
              </button>
            </div>
          </div>
          <div className={styles["doctors--cards"]}>
            <a href="#" className={styles["doctor--card"]}>
              <div className={styles["img--box--cover"]}>
                <div className={styles["img--box"]}>
                  <img src="assets/images/doctor1.jpg" alt="" />
                </div>
              </div>
              <p className={styles["free"]}>Free</p>
            </a>
            <a href="#" className={styles["doctor--card"]}>
              <div className={styles["img--box--cover"]}>
                <div className={styles["img--box"]}>
                  <img src="assets/images/doctor2.jpg" alt="" />
                </div>
              </div>
              <p className={styles["scheduled"]}>Scheduled</p>
            </a>
            <a href="#" className={styles["doctor--card"]}>
              <div className={styles["img--box--cover"]}>
                <div className={styles["img--box"]}>
                  <img src="assets/images/doctor3.jpg" alt="" />
                </div>
              </div>
              <p className={styles["scheduled"]}>Scheduled</p>
            </a>
            <a href="#" className={styles["doctor--card"]}>
              <div className={styles["img--box--cover"]}>
                <div className={styles["img--box"]}>
                  <img src="assets/images/doctor4.jpg" alt="" />
                </div>
              </div>
              <p className={styles["free"]}>Free</p>
            </a>
            <a href="#" className={styles["doctor--card"]}>
              <div className={styles["img--box--cover"]}>
                <div className={styles["img--box"]}>
                  <img src="assets/images/doctor5.jpg" alt="" />
                </div>
              </div>
              <p className={styles["scheduled"]}>Scheduled</p>
            </a>
            <a href="#" className={styles["doctor--card"]}>
              <div className={styles["img--box--cover"]}>
                <div className={styles["img--box"]}>
                  <img src="assets/images/doctor6.jpg" alt="" />
                </div>
              </div>
              <p className={styles["free"]}>Free</p>
            </a>
            <a href="#" className={styles["doctor--card"]}>
              <div className={styles["img--box--cover"]}>
                <div className={styles["img--box"]}>
                  <img src="assets/images/doctor7.jpg" alt="" />
                </div>
              </div>
              <p className={styles["scheduled"]}>Scheduled</p>
            </a>
          </div>
        </div> */}
          <div className={styles["tableListUser"]}>
            <div className={styles["title"]}>
              <h2 className={styles["section--title"]}>Danh Sách Giáo Vụ</h2>
              <button
                onClick={() => setShowAddGVModal(true)}
                className={styles["add"]}
              >
                <i className="fa fa-plus"></i>
                Thêm
              </button>
            </div>
            <div className={styles["table"]}>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => searchListAccountGV()}>
                      {/* <input
                      placeholder="Tìm tên..."
                      className={styles.inputSearch}
                      type="text"
                      onChange={handlSearchListAccount}
                      name=""
                      id=""
                    /> */}
                      Click tìm kiếm ...
                    </th>
                    <th>Tài Khoản</th>
                    <th>Mật Khẩu</th>

                    <th>Email</th>
                    <th>SĐT</th>
                    <th>Cấp Bậc</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listAccountsGV.map((Account) => {
                    return (
                      <tr key={Account.taiKhoan}>
                        <td>{Account.hoTen}</td>
                        <td>{Account.taiKhoan}</td>
                        <td>
                          <i
                            onClick={() =>
                              Swal.fire(`Mật khẩu: ${Account.matKhau}`)
                            }
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td>

                        <td>
                          {" "}
                          <i
                            onClick={() => Swal.fire(`Email: ${Account.email}`)}
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td>
                        <td>{Account.soDt}</td>
                        <td className={styles["pending"]}>
                          {Account.tenLoaiNguoiDung}
                        </td>

                        <td>
                          <span>
                            <i className={`fa fa-edit ${styles.edit}`}></i>
                            <i className={`fa fa-trash ${styles.delete}`}></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles["tableListUser"]}>
            <div className={styles["title"]}>
              <h2 className={styles["section--title"]}>Danh Sách Học Viên</h2>
              <button
                onClick={() => setShowAddGVModal(true)}
                className={styles["add"]}
              >
                <i className="fa fa-plus"></i>
                Thêm
              </button>
            </div>
            <div className={styles["table"]}>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => searchListAccountHV()}>
                      {/* <input
                      placeholder="Tìm tên..."
                      className={styles.inputSearch}
                      type="text"
                      onChange={handlSearchListAccount}
                      name=""
                      id=""
                    /> */}
                      Click tìm kiếm ...
                    </th>
                    <th>Tài Khoản</th>
                    <th>Mật Khẩu</th>

                    <th>Email</th>
                    <th>SĐT</th>
                    <th>Cấp Bậc</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listAccountsHV.map((Account) => {
                    return (
                      <tr key={Account.taiKhoan}>
                        <td>{Account.hoTen}</td>
                        <td>{Account.taiKhoan}</td>
                        <td>
                          <i
                            onClick={() =>
                              Swal.fire(`Mật khẩu: ${Account.matKhau}`)
                            }
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td>

                        <td>
                          {" "}
                          <i
                            onClick={() => Swal.fire(`Email: ${Account.email}`)}
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td>
                        <td>{Account.soDt}</td>
                        <td className={styles["pending"]}>
                          {Account.tenLoaiNguoiDung}
                        </td>

                        <td>
                          <span>
                            <i className={`fa fa-edit ${styles.edit}`}></i>
                            <i className={`fa fa-trash ${styles.delete}`}></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
                    <th>Bí Danh</th>

                    <th>Mô Tả</th>
                    <th>Lượt Xem</th>
                    <th>Ảnh</th>
                    <th>Ngày Tạo</th>
                    <th>Danh Mục </th>
                    <th>Người Tạo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listCourse.map((Course) => {
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
                        <td>
                          <i
                            onClick={() =>
                              Swal.fire(`Bí danh: ${Course.biDanh}`)
                            }
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td>
                        <td>
                          <i
                            onClick={() => Swal.fire(`Mô tả: ${Course.moTa}`)}
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td>
                        <td className={styles["pending"]}>{Course.luotXem}</td>

                        <td>
                          <i
                            onClick={() =>
                              Swal.fire({
                                title: `${Course.tenKhoaHoc}`,
                                imageUrl: `${Course.hinhAnh}`,
                                imageWidth: 400,
                                imageHeight: 200,
                                imageAlt: "Custom image",
                              })
                            }
                            className="fa fa-image"
                          ></i>
                        </td>
                        <td>{Course.ngayTao}</td>
                        <td>{Course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</td>
                        <td>
                          <i
                            onClick={() =>
                              Swal.fire(`Bí danh: ${Course.nguoiTao.hoTen}`)
                            }
                            style={{ cursor: "pointer" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </td>
                        <td>
                          <span>
                            <i className={`fa fa-edit ${styles.edit}`}></i>
                            <i className={`fa fa-trash ${styles.delete}`}></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OverView;
