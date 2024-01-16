import React, { useState, FC } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import {
  IconLogo,
  IconCalendar,
  IconBack,
  IconInfo,
  IconFile,
  IconMicro,
} from "../../assets";
import { Avatar } from "components/avatar";
import { UserMenu } from "components/userMenu";
import { Scrollbars } from "rc-scrollbars";
import { CalendarModal } from "components/calendarModal";
import useWindowSize from "hooks/useWindowSize";
import { useSnapshot } from "valtio";
import { selectAccountStore } from "store/selectAccount";
import { ENDPOINTS, client } from "api";
import { DialogRoot } from "types/dialog";
import moment from "moment";
import { MessageCollection } from "types/message";
import { Link, useParams } from "react-router-dom";
import { routes } from "constantes/routes";
import { ComponentFile, ImageFile } from "components/mediaMessage";
import InfiniteScroll from "react-infinite-scroller";

type Props = {
  isLoadingMessages: boolean;
  messagesCollection: MessageCollection | null;
  getMoreMessages: () => void;
  loadAvailable: boolean;
  getFile: (id: number) => void;
  dialog: DialogRoot | null;
  setDialog: (dialog: DialogRoot | null) => void;
  setOpenCalendar: (v: boolean) => void;
};

export const Chat: FC<Props> = ({
  isLoadingMessages,
  messagesCollection,
  getMoreMessages,
  loadAvailable,
  getFile,
  dialog,
  setDialog,
  setOpenCalendar,
}) => {
  const size = useWindowSize();

  return (
    <div className={styles.chat}>
      {/* dialog */}

      <div className={styles.chat_header}>
        <div className={styles.chat_header__left}>
          <IconBack className={styles.back} onClick={() => setDialog(null)} />
          <div>
            <div className={clsx(styles.chat_header__title, "bold")}>
              {dialog?.name ? dialog.name : ""}
            </div>
            {dialog?.lastUpdateDate && (
              <p className="grey">
                Backup created{" "}
                {dialog?.lastUpdateDate
                  ? moment(new Date(dialog.lastUpdateDate)).calendar(null, {
                      lastDay: `[yesterday]`,
                      sameDay: "HH:mm",
                      lastWeek: "D MMMM",
                      nextWeek: "dddd",
                      sameElse: "MM.DD.YYYY",
                    })
                  : "-:-"}
              </p>
            )}
          </div>
        </div>
        {dialog && (
          <div
            className={styles.chat_header__icon}
            onClick={() => setOpenCalendar(true)}
          >
            <IconCalendar />
          </div>
        )}
      </div>

      <div className={styles.messages}>
        <Scrollbars
          autoHeight
          autoHeightMax={size < 900 ? "85vh" : "76vh"}
          autoHide
          universal={true}
        >
          {!isLoadingMessages && messagesCollection && (
            <InfiniteScroll
              pageStart={0}
              loadMore={getMoreMessages}
              hasMore={loadAvailable}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
              useWindow={false}
            >
              {messagesCollection &&
                Object.keys(messagesCollection).map((key, id) => (
                  <div key={id}>
                    <div className={styles.messages__dateTitle}>{key}</div>
                    {messagesCollection[key].map((item, id) => (
                      <div
                        className={clsx(styles.account__item, styles.start)}
                        key={id}
                      >
                        <Avatar name={item?.from ? item.from : ""} />
                        <div className={styles.account__detail}>
                          <div className={styles.account__header}>
                            <h4 className={clsx(styles.account__name, "bold")}>
                              {item?.from ? item.from : "-"}
                            </h4>
                            <span>
                              {item?.messageDate
                                ? moment
                                    .utc(new Date(item.messageDate))
                                    .local()
                                    .format("HH:mm")
                                : "-:-"}
                            </span>
                          </div>

                          <p className={styles.account__text}>
                            {item?.text ? item.text : null}
                          </p>
                          {item.downloadable && (
                            <>
                              {item?.mediaType && item.mediaType === "photo" ? (
                                <ImageFile item={item} getFile={getFile} />
                              ) : (
                                <ComponentFile item={item} getFile={getFile} />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </InfiniteScroll>
          )}
        </Scrollbars>
      </div>
    </div>
  );
};
