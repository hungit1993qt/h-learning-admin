import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import styles from "_Playground/SCSS/Detail/DetailListCours.module.scss";
import { getDanhMucKhoaHoc } from "Slices/courseCatalog";
import { getKhoaHocTheoDanhMuc } from "Slices/listCourseByCatalog";
import { NavLink, useParams } from "react-router-dom";

const DetailListCours = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getDanhMucKhoaHoc());
  }, []);
  const { khoaHocTheoDanhMuc, isLoading, error } = useSelector(
    (state: RootState) => state.khoaHocTheoDanhMuc
  );
  console.log(khoaHocTheoDanhMuc);
  return (
    <section className={styles["detailListCourses"]}>
      <h1 className={styles["heading"]}>
        KHÓA <span> HỌC</span>
      </h1>
      
        {khoaHocTheoDanhMuc.map((khoahoctheodanhmuc) => {
          return (
            <div className={styles["blog-card"]}>
              <div className={styles["meta"]}>
                <div
                  className={styles["photo"]}
                  style={{
                    backgroundImage: `url(${khoahoctheodanhmuc.hinhAnh})`,
                  }}
                />
                <ul className={styles["details"]}>
                  <li className={styles["author"]}>
                    <a href="#">{khoahoctheodanhmuc.nguoiTao.hoTen}</a>
                  </li>
                  <li className={styles["date"]}>
                    {khoahoctheodanhmuc.ngayTao}
                  </li>
                  <li className={styles["tags"]}>
                    <ul>
                      <li>
                        <a href="#">Learn</a>
                      </li>
                      <li>
                        <a href="#">Code</a>
                      </li>
                      <li>
                        <a href="#">HTML</a>
                      </li>
                      <li>
                        <a href="#">CSS</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className={styles["description"]}>
                <h1>{khoahoctheodanhmuc.tenKhoaHoc}</h1>
                <h2>{khoahoctheodanhmuc.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h2>
                <p>{khoahoctheodanhmuc.moTa}</p>
                <p className={styles["read-more"]}>
                  <a href="#">Read More</a>
                </p>
              </div>
            </div>
          );
        })}
      
    </section>
  );
};

export default DetailListCours;
