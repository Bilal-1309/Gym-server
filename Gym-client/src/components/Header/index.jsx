import React, { useEffect } from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import logo1 from "../../assets/logo-white.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/features/auth";
import { loadUsers } from "../../redux/features/profile";
import card from "../../assets/сфкв.png";
import Carousel from 'react-elastic-carousel'
import bg1 from '../../assets/bg9.jpg'
import bg2 from '../../assets/bg10.jpg'
import bg3 from '../../assets/bg11.jpg'
import bg4 from '../../assets/bg12.jpg'
import bg5 from '../../assets/bg13.jpg'
import bg6 from '../../assets/bg15.jpg'
import bg7 from '../../assets/bg17.jpg'
import bg8 from '../../assets/bg19.jpeg'

const Header = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const users = useSelector((state) => state.profileReducer.users);
  /* const loading = useSelector((state) => state.profileReducer.loading); */

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const admin = users.find((item) => (item ? item.role === "admin" : null));

  const handleClickLogut = () => {
    dispatch(logOut());
  };

  return (
    <>
      {admin ? (
        <div className={styles.header__bgImage}>
          <div className={styles.header__container}>
            <div className={styles.header__navbar}>
              <div>
                <img
                  className={styles.header__logo}
                  src={logo1}
                  alt=""
                  width={50}
                />
              </div>
              <div className={styles.header__navbar__text}>
                {!token ? null : id !== admin._id ? (
                  <NavLink className={styles.header__links} to={`user/${id}`}>
                    Мой профиль
                  </NavLink>
                ) : (
                  <NavLink className={styles.header__links} to={`admin/${id}`}>
                    Админ
                  </NavLink>
                )}
                <NavLink className={styles.header__links} to={"/shop"}>
                  Магазин
                </NavLink>
                <NavLink className={styles.header__links} to={"/trainers"}>
                  Тренеры
                </NavLink>
                <Link
                  className={styles.header__links}
                  to="subscription"
                  smooth={true}
                  duration={1000}
                >
                  Абонeменты
                </Link>
                {!token ? (
                  <NavLink className={styles.header__links} to={"/signin"}>
                    Вход
                  </NavLink>
                ) : (
                  <NavLink
                    className={styles.header__links}
                    to={"/"}
                    style={{ color: "red" }}
                    onClick={handleClickLogut}
                  >
                    Выход
                  </NavLink>
                )}
              </div>
            </div>

            <hr />

            <div className={styles.header__main}>
              <div className={styles.header__info}>
                <div className={styles.header__h1Div}>
                  <h1 className={styles.header__h1}>
                    Лучший фитнес зал в городе
                  </h1>
                </div>
                <p className={styles.header__p}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  scelerisque dolor Lorem ipsum dolor sit amet, consectetur adip{" "}
                </p>
                <img className={styles.header__imgInfo} src={card} alt="" />
              </div>
              <div className={styles.header__gallery}>
                <Carousel
                  itemsToShow={1}
                  autoPlaySpeed={3000}
                  enableAutoPlay={true}
                  tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                  transitionMs={700}
                  showArrows={false}
                  enableSwipe={true}
                  pagination={true}
                >
                  <img src={bg1} alt="" />
                  <img src={bg2} alt="" />
                  <img src={bg3} alt="" />
                  <img src={bg4} alt="" />
                  <img src={bg5} alt="" />
                  <img src={bg6} alt="" />
                  <img src={bg7} alt="" />
                  <img src={bg8} alt="" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Header;
