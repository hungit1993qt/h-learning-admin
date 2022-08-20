import styles from "_Playground/SCSS/HomePage/OverView.module.scss";

type Props = {};

const OverView = (props: Props) => {
  return (
    <section className={styles["main"]}>
      <div className={`${styles.sidebar} `}>
        {/* ${styles.active} */}
        <ul className={styles["sidebar--items"]}>
          <li>
            <a href="#" id={styles["active--link"]}>
              <span className={`${styles.icon} ${styles["icon-1"]}`}>
                <i className="fa fa-th-large"></i>
              </span>
              <span className={styles["sidebar--item"]}>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className={`${styles.icon} ${styles["icon-2"]}`}>
                <i className="fa fa-calendar-alt"></i>
              </span>
              <span className={styles["sidebar--item"]}>Schedule</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className={`${styles.icon} ${styles["icon-3"]}`}>
                <i className="fa fa-user"></i>
              </span>
              <span
                className={styles["sidebar--item"]}
                style={{ whiteSpace: "nowrap" }}
              >
                Reliable Doctor
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className={`${styles.icon} ${styles["icon-4"]}`}>
                <i className="fa fa-user-alt"></i>
              </span>
              <span className={styles["sidebar--item"]}>Patients</span>
            </a>
          </li>
          <li>
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
          </li>
        </ul>
        <ul className={styles["sidebar--bottom-items"]}>
          <li>
            <a href="#">
              <span className={`${styles.icon} ${styles["icon-7"]}`}>
                <i className="fa fa-cogs"></i>
              </span>
              <span className={styles["sidebar--item"]}>Settings</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className={`${styles.icon} ${styles["icon-8"]}`}>
                <i className="fa fa-sign-out-alt"></i>
              </span>
              <span className={styles["sidebar--item"]}>Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div className={styles["main--content"]}>
        <div className={styles["overview"]}>
          <div className={styles["title"]}>
            <h2 className={styles["section--title"]}>Overview</h2>
            <select name="date" id="date" className={styles["dropdown"]}>
              <option value="today">Today</option>
              <option value="lastweek">Last Week</option>
              <option value="lastmonth">Last Month</option>
              <option value="lastyear">Last Year</option>
              <option value="alltime">All Time</option>
            </select>
          </div>
          <div className={styles["cards"]}>
            <div className={`${styles.card} ${styles[`card-1`]} `}>
              <div className={styles["card--data"]}>
                <div className={styles["card--content"]}>
                  <h5 className={styles["card--title"]}>Total Doctors</h5>
                  <h1>152</h1>
                </div>
                <i className={`fa fa-user ${styles[`card--icon--lg`]}`} />
              </div>
              <div className={styles["card--stats"]}>
                <span>
                  <i className="ri-bar-chart-fill card--icon stat--icon" />
                  65%
                </span>
                <span>
                  <i className="ri-arrow-up-s-fill card--icon up--arrow" />
                  10
                </span>
                <span>
                  <i className="ri-arrow-down-s-fill card--icon down--arrow" />2
                </span>
              </div>
            </div>
            <div className={`${styles.card} ${styles[`card-2`]} `}>
              <div className={styles["card--data"]}>
                <div className={styles["card--content"]}>
                  <h5 className={styles["card--title"]}>Total Patients</h5>
                  <h1>1145</h1>
                </div>
                <i className={`fa fa-user-alt ${styles[`card--icon--lg`]}`} />
              </div>
              <div className={styles["card--stats"]}>
                <span>
                  <i className="ri-bar-chart-fill card--icon stat--icon" />
                  82%
                </span>
                <span>
                  <i className="ri-arrow-up-s-fill card--icon up--arrow" />
                  230
                </span>
                <span>
                  <i className="ri-arrow-down-s-fill card--icon down--arrow" />
                  45
                </span>
              </div>
            </div>
            <div className={`${styles.card} ${styles[`card-3`]} `}>
              <div className={styles["card--data"]}>
                <div className={styles["card--content"]}>
                  <h5 className={styles["card--title"]}>Schedule</h5>
                  <h1>102</h1>
                </div>
                <i
                  className={`fa fa-calendar-alt ${styles[`card--icon--lg`]}`}
                />
              </div>
              <div className={styles["card--stats"]}>
                <span>
                  <i className="ri-bar-chart-fill card--icon stat--icon" />
                  27%
                </span>
                <span>
                  <i className="ri-arrow-up-s-fill card--icon up--arrow" />
                  31
                </span>
                <span>
                  <i className="ri-arrow-down-s-fill card--icon down--arrow" />
                  23
                </span>
              </div>
            </div>
            <div className={`${styles.card} ${styles[`card-4`]} `}>
              <div className={styles["card--data"]}>
                <div className={styles["card--content"]}>
                  <h5 className={styles["card--title"]}>Beds Available</h5>
                  <h1>15</h1>
                </div>
                <i className={`fa fa-chart-line ${styles[`card--icon--lg`]}`} />
              </div>
              <div className={styles["card--stats"]}>
                <span>
                  <i className="ri-bar-chart-fill card--icon stat--icon" />
                  8%
                </span>
                <span>
                  <i className="ri-arrow-up-s-fill card--icon up--arrow" />
                  11
                </span>
                <span>
                  <i className="ri-arrow-down-s-fill card--icon down--arrow" />2
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["doctors"]}>
          <div className={styles["title"]}>
            <h2 className={styles["section--title"]}>Doctors</h2>
            <div className={styles["doctors--right--btns"]}>
              <select name="date" id="date" className="dropdown doctor--filter">
                <option>Filter</option>
                <option value="free">Free</option>
                <option value="scheduled">Scheduled</option>
              </select>
              <button className={styles["add"]}>
                <i className="ri-add-line" />
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
        </div>
        <div className={styles["recent--patients"]}>
          <div className={styles["title"]}>
            <h2 className={styles["section--title"]}>Recent Patients</h2>
            <button className={styles["add"]}>
              <i className="ri-add-line" />
              Add Doctor
            </button>
          </div>
          <div className={styles["table"]}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date in</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cameron Williamson</td>
                  <td>30/07/2022</td>
                  <td>Male</td>
                  <td>61kg</td>
                  <td className={styles["pending"]}>pending</td>
                  <td>
                    <span>
                      <i className="ri-edit-line edit" />
                      <i className="ri-delete-bin-line delete" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>George Washington</td>
                  <td>30/07/2022</td>
                  <td>Male</td>
                  <td>54kg</td>
                  <td className={styles["confirmed"]}>Confirmed</td>
                  <td>
                    <span>
                      <i className="ri-edit-line edit" />
                      <i className="ri-delete-bin-line delete" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>John Adams</td>
                  <td>29/07/2022</td>
                  <td>Male</td>
                  <td>56kg</td>
                  <td className={styles["confirmed"]}>Confirmed</td>
                  <td>
                    <span>
                      <i className="ri-edit-line edit" />
                      <i className="ri-delete-bin-line delete" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Thomas Jefferson</td>
                  <td>29/07/2022</td>
                  <td>Male</td>
                  <td>11kg</td>
                  <td className={styles["rejected"]}>Rejected</td>
                  <td>
                    <span>
                      <i className="ri-edit-line edit" />
                      <i className="ri-delete-bin-line delete" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>James Madison</td>
                  <td>29/07/2022</td>
                  <td>Male</td>
                  <td>69kg</td>
                  <td className={styles["confirmed"]}>Confirmed</td>
                  <td>
                    <span>
                      <i className="ri-edit-line edit" />
                      <i className="ri-delete-bin-line delete" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Andrew Jackson</td>
                  <td>28/07/2022</td>
                  <td>Male</td>
                  <td>88kg</td>
                  <td className={styles["confirmed"]}>Confirmed</td>
                  <td>
                    <span>
                      <i className="ri-edit-line edit" />
                      <i className="ri-delete-bin-line delete" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverView;
