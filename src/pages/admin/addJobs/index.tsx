import React, { FC, useState, useEffect } from "react";
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
import { ENDPOINTS, client } from "api";
import { Accounts, RootAccounts } from "types/accounts";
import { useSnapshot } from "valtio";
import { addUserStore } from "store/addUser";
import { CheckedDialogs, DialogRoot, RootDialog } from "types/dialog";
import { DialogsModal } from "../components/dialogsModal";
import moment from "moment";

export const AdminAddJobs = () => {
  const [selectRole, setSelectRole] = useState<null | string>(null);
  const [selectPeriod, setSelectPeriod] = useState<null | string>(null);
  const [selectAccount, setSelectAccount] = useState<null | string>(null);
  const [modalResult, setModalResult] = useState(false);
  const [modalAccounts, setModalAccounts] = useState(false);
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [account, setAccount] = useState<Accounts>();
  const [dialogs, setDialogs] = useState<CheckedDialogs[]>([]);
  const [error, setError] = useState<"role" | "period" | "account" | null>(
    null
  );

  const createJobs = async () => {
    const dialog = dialogs.find((d) => d.checked);
    if (!selectRole) {
      setError("role");
      return;
    }
    if (!selectPeriod) {
      setError("period");
      return;
    }
    if (!dialog) {
      return;
    }
    if (!account) {
      setError("account");
      return;
    }
    try {
      const res = await client.post(ENDPOINTS.SHEDULER.CREATE_SYNC_JOB, {
        accountId: account?.id,
        cron: "0 0/10 * ? * *",
        deleteEnable: true,
        dialogWhiteList: [
          {
            dialogId: dialog.dialogId,
            dialogType: selectRole,
          },
        ],
        deleteLag: "P30D",
      });
      if (res.status == 200) {
        setModalResult(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const res = await client.get<RootAccounts>(
        `${ENDPOINTS.EXPORT.GET_ACCOUNTS}?page=0&size=500&_sort=username&_order=asc`
      );

      if (res.status === 200) {
        setAccounts(res.data.content);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDialogs = async (accountId: number) => {
    try {
      const res = await client.get<RootDialog>(
        `${ENDPOINTS.EXPORT.GET_DIALOGS}?accountId=${accountId}&page=0&size=400`
      );
      if (res.status === 200) {
        if (res.data.content.length) {
          setDialogs(
            res.data.content.map((i) => ({
              ...i,
              checked: false,
            }))
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSelectAccount = (username: string | null) => {
    const account = accounts.find((a) => a.username);
    if (account) {
      setAccount(account);
      getDialogs(account.id);
    }

    setSelectAccount(username);
  };

  const deleteDialog = (id: number) => {
    const newDialogs = dialogs.map((i) =>
      i.dialogId == id ? { ...i, checked: false } : i
    );
    setDialogs(newDialogs);
  };

  return (
    <div className="page">
      <ResultModal
        open={modalResult}
        onClose={() => setModalResult(false)}
        type="error"
      />
      <DialogsModal
        dialogs={dialogs}
        setDialogs={setDialogs}
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
                  selectItem={selectRole}
                  setSelectItem={(role) => {
                    setError(null);
                    setSelectRole(role);
                  }}
                  options={["Admin", "User"]}
                  error={error === "role"}
                />
              </div>
              <div className="field-wrap">
                <SelectComponent
                  selectItem={selectPeriod}
                  setSelectItem={(period) => {
                    setError(null);
                    setSelectPeriod(period);
                  }}
                  options={["Every 10 minutes"]}
                  error={error === "period"}
                  placeholder="Select Period"
                />
              </div>
              <p className="field__label">Apply to</p>
              <div className="field-wrap">
                <SelectComponent
                  selectItem={selectAccount}
                  setSelectItem={(account) => {
                    setError(null);
                    onSelectAccount(account);
                  }}
                  error={error === "account"}
                  options={accounts.map((a) => a.username)}
                  placeholder="Select TG Accounts"
                />
              </div>
            </div>
            <div>
              <p className="field__label">Access</p>
              <div className={styles.chip_wrap}>
                {dialogs
                  .filter((d) => d.checked)
                  .map((i) => (
                    <div className={styles.chip}>
                      <span className={styles.chip__name}>{i.name}</span>
                      <IconClose
                        className={styles.chip__icon}
                        onClick={() => deleteDialog(i.dialogId)}
                      />
                    </div>
                  ))}

                <div
                  className={clsx(styles.chip, styles.dark)}
                  onClick={() => setModalAccounts(true)}
                >
                  <span className={clsx(styles.chip__name, styles.white)}>
                    Add dialogs to apply
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
                <Button variant="primary" onClick={createJobs}>
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
