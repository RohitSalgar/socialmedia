import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { removeProfileData } from "../../redux/slices/profileSlice";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function Sidebar({ onClick }) {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(
    location.pathname.split("/").pop()
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveStep(location.pathname.split("/").pop());
  }, [location]);

  return (
    <div className={styles.sidebardiv}>
      <div className={styles.sidebarcontainer}>
        <div className={styles.logodiv}>
          <div className={styles.allmasterlogodiv}>
            {/* <img
							src={AllMastersAdminlogo}
							className={styles.allmasterimg}
							alt=""
						/> */}
            <h1 className={styles.allmastertxt}>AllMasters</h1>
          </div>
          {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onClick}
                        edge="start">
                        <ChevronLeftIcon />
                    </IconButton> */}
        </div>
        <div className={styles.listdiv}>
          <ul className={styles.slist}>
            <li
              className={activeStep === "users" ? styles.activesidebarstep : ""}
            >
              <Link
                to={"users"}
                className={`${styles.listitem} ${
                  activeStep === "users" ? styles.activesidebar : ""
                }`}
              >
                <PeopleOutlinedIcon />
                Users
              </Link>
            </li>
            <li
              className={activeStep === "pages" ? styles.activesidebarstep : ""}
            >
              <Link
                to={"pages"}
                className={`${styles.listitem} ${
                  activeStep === "pages" ? styles.activesidebar : ""
                }`}
              >
                <NewspaperOutlinedIcon />
                Comapany Pages
              </Link>
            </li>
            <li
              className={activeStep === "posts" ? styles.activesidebarstep : ""}
            >
              <Link
                to={"posts"}
                className={`${styles.listitem} ${
                  activeStep === "posts" ? styles.activesidebar : ""
                }`}
              >
                <MailOutlineIcon />
                Reported Posts
              </Link>
            </li>
            <li
              className={
                activeStep === "schedules" ? styles.activesidebarstep : ""
              }
            >
              <Link
                to={"schedules"}
                className={`${styles.listitem} ${
                  activeStep === "schedules" ? styles.activesidebar : ""
                }`}
              >
                <EventNoteIcon />
                Schedules
              </Link>
            </li>
            {/* <li
              className={activeStep === "advertisements" ? styles.activesidebarstep : ""}
            >
              <Link
                to={"advertisements"}
                className={`${styles.listitem} ${
                  activeStep === "advertisements" ? styles.activesidebar : ""
                }`}
              >
                <AddAPhotoIcon />
                Advertisement
              </Link>
            </li> */}
          </ul>
        </div>

        <div className={`${styles.listdiv} ${styles.listdived}`}>
          <ul
            className={`${styles.slist} ${styles.accountdiv} ${styles.accounteddiv}`}
          >
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(removeProfileData());
                localStorage.clear();
              }}
            >
              <LogoutIcon />
              Sign Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
