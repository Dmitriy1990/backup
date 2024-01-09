import React, { FC, useState } from "react";
import styles from "styles/modules/admin.module.scss";
import clsx from "clsx";
import {
  IconInfo,
  IconDelete,
  IconUser,
  IconArrows,
  IconPlus,
  IconBack,
  IconEyeSlash,
  IconClose,
} from "assets";
import { routes } from "constantes/routes";
import { AdminHeader } from "components/adminHeader";
import { SelectComponent } from "components/select";
import { Button } from "components/button";
import { ResultModal } from "../components/readingModal";
import { AccountsModal } from "../components/accountsModal";
import { Link } from "react-router-dom";
import { ENDPOINTS, client } from "api";
import { USER_ROLES } from "types/users";

export const AdminAddUser = () => {
  const [selectItem, setSelectItem] = useState<null | string>(null);
  const [modalResult, setModalResult] = useState(false);
  const [modalAccounts, setModalAccounts] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPasswors] = useState("");
  const [repeatPassword, setRepeatPasswors] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorUserName, setErrorUserName] = useState(true);
  const [errorselectItem, setErrorselectItem] = useState(true);

  const addUser = async () => {
    try {
      const res = await client.post(ENDPOINTS.USERS.CREATE_USER, {
        userName,
        password,
        groups: [selectItem],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const isValidForm = () => {
    if (password !== repeatPassword) {
      setErrorPassword(true);
    }
    if (userName.length < 2) {
      setErrorUserName(true);
    }
    if (!selectItem) {
      setErrorselectItem(true);
    }
    addUser();
  };

  return (
    <div className="page">
      <ResultModal
        open={modalResult}
        onClose={() => setModalResult(false)}
        type="error"
      />
      <AccountsModal
        open={modalAccounts}
        onClose={() => setModalAccounts(false)}
      />
      <AdminHeader />
      <div></div>
      <div className={styles.wrapper}>
        <div className={styles["table-wrap"]}>
          <div className={styles["table-header"]}>
            <Link
              to={routes.adminUsers}
              className={styles["table-header__add"]}
            >
              <IconBack />
              &nbsp; &nbsp;
              <h4 className={styles["table-header__title"]}>Add User</h4>
            </Link>
          </div>
          <div className={styles.box}>
            <div className={styles.form}>
              <p className="field__label">General</p>
              <div className="field-wrap">
                <input
                  type="text"
                  placeholder="User Name"
                  className={clsx(
                    "field field--outline",
                    errorUserName && "error"
                  )}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="field-wrap">
                <SelectComponent
                  selectItem={selectItem}
                  setSelectItem={(item) => {
                    setErrorselectItem(false);
                    setSelectItem(item);
                  }}
                  options={[USER_ROLES.GROUP_ADMIN, USER_ROLES.GROUP_USER]}
                />
              </div>
              <div className="field-wrap">
                <input
                  type="password"
                  placeholder="Password"
                  className={clsx(
                    "field field--outline",
                    errorPassword && "error"
                  )}
                  value={password}
                  onChange={(e) => setPasswors(e.target.value)}
                />

                <span className={"field__icon"}>
                  <IconEyeSlash />
                </span>
              </div>
              <div className="field-wrap">
                <input
                  type="password"
                  placeholder="Repeat Password"
                  className={clsx(
                    "field field--outline",
                    errorPassword && "error"
                  )}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPasswors(e.target.value)}
                />
                <span className={"field__icon"}>
                  <IconEyeSlash />
                </span>
              </div>
            </div>
            <div>
              <p className="field__label">Access</p>
              <div className={styles.chip_wrap}>
                <div className={styles.chip}>
                  <span className={styles.chip__name}>@aaaman777</span>
                  <IconClose className={styles.chip__icon} />
                </div>
                <div className={styles.chip}>
                  <span className={styles.chip__name}>@Mobman</span>
                  <IconClose className={styles.chip__icon} />
                </div>
                <div
                  className={clsx(styles.chip, styles.dark)}
                  onClick={() => setModalAccounts(true)}
                >
                  <span className={clsx(styles.chip__name, styles.white)}>
                    Add Reading account
                  </span>
                  <IconPlus className={clsx(styles.chip__icon, styles.white)} />
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.buttons}>
                <Button variant="primary" onClick={() => setModalResult(true)}>
                  Save
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
