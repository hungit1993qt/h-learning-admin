//tsrafce
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { ActionMenu } from "Slices/movie";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import styles from "_Playground/SCSS/HeaderHome/HeaderHome.module.scss";
type Props = {};

const HeaderHome = (props: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const actionMenu = () => {
    setShowMenu(!showMenu);
    showMenu ? dispatch(ActionMenu(true)) : dispatch(ActionMenu(false));
  };
  return (
    <>
      <section className={styles["header"]}>
        <div className={styles["logo"]}>
          <i
            onClick={actionMenu}
            className={`fa fa-bars ${styles.icon} ${styles["icon-0"]}`}
          />
          <h2 className={styles["title-Logo"]}>
            H-<span className={styles.span}>Learning</span>
          </h2>
        </div>
        <div className={styles["search--notification--profile"]}>
          <div className={styles["search"]}>
            <input type={styles["text"]} placeholder="Search Scdule.." />
            <button>
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className={styles["notification--profile"]}>
            <div className={`${styles.picon} ${styles.lock}`}>
              <i className="fa fa-lock"></i>
            </div>
            <div className={`${styles.picon} ${styles.bell}`}>
              <i className="fab fa-facebook-messenger"></i>
            </div>
            <div className={`${styles.picon} ${styles.chat}`}>
              <i className="fa fa-bell"></i>
            </div>
            <div className={`${styles.picon} ${styles.profile}`}>
              <img src="/images/profile.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderHome;
