import styles from "_Playground/SCSS/HomePage/OverView.module.scss";
import stylesAddModal from "_Playground/SCSS/AddModal/AddModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { useEffect, useState } from "react";
import { getListAccount } from "Slices/auth";
import "react-datepicker/dist/react-datepicker.css";
import { AddValueAccount } from "Interface/AddValueAccount";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAccount } from "Slices/addAccount";
import * as yup from "yup";
import Moment from "moment";
import Swal from "sweetalert2";
import { deleteAccount } from "Slices/deleteAccount";
import { editAccount } from "Slices/editAccount";
//npm install react-datepicker --save
//npm install --save @types/react-datepicker
// import { useDebounce } from "usehooks-ts";

const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  matKhau: yup.string().required("Mật khẩu không được để trống"),
  hoTen: yup.string().required("Họ tên không được để trống"),
  soDT: yup.string().required("Số điện thoại không được để trống"),
  maLoaiNguoiDung: yup.string().required("Loại tài khoản không được để trống"),
  email: yup.string().required("Email không được để trống"),
});
Moment.locale("en");
const ManagerAccount = () => {
  const [valueSearchListAccount, setValueSearchListAccountGV] =
    useState<string>(" ");
  const [isUpdateAccount, setisUpdateAccount] = useState(false);
  const { actionMenu } = useSelector((state: RootState) => state.actionMenu);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getListAccount());
  }, []);
  const { listAccount } = useSelector((state: RootState) => state.listAccount);

  const searchListAccount = () => {
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

  const resultSearchAccount = listAccount.filter((account) =>
    account.hoTen.toLocaleLowerCase().includes(valueSearchListAccount)
  );

  const listAccounts =
    resultSearchAccount.length > 0 ? resultSearchAccount : [];

  const [stylesAddAccountModal, setShowAddAccountModal] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<AddValueAccount>({
    defaultValues: {
      maNhom: "GP01",
    },
    mode: "onTouched",
    // cấu hình validation bằng yup schema
    resolver: yupResolver(schema),
  });
  const handleResetFormAccount = () => {
    resetField("taiKhoan");
    resetField("matKhau");
    resetField("hoTen");
    resetField("soDT");
    resetField("email");
  };
  const onSubmit = (values: any) => {
    if (isUpdateAccount) {
      try {
        dispatch(editAccount(values));
        setisUpdateAccount(false);
        handleResetFormAccount();
        setShowAddAccountModal(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log(values);
        dispatch(addAccount(values));
        handleResetFormAccount();
        setShowAddAccountModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDeleteAccount = (taiKhoan: string) => {
    Swal.fire({
      title: "Chắc chắn muốn xóa khóa học này?",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: `thoát`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteAccount(taiKhoan));
      }
    });
  };
  const handleEditAccount = (Account: any) => {
    setShowAddAccountModal(true);
    setisUpdateAccount(true);
    setValue("taiKhoan", Account.taiKhoan);
    setValue("matKhau", Account.matKhau);
    setValue("hoTen", Account.hoTen);
    setValue("soDT", Account.soDt);
    setValue("email", Account.email);
    setValue("maLoaiNguoiDung", Account.maLoaiNguoiDung);
  };

  return (
    <>
      <div
        className={
          stylesAddAccountModal
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
                <b>Tài Khoản</b>
              </label>
              <input
                type="text"
                placeholder="Vui lòng điền tài khoản"
                {...register("taiKhoan")}
              />
              {errors.taiKhoan && (
                <span style={{ color: "red" }}>{errors.taiKhoan?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Mật Khẩu</b>
              </label>
              <input
                type="password"
                placeholder="Vui lòng điền mật khẩu"
                {...register("matKhau")}
              />
              {errors.matKhau && (
                <span style={{ color: "red" }}>{errors.matKhau?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Họ Tên</b>
              </label>
              <input
                type="text"
                placeholder="Vui lòng điền họ tên "
                {...register("hoTen")}
              />
              {errors.hoTen && (
                <span style={{ color: "red" }}>{errors.hoTen?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Số Điện Thoại</b>
              </label>
              <input
                type="text"
                placeholder="Vui lòng điền số điện thoại"
                {...register("soDT")}
              />
              {errors.soDT && (
                <span style={{ color: "red" }}>{errors.soDT?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Loại Tài Khoản</b>
              </label>
              <select {...register("maLoaiNguoiDung")}>
                <option value="GV">Giáo Vụ</option>
                <option value="HV">Học Viên</option>
              </select>
              {errors.maLoaiNguoiDung && (
                <span style={{ color: "red" }}>
                  {errors.maLoaiNguoiDung?.message}
                </span>
              )}
            </div>
            <div>
              <label>
                <b>Nhóm</b>
              </label>
              <select {...register("maNhom")}>
                <option value="GP01">GP01</option>
                <option value="GP02">GP02</option>
              </select>
              {errors.maNhom && (
                <span style={{ color: "red" }}>{errors.maNhom?.message}</span>
              )}
            </div>
            <div>
              <label>
                <b>Email</b>
              </label>
              <input
                type="email"
                placeholder="Vui lòng điền email"
                {...register("email")}
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email?.message}</span>
              )}
            </div>

            <div className={stylesAddModal["gr-btn"]}>
              <button
                type="button"
                onClick={() => {
                  setShowAddAccountModal(false);
                  handleResetFormAccount();
                }}
              >
                Thoát
              </button>
              <button type="button" onClick={handleResetFormAccount}>
                Xóa
              </button>
              <button className={isUpdateAccount ? "hide" : ""}>Thêm</button>
              <button
                className={isUpdateAccount ? "" : "hide"}
                onClick={() => setisUpdateAccount(true)}
              >
                Sửa
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className={styles["tableListUser"]}>
        <div className={styles["title"]}>
          <h2 className={styles["section--title"]}>Danh Sách Người Dùng</h2>
          <button
            onClick={() => setShowAddAccountModal(true)}
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
                <th  onClick={() => searchListAccount()}>
                  {/* <input
                      placeholder="Tìm tên..."
                      className={styles.inputSearch}
                      type="text"
                      onChange={handlSearchListAccount}
                      name=""
                      id=""
                    /> */}
                  Tìm kiếm
                </th>
                <th>Tài Khoản</th>
                <th style={{ width:90}}>Mật Khẩu</th>

                <th>Email</th>
                <th>SĐT</th>
                <th style={{ width:100}}>Cấp Bậc</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listAccounts.map((Account) => {
                return (
                  <tr key={Account.taiKhoan}>
                    <td>{Account.hoTen}</td>
                    <td>{Account.taiKhoan}</td>
                    <td>
                      <i
                      
                        onClick={() =>
                          Swal.fire(`Mật khẩu: ${Account.matKhau}`)
                        }
                        style={{ cursor: "pointer", width:80 }}
                        className="fa fa-eye-slash"
                      ></i>
                    </td>

                    <td>
                     
                      <i
                        onClick={() => Swal.fire(`Email: ${Account.email}`)}
                        style={{ cursor: "pointer" }}
                        className="fa fa-eye-slash"
                      ></i>
                    </td>
                    <td>
                     
                      <i
                        onClick={() => Swal.fire(`Email: ${Account.soDt}`)}
                        style={{ cursor: "pointer" }}
                        className="fa fa-eye-slash"
                      ></i>
                    </td>
                    {/* <td>{Account.soDt}</td> */}
                    <td className={styles["pending"]}>
                      {Account.tenLoaiNguoiDung}
                    </td>

                    <td>
                      <span>
                        <i
                          onClick={() => handleEditAccount(Account)}
                          className={`fa fa-edit ${styles.edit}`}
                        ></i>
                      </span>
                    </td>
                    <td>
                      <span>
                        <i
                          onClick={() => handleDeleteAccount(Account.taiKhoan)}
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

export default ManagerAccount;
