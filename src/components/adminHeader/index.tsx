import React, { FC, useState, useContext } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { IconLogo, IconLogout } from "assets";
import { NavLink } from "react-router-dom";
import { routes } from "constantes/routes";
import { AuthContext } from "context/auth";

export const AdminHeader: FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { logout } = useContext(AuthContext);
  const authStorage = localStorage.getItem("auth");

  const isAuth = authStorage ? JSON.parse(authStorage) : null;
  const userName = isAuth?.lusername || null;

  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header}>
        <div className={styles.header_leftBar}>
          <IconLogo />
        </div>
        <div className={styles.header__inner}>
          <div className={styles.header__left}>
            <div className={clsx(styles.nav, openMenu && styles.open)}>
              <NavLink
                to={routes.adminUsers}
                end
                className={({ isActive }) =>
                  clsx(
                    isActive ? styles.active : undefined,
                    "bold",
                    styles.nav__link
                  )
                }
              >
                Users
              </NavLink>
              <NavLink
                to={routes.adminAccounts}
                end
                className={({ isActive }) =>
                  clsx(
                    isActive ? styles.active : undefined,
                    "bold",
                    styles.nav__link
                  )
                }
              >
                Accounts
              </NavLink>
              <NavLink
                to={routes.adminJobs}
                end
                className={({ isActive }) =>
                  clsx(
                    isActive ? styles.active : undefined,
                    "bold",
                    styles.nav__link
                  )
                }
              >
                Jobs
              </NavLink>
              <div className={styles.nav__logout} onClick={logout}>
                <IconLogout className={styles.icon} />
                <span>logout</span>
              </div>
            </div>
          </div>
          <div className={styles.rightBar}>
            <div className={clsx("bold ellipsis", styles.rightBar__name)}>
              {userName}
            </div>
            <IconLogout className={styles.rightBar__logout} onClick={logout} />
            <div
              className={clsx(styles.burger, openMenu && styles.open)}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
