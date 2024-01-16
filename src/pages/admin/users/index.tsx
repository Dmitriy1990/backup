import React, { FC, useState, useEffect } from "react";
import styles from "styles/modules/admin.module.scss";
import clsx from "clsx";
import { IconInfo, IconDelete, IconUser, IconArrows, IconPlus } from "assets";
import { routes } from "constantes/routes";
import { AdminHeader } from "components/adminHeader";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS, client } from "api";
import { Content, RootUsers } from "types/users";
import Pagination from "components/pagination";
import { Switch } from "components/switch";

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
  const [isLoadState, setIsLoadState] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [users, setUsers] = useState<Content[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers(pageNumber);
  }, [pageNumber]);

  const getAllUsers = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const res = await client.get<RootUsers>(
        `${ENDPOINTS.USERS.USER_LIST}?page=${pageNumber}&size=10`
      );
      if (res.status === 200) {
        setTotalPages(res.data.totalPages);
        setUsers(res.data.content);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const switchUserStatus = async (user: string, enable: boolean) => {
    try {
      setIsLoadState(true);
      const res = await client.post(ENDPOINTS.USERS.ENABLE_DISABLE_USER, {
        user,
        enable,
      });
      if (res.status == 200) {
        const key = users.findIndex((u) => u.username == user);
        if (key !== -1) {
          setUsers([
            ...users.slice(0, key),
            { ...users[key], enabled: enable },
            ...users.slice(key + 1),
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadState(false);
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
                {/* <th className={styles.th}>
                  <div className={styles.cell}>
                    Id <IconArrows className={styles.icon__sort} />
                  </div>
                </th> */}
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
                <th className={styles.th}>Status</th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, id) => (
                <tr className={styles.tr} key={id}>
                  {/* <td className={clsx(styles.td, styles.hide)}>1</td> */}
                  <td
                    className={clsx(
                      styles.td,
                      styles.order1,
                      styles.radius__topLeft
                    )}
                  >
                    {user?.username ? user?.username : "-"}
                  </td>
                  <td className={clsx(styles.td, styles.order2)}>
                    {user?.groups[0]}
                  </td>
                  <td className={clsx(styles.td, styles.order3)}>
                    <div className={styles.cell}>
                      <GetAmountUsers user={user.username} />{" "}
                      <IconInfo className={styles.icon__sort} />
                    </div>
                  </td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order3,
                      styles.radius__bottomLeft,
                      styles.radius__bottomRight
                    )}
                  >
                    <div className={clsx(styles.cell, styles.cell_center)}>
                      <div className={styles.switch}>
                        <Switch
                          id={user.username + id}
                          checked={user.enabled}
                          onChange={() =>
                            switchUserStatus(user.username, !user.enabled)
                          }
                        />{" "}
                        <span className={styles.switch__label}>
                          {user.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order4,
                      styles.radius__topRight
                    )}
                  >
                    <IconUser
                      className={styles.icon__btn}
                      onClick={() =>
                        navigate(
                          routes.adminSelectAccount + "/" + user.username
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalCount={totalPages}
            pageSize={1}
            onPageChange={(page) => {
              setPageNumber(page - 1);
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const GetAmountUsers: FC<{ user: string }> = ({ user }) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (user) {
      getAccounts(user);
    }
  }, [user]);

  const getAccounts = async (user: string) => {
    try {
      const res = await client.get(
        `${ENDPOINTS.USERS.GET_LINKED_TELEGRAM_ACCOUNTS}?username=${user}&page=0&size=100`
      );
      if (res.status === 200) {
        setAmount(res.data.content.length);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <>{amount ?? "0"} Accounts</>;
};
