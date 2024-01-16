import React, { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { IconLogo } from "../../assets";
import { UserMenu } from "components/userMenu";
import { ENDPOINTS, client } from "api";
import { RootAccounts, Accounts } from "types/accounts";
import { selectAccountStore } from "store/selectAccount";
import { useNavigate } from "react-router-dom";
import { routes } from "constantes/routes";

type Props = {};

export const SelectAccount: FC<Props> = () => {
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [loading, setLoading] = useState(true);
  const naigate = useNavigate();
  const authStorage = localStorage.getItem("auth");

  const isAuth = authStorage ? JSON.parse(authStorage) : null;

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    setLoading(true);
    try {
      const res = await client.get(
        `${ENDPOINTS.USERS.GET_LINKED_TELEGRAM_ACCOUNTS}?username=${
          isAuth ? isAuth.lusername : ""
        }&page=0&size=100`
      );
      if (res.status === 200) {
        setAccounts(res.data.content);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const onSelectAccount = (account: Accounts) => {
    selectAccountStore.account = account;
    naigate(`${routes.detailed}/${account.id}/${account.firstName}`);
  };

  return (
    <div className="page">
      <div className={clsx(styles.header)}>
        <div className="container">
          <div className={styles.header__inner}>
            <div className={styles.logo}>
              <IconLogo />
            </div>
            <UserMenu />
          </div>
        </div>
      </div>

      {/* <div className="container"> */}
      <div className={styles.main}>
        <p className={styles.title}>Linked Telegram accounts</p>
        <div className={styles.accounts}>
          {accounts.length ? (
            accounts.map((item) => (
              <div
                className={styles.box}
                key={item.id}
                onClick={() => onSelectAccount(item)}
              >
                <div className={styles.box_info}>
                  <h3 className={styles.box__name}>
                    {item?.firstName ? item.firstName : "-"}
                  </h3>
                  <p className={styles.box__phone}>
                    {item?.phone ? item.phone : "-"}
                  </p>
                  <p className={clsx(styles.box__mail)}>
                    {item?.lastName ? item.lastName : "-"}
                  </p>
                </div>
              </div>
            ))
          ) : !loading ? (
            <div className={styles.box_info}>You dont have Accounts</div>
          ) : null}

          {/* <div className={styles.box}>
            <div className={styles.box_info}>
              <h3 className={styles.box__name}>Артур П.</h3>
              <p className={styles.box__phone}>+7 913 611 7927</p>
              <p className={clsx(styles.box__mail)}>@TVOe34</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    // </div>
  );
};
