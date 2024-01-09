import React, { FC, useState, useEffect } from "react";
import styles from "styles/modules/admin.module.scss";
import clsx from "clsx";
import {
  IconInfo,
  IconDelete,
  IconUser,
  IconArrows,
  IconPlus,
  IconSee,
} from "assets";
import { routes } from "constantes/routes";
import { Link } from "react-router-dom";
import { AdminHeader } from "components/adminHeader";
import { ENDPOINTS, client } from "api";
import { RootAccounts, Accounts } from "types/accounts";

export const AdminAccounts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumbers] = useState(0);
  const [accounts, setAccounts] = useState<Accounts[]>([]);

  useEffect(() => {
    getAllAccounts();
  }, []);

  const getAllAccounts = async () => {
    setIsLoading(true);
    try {
      const res = await client.get<RootAccounts>(
        `${ENDPOINTS.EXPORT.GET_ACCOUNTS}?page=${pageNumber}&size=20`
      );
      console.log("accounts", res);
      if (res.status === 200) {
        setAccounts(res.data.content);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <AdminHeader />
      <div></div>
      <div className={styles.wrapper}>
        <div className={styles["table-wrap"]}>
          <div className={styles["table-header"]}>
            <h4 className={styles["table-header__title"]}>Accounts</h4>
            <Link
              to={routes.adminAddAccount}
              className={styles["table-header__add"]}
            >
              <span className="bold">Add Account</span>
              <IconPlus className={styles.icon__btn} />
            </Link>
          </div>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  <div className={styles.cell}>
                    Id <IconArrows className={styles.icon__sort} />
                  </div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>
                    User Name <IconArrows className={styles.icon__sort} />
                  </div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>
                    Phone Number <IconArrows className={styles.icon__sort} />
                  </div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>
                    Name <IconArrows className={styles.icon__sort} />
                  </div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>Access</div>
                </th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((item, id) => (
                <tr className={styles.tr}>
                  <td className={clsx(styles.td, styles.hide)}>{item.id}</td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order1,
                      styles.radius__topLeft
                    )}
                  >
                    {item?.lastName ? item.lastName : "-"}
                  </td>
                  <td className={clsx(styles.td, styles.order2)}>
                    {item?.phone ? item.phone : "-"}
                  </td>
                  <td className={clsx(styles.td, styles.order3)}>
                    {item?.firstName ? item.firstName : "-"}
                  </td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order5,
                      styles.radius__bottomLeft,
                      styles.radius__bottomRight
                    )}
                  >
                    <div className={styles.cell}>
                      1 User <IconInfo className={styles.icon__sort} />
                    </div>
                  </td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order4,
                      styles.radius__topRight
                    )}
                  >
                    <IconSee className={styles.icon__btn} />
                    <IconDelete className={styles.icon__btn} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
