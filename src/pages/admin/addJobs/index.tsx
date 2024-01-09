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
import { Switch } from "components/switch";
import { Link } from "react-router-dom";

export const AdminAddJobs = () => {
  const [selectItem, setSelectItem] = useState<null | string>(null);
  const [modalResult, setModalResult] = useState(false);
  const [modalAccounts, setModalAccounts] = useState(false);

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
            <Link to={routes.adminJobs} className={styles["table-header__add"]}>
              <IconBack />
              &nbsp; &nbsp;
              <h4 className={styles["table-header__title"]}>Add Jobs</h4>
            </Link>
          </div>
          <div className={styles.box}>
            <div className={styles.form}>
              <p className="field__label">General</p>
              <div className="field-wrap">
                <SelectComponent
                  selectItem={selectItem}
                  setSelectItem={setSelectItem}
                  options={["Admin", "User"]}
                />
              </div>
              <div className="field-wrap">
                <SelectComponent
                  selectItem={selectItem}
                  setSelectItem={setSelectItem}
                  options={["Admin", "User"]}
                />
              </div>
              <p className="field__label">Apply to</p>
              <div className="field-wrap">
                <SelectComponent
                  selectItem={selectItem}
                  setSelectItem={setSelectItem}
                  options={["Admin", "User"]}
                />
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
              <p className="field__label">Access</p>
              <div className={clsx(styles.switch, styles.switch__margin)}>
                <Switch /> &nbsp;&nbsp;<span> Enabled</span>
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
