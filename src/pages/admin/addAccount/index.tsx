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
import { ConfirmModal } from "../components/confirmModal";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS, client } from "api";
import { CreateSession } from "types/createAccount";
import { Content, RootUsers } from "types/users";
import { addUserStore } from "store/addUser";
import { UsersModal } from "../components/usersModal";

const pattern = /^[0-9]+$/;

export const AdminAddAccounts = () => {
  const [selectItem, setSelectItem] = useState<null | string>(null);
  const [modalResult, setModalResult] = useState(false);
  const [modalAccounts, setModalAccounts] = useState(false);
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const [isShowPass, setShowPass] = useState(false);
  const [resultModalType, setResultModalType] = useState<"error" | "success">(
    "success"
  );
  const [createdSession, setCreatedSession] = useState<null | CreateSession>(
    null
  );
  const [users, setUsers] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await client.get<RootUsers>(
        `${ENDPOINTS.USERS.USER_LIST}?page=0&size=600&_sort=username&_order=asc`
      );

      if (res.status === 200) {
        console.log("accounts", res.data);
        setUsers(res.data.content);
        addUserStore.selectedUsers = res.data.content.map((i) => ({
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

  // 1
  const createSession = async () => {
    if (!phone) {
      setErrorPhone(true);
      return;
    }
    try {
      const res = await client.post(ENDPOINTS.REGISTRATION.AUTH, {
        phone,
      });
      console.log("res", res.data);
      if (res.status == 200) {
        setCreatedSession(res.data);
      } else {
        setErrorPhone(true);
      }
    } catch (e) {
      setErrorPhone(true);
      console.log(e);
    }
  };

  // 1 Need code
  const createSessionCode = async () => {
    if (!phone || !createdSession?.session) {
      setErrorPhone(true);
      return;
    }
    try {
      const res = await client.post(ENDPOINTS.REGISTRATION.AUTH, {
        phone,
        session: createdSession?.session,
        code,
        phoneCodeHash: createdSession?.phoneCodeHash,
      });
      if (res.status == 200) {
        setCreatedSession(res.data);
        createSessionPassword();
      } else {
        setErrorPhone(true);
      }
    } catch (e) {
      setErrorPhone(true);
      console.log(e);
    }
  };

  // 1 Need password
  const createSessionPassword = async () => {
    if (!phone || !createdSession?.session) {
      setErrorPhone(true);
      return;
    }
    try {
      const res = await client.post(ENDPOINTS.REGISTRATION.AUTH, {
        phone,
        session: createdSession?.session,
        code,
        phoneCodeHash: createdSession?.phoneCodeHash,
        password,
      });
      if (res.status == 200) {
        setCreatedSession(res.data);
        checkSession();
      } else {
        setErrorPhone(true);
      }
    } catch (e) {
      setErrorPhone(true);
      console.log(e);
    }
  };

  // 2
  const authSession = async () => {
    if (!createdSession) return;
    if (!phone) {
      setErrorPhone(true);
      return;
    }
    if (!code) {
      setErrorCode(true);
      return;
    }
    if (password.length < 3) {
      setErrorPassword(true);
      return;
    }
    createSessionCode();
  };

  // 3
  const checkSession = async () => {
    if (!createdSession) {
      setErrorPhone(true);
      return;
    }
    try {
      const res = await client.post(ENDPOINTS.REGISTRATION.CHECK_SESSION, {
        session: createdSession.session,
      });
      if (res.status == 200) {
        createAccount();
      } else {
        setErrorPhone(true);
        setErrorCode(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 4
  const createAccount = async () => {
    if (!createdSession) return;
    try {
      const res = await client.post(ENDPOINTS.REGISTRATION.CREATE_ACCOUNT, {
        session: createdSession.session,
      });
      if (res.status == 200) {
        setResultModalType("success");
        setModalResult(true);
      } else {
        setResultModalType("error");
        setModalResult(true);
      }
    } catch (e) {
      setResultModalType("error");
      setModalResult(true);
      console.log(e);
    }
  };

  const onChangeNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    func: (v: string) => void
  ) => {
    const { value } = e.target;
    if (value.length > 20) return;
    if (value === "" || pattern.test(value)) {
      func(value);
    }
  };

  return (
    <div className="page">
      <ResultModal
        open={modalResult}
        onClose={() => {
          setModalResult(false);
          if (resultModalType == "success") {
            navigate(routes.adminAccounts);
          }
        }}
        type={resultModalType}
      />
      <UsersModal
        open={modalAccounts}
        onClose={() => setModalAccounts(false)}
      />
      {/* <ConfirmModal open={false} onClose={() => {}} /> */}
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
                  className={clsx(
                    "field field--outline",
                    errorPhone && "error"
                  )}
                  value={phone}
                  onChange={(e) => {
                    setErrorPhone(false);
                    onChangeNumber(e, setPhone);
                  }}
                />
              </div>
              <p
                className={clsx("bold blue", styles.sendCode)}
                onClick={createSession}
              >
                Send Code
              </p>
              <div className="field-wrap">
                <input
                  type="tel"
                  placeholder="Verification code"
                  className={clsx("field field--outline", errorCode && "error")}
                  value={code}
                  onChange={(e) => onChangeNumber(e, setCode)}
                />
              </div>

              <div className="field-wrap">
                <input
                  type={isShowPass ? "text" : "password"}
                  placeholder="Account password"
                  className={clsx(
                    "field field--outline",
                    errorPassword && "error"
                  )}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={"field__icon"}
                  onClick={() => setShowPass(!isShowPass)}
                >
                  {isShowPass ? <IconEye /> : <IconEyeSlash />}
                </span>
              </div>
            </div>
            <div>
              {/* <p className="field__label">Access</p>
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
              </div> */}
              <hr className={styles.hr} />
              <div className={styles.buttons}>
                <Button
                  variant="primary"
                  onClick={authSession}
                  disabled={!createdSession}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(routes.adminAccounts)}
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
