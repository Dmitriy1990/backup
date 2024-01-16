import React, { useState, FC } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Scrollbars } from "rc-scrollbars";
import { Avatar } from "components/avatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { routes } from "constantes/routes";
import {
  IconLogo,
  IconCalendar,
  IconBack,
  IconInfo,
  IconFile,
  IconMicro,
} from "../../assets";
import moment from "moment";
import { DialogRoot } from "types/dialog";

type Props = {
  dialog: DialogRoot | null;
  dialogs: DialogRoot[];
  userName: string | null;
  setDialog: (dialog: DialogRoot) => void;
  setStartDate: (d: Date | null) => void;
  mobHeader?: boolean;
};

export const LeftBar: FC<Props> = ({
  dialog,
  userName,
  setDialog,
  dialogs,
  setStartDate,
  mobHeader = true,
}) => {
  const navigate = useNavigate();
  return (
    <div className={clsx(styles.leftBar, !dialog && styles.open)}>
      {mobHeader && (
        <div className={clsx(styles.leftBar_mobHeader)}>
          <div className={styles.header__left} onClick={() => navigate(-1)}>
            <IconBack className={styles.back} />
            <h4 className={clsx(styles.name, "bold")}>
              {userName ? userName : "-"}
            </h4>
            <IconInfo className={styles.back} />
          </div>
        </div>
      )}
      <Scrollbars autoHeight autoHeightMax={"90vh"} autoHide universal={true}>
        <div className={styles.account_list}>
          {dialogs.map((item, id) => (
            <div
              className={clsx(
                styles.account__item,
                styles.bg,
                item.dialogId === dialog?.dialogId && styles.active
              )}
              key={item.dialogId}
              onClick={() => {
                setDialog(item);
                setStartDate(null);
              }}
            >
              <Avatar name={item?.name ? item.name : ""} />
              <div className={clsx(styles.account__detail, "ellipsis")}>
                <div className={styles.account__header}>
                  <h4 className={clsx(styles.account__name, "ellipsis")}>
                    {item?.name ? item.name : "-"}
                  </h4>
                  <span>
                    {item?.lastDate
                      ? moment(new Date(item.lastDate)).calendar(null, {
                          lastDay: `[yesterday]`,
                          sameDay: "HH:mm",
                          lastWeek: "D MMMM",
                          nextWeek: "dddd",
                          sameElse: "MM.DD.YYYY",
                        })
                      : "-:-"}
                  </span>
                </div>

                {/* <p
                        className={clsx(styles.account__text, "ellipsis grey")}
                      >
                        Не подскажу Не подскажу Не подскажу Не подскажуНе
                        подскажу
                      </p> */}
              </div>
            </div>
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};
