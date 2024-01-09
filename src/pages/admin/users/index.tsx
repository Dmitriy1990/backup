import React, { FC, useState, useEffect } from "react";
import styles from "styles/modules/admin.module.scss";
import clsx from "clsx";
import { IconInfo, IconDelete, IconUser, IconArrows, IconPlus } from "assets";
import { routes } from "constantes/routes";
import { AdminHeader } from "components/adminHeader";
import { Link } from "react-router-dom";
import { ENDPOINTS, client } from "api";
import { Content, RootUsers } from "types/users";

const responseUsers = {
  content: [
    {
      username: "tg_admin",
      enabled: true,
      groups: ["GROUP_ADMIN"],
    },
    {
      username: "test_user",
      enabled: true,
      groups: ["GROUP_ADMIN"],
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  size: 20,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  numberOfElements: 2,
  first: true,
  last: true,
  empty: false,
};

export const AdminUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumbers] = useState(0);
  const [users, setUsers] = useState<Content[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await client.get<RootUsers>(
        `${ENDPOINTS.USERS.USER_LIST}?page=${pageNumber}&size=20&_sort=username&_order=asc`
      );
      console.log("users", res);
      if (res.status === 200) {
        setUsers(res.data.content);
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
            <h4 className={styles["table-header__title"]}>Users</h4>
            <Link
              to={routes.adminAddUser}
              className={styles["table-header__add"]}
            >
              <span className="bold">Add User</span>
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
                    Roles <IconArrows className={styles.icon__sort} />
                  </div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>Access</div>
                </th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, id) => (
                <tr className={styles.tr} key={id}>
                  <td className={clsx(styles.td, styles.hide)}>1</td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order1,
                      styles.radius__topLeft
                    )}
                  >
                    {user?.username ? user?.username : "-"}
                  </td>
                  <td className={clsx(styles.td, styles.order2)}>Admin</td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order3,
                      styles.radius__bottomLeft,
                      styles.radius__bottomRight
                    )}
                  >
                    <div className={styles.cell}>
                      All TG accounts <IconInfo className={styles.icon__sort} />
                    </div>
                  </td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order4,
                      styles.radius__topRight
                    )}
                  >
                    <IconUser className={styles.icon__btn} />
                    <IconDelete className={styles.icon__btn} />
                  </td>
                </tr>
              ))}
              <tr className={styles.tr}>
                <td className={clsx(styles.td, styles.hide)}>1</td>
                <td
                  className={clsx(
                    styles.td,
                    styles.order1,
                    styles.radius__topLeft
                  )}
                >
                  ывпывпывпывп
                </td>
                <td className={clsx(styles.td, styles.order2)}>Admin</td>
                <td
                  className={clsx(
                    styles.td,
                    styles.order3,
                    styles.radius__bottomLeft,
                    styles.radius__bottomRight
                  )}
                >
                  <div className={styles.cell}>
                    All TG accounts <IconInfo className={styles.icon__sort} />
                  </div>
                </td>
                <td
                  className={clsx(
                    styles.td,
                    styles.order4,
                    styles.radius__topRight
                  )}
                >
                  <IconUser className={styles.icon__btn} />
                  <IconDelete className={styles.icon__btn} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
