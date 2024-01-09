import React, { FC, useState } from "react";
import styles from "styles/modules/admin.module.scss";
import clsx from "clsx";
import {
  IconInfo,
  IconDelete,
  IconUser,
  IconArrows,
  IconPlus,
  IconSee,
  IconEdit,
  IconFilter,
} from "assets";
import { routes } from "constantes/routes";
import { AdminHeader } from "components/adminHeader";
import { Switch } from "components/switch";
import { Link } from "react-router-dom";

export const AdminJobs = () => {
  return (
    <div className="page">
      <AdminHeader />
      <div></div>
      <div className={styles.wrapper}>
        <div className={styles["table-wrap"]}>
          <div className={styles["table-header"]}>
            <div className={styles["table-header__add"]}>
              <h4 className={styles["table-header__title"]}>Jobs</h4>
              <IconFilter className={styles.icon__btn} />
            </div>
            <Link
              to={routes.adminAddJobs}
              className={styles["table-header__add"]}
            >
              <span className="bold">Add Jobs</span>
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
                    Type <IconArrows className={styles.icon__sort} />
                  </div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>Period</div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>Applied to</div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>Status</div>
                </th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td className={clsx(styles.td, styles.hide)}>1</td>
                <td
                  className={clsx(
                    styles.td,
                    styles.order1,
                    styles.radius__topLeft
                  )}
                >
                  Save
                </td>
                <td className={clsx(styles.td, styles.order2)}>Every 5 min</td>

                <td className={clsx(styles.td, styles.order5)}>
                  <div className={styles.cell}>
                    @Zemmerman / 3 Dialogs{" "}
                    <IconInfo className={styles.icon__sort} />
                  </div>
                </td>
                <td
                  className={clsx(
                    styles.td,
                    styles.order5,
                    styles.radius__bottomLeft,
                    styles.radius__bottomRight
                  )}
                >
                  <div className={styles.switch}>
                    <Switch />{" "}
                    <span className={styles.switch__label}>Disabled</span>
                  </div>
                </td>
                <td
                  className={clsx(
                    styles.td,
                    styles.order4,
                    styles.radius__topRight
                  )}
                >
                  <IconEdit className={styles.icon__btn} />
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
