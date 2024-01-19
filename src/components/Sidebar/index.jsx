import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ onClick }) {

    const location = useLocation();
    const [activeStep, setActiveStep] = useState(
        location.pathname.split("/").pop()
    );

    const navigate = useNavigate();

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
                            className={
                                activeStep === "country"
                                    ? styles.activesidebarstep
                                    : ""
                            }>
                            <Link
                                to={"country"}
                                className={`${styles.listitem} ${activeStep === "country"
                                    ? styles.activesidebar
                                    : ""
                                    }`}>
                                {/* <CountryIcon
											className={
												activeStep === "country"
													? styles.activeicon
													: styles.inActvieIcon
											}
										/> */}
                                Users
                            </Link>
                        </li>
                        <li
                            className={
                                activeStep === "country"
                                    ? styles.activesidebarstep
                                    : ""
                            }>
                            <Link
                                to={"country"}
                                className={`${styles.listitem} ${activeStep === "country"
                                    ? styles.activesidebar
                                    : ""
                                    }`}>
                                {/* <CountryIcon
											className={
												activeStep === "country"
													? styles.activeicon
													: styles.inActvieIcon
											}
										/> */}
                                Pages
                            </Link>
                            
                        </li>
                        <li
                            className={
                                activeStep === "country"
                                    ? styles.activesidebarstep
                                    : ""
                            }>
                            <Link
                                to={"country"}
                                className={`${styles.listitem} ${activeStep === "country"
                                    ? styles.activesidebar
                                    : ""
                                    }`}>
                                {/* <CountryIcon
											className={
												activeStep === "country"
													? styles.activeicon
													: styles.inActvieIcon
											}
										/> */}
                                Pages
                            </Link>
                            
                        </li>

                    </ul>
                </div>

                {/* <div
					className={`${styles.listdiv} ${
						ProfileRole !== 2 ? styles.listdived : styles.listdiveds
					}`}>
					<ul
						className={`${styles.slist} ${styles.accountdiv} ${styles.accounteddiv}`}>
						<li
							className={`${styles.forgot} ${styles.signout}`}
							style={{ cursor: "pointer" }}
							onClick={() => {
								if (isIdle && allMasterId) {
									mutate();
								}
							}}>
							Sign Out
							<Signout />
						</li>
					</ul>
				</div> */}
            </div>
        </div>
    );
}

export default Sidebar;
