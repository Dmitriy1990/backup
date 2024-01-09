import React, { useState, useEffect } from "react";
import styles from "styles/modules/auth.module.scss";
import { IconEyeSlash, IconEye, IconLogo } from "assets";
import { Button } from "components/button";
import { proxy, useSnapshot } from "valtio";
import { ENDPOINTS, client } from "api";

const store = proxy({
  photos: [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
  ],
});

export const Auth = () => {
  const snap = useSnapshot(store);

  const [isShowPass, setShowPass] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const createSession = async () => {
    try {
      const res = await client.post(ENDPOINTS.REGISTRATION.CREATE_SESSION);
      console.log("createSession", res);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.logo}>
          <IconLogo />
        </div>
        <h3 className={styles.title}>Authorization</h3>
        <form onSubmit={onSubmit} className={styles.form}>
          <input className={styles.field} type="text" placeholder="User Name" />
          <div className={styles["field-wrap"]}>
            <input
              className={styles.field}
              type={isShowPass ? "text" : "password"}
              placeholder="Password"
            />
            <span
              className={styles.field__icon}
              onClick={() => setShowPass(!isShowPass)}
            >
              {isShowPass ? <IconEye /> : <IconEyeSlash />}
            </span>
          </div>
          <Button
            className={styles.btn}
            variant="primary"
            fullwidth
            onClick={createSession}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
