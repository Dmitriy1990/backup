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
import { ConfirmModal } from "../components/confirmModal";
import { Link } from "react-router-dom";

export const AdminAddAccounts = () => {
  const [selectItem, setSelectItem] = useState<null | string>(null);
  const [modalResult, setModalResult] = useState(false);
  const [modalAccounts, setModalAccounts] = useState(false);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

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
      <ConfirmModal open={false} onClose={() => {}} />
      <AdminHeader />
      <div></div>
      <div className={styles.wrapper}>
        <div className={styles["table-wrap"]}>
          <div className={styles["table-header"]}>
            <Link
              to={routes.adminAccounts}
              className={styles["table-header__add"]}
            >
              <IconBack />
              &nbsp; &nbsp;
              <h4 className={styles["table-header__title"]}>Add Accounts</h4>
            </Link>
          </div>
          <div className={styles.box}>
            <div className={styles.form}>
              <p className="field__label">General</p>
              <div className="field-wrap">
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="field field--outline"
                />
              </div>
              <p className={clsx("bold blue", styles.sendCode)}>Send Code</p>
              <div className="field-wrap">
                <input
                  type="tel"
                  placeholder="Verification code"
                  className="field field--outline"
                />
              </div>

              <div className="field-wrap">
                <input
                  type="password"
                  placeholder="Account password"
                  className="field field--outline"
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
                    Add users to read
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
