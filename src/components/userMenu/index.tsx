import React from "react";
import styles from "./style.module.scss";
import { Avatar } from "components/avatar";
import { IconLogout } from "assets";
import { AuthContext } from "context/auth";

export const UserMenu = () => {
  const { logout } = React.useContext(AuthContext);
  const authStorage = localStorage.getItem("auth");

  const isAuth = authStorage ? JSON.parse(authStorage) : null;
  const userName = isAuth?.lusername || null;
  return (
    <div className={styles.menu}>
      {/* <div className={styles.menu__avatar}>
        <Avatar />
      </div> */}
      <p className={styles.menu__name}>{userName}</p>
      <div className={styles.menu__logout} onClick={logout}>
        <IconLogout />
      </div>
    </div>
  );
};
