import styles from "_Playground/SCSS/HomePage/OverView.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { useEffect } from "react";
import { getListCourse } from "Slices/showCourse";
import { getListAccount, logOut } from "Slices/auth";
import "react-datepicker/dist/react-datepicker.css";

import ManagerCourse from "./ManagerCourse";
import ManagerAccount from "./ManagerAccount";
//npm install react-datepicker --save
//npm install --save @types/react-datepicker
// import { useDebounce } from "usehooks-ts";

const OverView = () => {
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

  return (
    <>
      <section className={styles["main"]}>
        <div
          className={
            actionMenu
              ? `${styles.sidebar} ${styles.active}`
              : `${styles.sidebar}`
          }
        >
          <ul className={styles["sidebar--items"]}>
            <li>
              <a href="#" id={styles["active--link"]}>
                <span className={`${styles.icon} ${styles["icon-1"]}`}>
                  <i className="fa fa-th-large"></i>
                </span>
                <span className={styles["sidebar--item"]}>Tổng Quan</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span className={`${styles.icon} ${styles["icon-3"]}`}>
                  <i className="fa fa-chalkboard-teacher"></i>
                </span>
                <span
                  className={styles["sidebar--item"]}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Quản lý người dùng
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
                  Quản lý khóa học
                </span>
              </a>
            </li>
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
          <ManagerAccount />
          <ManagerCourse />
        </div>
      </section>
    </>
  );
};

export default OverView;
