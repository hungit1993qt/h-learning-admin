// Một số thư viện làm việc với form trong React: formik, react-final-form, react-hook-form
import styles from "_Playground/SCSS/Login/Login.module.scss";
import { useForm, FieldErrors } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginValue } from "Interface/loginValue";
import { login, logOut } from "Slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValue>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "onTouched",
  });
  const onSubmit = (values: LoginValue) => {
    dispatch(login(values));
  };
  const onError = (error: FieldErrors<LoginValue>) => {
    console.log(error);
  };
  const { admin } = useSelector((state: RootState) => state.auth);
  const getUserLocalStorage = JSON.parse(
    localStorage.getItem("adminLogin") as string
  );
  useEffect(() => {
    if (admin) {
      if (getUserLocalStorage) {
        if (getUserLocalStorage.maLoaiNguoiDung === "GV") {
          navigate("/quan-ly");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Tài khoản không đúng cấp",
            text: "Vui lòng đăng nhập đúng tài khoản",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(logOut());
        }
      }
    }
  }, [admin, getUserLocalStorage]);

  return (
    <section className={styles["login"]}>
      <div className={styles["content"]}>
        <h1 className={styles["heading"]}>
          ĐĂNG <span> NHẬP</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div>
            <label htmlFor="username">Tài Khoản</label>
            <input
              type="text"
              placeholder="Vui lòng nhập tài khoản!"
              {...register("taiKhoan", {
                required: {
                  value: true,
                  message: "Tài khoản không được để trống",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]{5,}$/,
                  message:
                    "Tài khoản bao gồm các kí tự hoa, thường, số và ít nhất 5 kí tự",
                },
              })}
              className={styles["box"]}
            />
          </div>
          <div>
            <label htmlFor="password">Mật Khẩu</label>
            <input
              type="text"
              placeholder="Vui lòng nhập mật khẩu!"
              {...register("matKhau", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                  message:
                    "Mật khẩu ít nhất một chữ cái, một số và ít nhất 8 kí tự",
                },
              })}
              className={styles["box"]}
            />
            {errors.taiKhoan && <span style={{ color: "red" }}>{errors.taiKhoan?.message}</span>}
            <br />
            {errors.matKhau && <span style={{ color: "red" }}>{errors.matKhau?.message}</span>}
          </div>
          <button className={styles["loginBtn"]}>
            Đăng Nhập
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
