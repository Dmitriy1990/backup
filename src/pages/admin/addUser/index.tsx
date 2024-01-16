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
  IconEye,
} from "assets";
import { routes } from "constantes/routes";
import { AdminHeader } from "components/adminHeader";
import { SelectComponent } from "components/select";
import { Button } from "components/button";
import { ResultModal } from "../components/readingModal";
import { AccountsModal } from "../components/accountsModal";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS, client } from "api";
import { USER_ROLES } from "types/users";
import { Content, RootUsers } from "types/users";
import { useSnapshot } from "valtio";
import { addUserStore } from "store/addUser";
import { Switch } from "components/switch";
import { RootAccounts, Accounts, CheckedAccount } from "types/accounts";

export const AdminAddUser = () => {
  const [selectItem, setSelectItem] = useState<null | string>(null);
  const [modalResult, setModalResult] = useState(false);
  const [modalAccounts, setModalAccounts] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPasswors] = useState("");
  const [repeatPassword, setRepeatPasswors] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorselectItem, setErrorselectItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Content[]>([]);
  const { selectedAccounts } = useSnapshot(addUserStore);
  const [switchEnabled, setSwitchEnabled] = useState(true);
  const [resultModalType, setResultModalType] = useState<"error" | "success">(
    "success"
  );
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [isShowPass, setShowPass] = useState(false);
  const [isShowPassRepeat, setShowPassRepeat] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await client.get<RootAccounts>(
        `${ENDPOINTS.EXPORT.GET_ACCOUNTS}?page=0&size=200&_sort=username&_order=asc`
      );

      if (res.status === 200) {
        console.log("accounts", res.data);
        setAccounts(res.data.content);
        addUserStore.selectedAccounts = res.data.content.map((i) => ({
          ...i,
          checked: false,
        }));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async () => {
    try {
      const res = await client.post(ENDPOINTS.USERS.CREATE_USER, {
        userName,
        password,
        groups: [selectItem],
      });
      if (res.status == 200) {
        const myArray = selectedAccounts.filter((i) => i.checked);
        processArray(myArray);
        switchUserStatus(userName, switchEnabled);
        setResultModalType("success");
        setModalResult(true);
      }
    } catch (e) {
      console.log(e);
      setResultModalType("error");
      setModalResult(true);
    }
  };

  async function processArray(array: CheckedAccount[]) {
    for (const item of array) {
      await addLinkedUsers(userName, item.id);
    }
  }

  const switchUserStatus = async (user: string, enable: boolean) => {
    try {
      const res = await client.post(ENDPOINTS.USERS.ENABLE_DISABLE_USER, {
        user,
        enable,
      });
      if (res.status == 200) {
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const addLinkedUsers = async (
    username: string,
    telegramAccountId: number
  ) => {
    try {
      const res = client.post(ENDPOINTS.USERS.ADD_LINKED_TELEGRAM_ACCOUNT, {
        username,
        telegramAccountId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const isValidForm = () => {
    if (
      password !== repeatPassword ||
      password.length < 3 ||
      repeatPassword.length < 3
    ) {
      setErrorPassword(true);
      return;
    }
    if (userName.length < 2) {
      setErrorUserName(true);
      return;
    }
    if (!selectItem) {
      setErrorselectItem(true);
      return;
    }
    addUser();
  };

  const onRemoveUser = (id: number) => {
    const key = selectedAccounts.findIndex((u) => u.id == id);
    if (key !== -1) {
      (addUserStore.selectedAccounts as any) = [
        ...selectedAccounts.slice(0, key),
        {
          ...selectedAccounts[key],
          checked: !selectedAccounts[key].checked,
        },
        ...selectedAccounts.slice(key + 1),
      ];
    }
  };

  return (
    <div className="page">
      <ResultModal
        open={modalResult}
        onClose={() => {
          setModalResult(false);
          if (resultModalType == "success") {
            navigate(routes.adminUsers);
          }
        }}
        type={resultModalType}
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
                  autoComplete="new-password"
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
                  error={errorselectItem}
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
                  type={isShowPass ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Password"
                  className={clsx(
                    "field field--outline",
                    errorPassword && "error"
                  )}
                  value={password}
                  onChange={(e) => setPasswors(e.target.value)}
                />

                <span
                  className={"field__icon"}
                  onClick={() => setShowPass(!isShowPass)}
                >
                  {isShowPass ? <IconEye /> : <IconEyeSlash />}
                </span>
              </div>
              <div className="field-wrap">
                <input
                  type={isShowPassRepeat ? "text" : "password"}
                  placeholder="Repeat Password"
                  autoComplete="new-password"
                  className={clsx(
                    "field field--outline",
                    errorPassword && "error"
                  )}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPasswors(e.target.value)}
                />
                <span
                  className={"field__icon"}
                  onClick={() => setShowPassRepeat(!isShowPassRepeat)}
                >
                  {isShowPassRepeat ? <IconEye /> : <IconEyeSlash />}
                </span>
              </div>
            </div>
            <div>
              <p className="field__label">Access</p>
              <div className={styles.chip_wrap}>
                {selectedAccounts.length &&
                  selectedAccounts
                    .filter((i) => i.checked)
                    .map((u) => (
                      <div className={styles.chip} key={u.id}>
                        <span className={styles.chip__name}>{u.username}</span>
                        <IconClose
                          className={styles.chip__icon}
                          onClick={() => onRemoveUser(u.id)}
                        />
                      </div>
                    ))}

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
              <div className="">
                <p className="field__label">Access</p>
                <div className={styles.switch}>
                  <Switch
                    id={"AccessUsers346346346436"}
                    checked={switchEnabled}
                    onChange={() => setSwitchEnabled(!switchEnabled)}
                  />{" "}
                  &nbsp;&nbsp;
                  <span className={""}>
                    {switchEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.buttons}>
                <Button variant="primary" onClick={isValidForm}>
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(routes.adminUsers)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
