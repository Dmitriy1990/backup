import React, { FC, useState, useEffect } from "react";
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
import { CalendarModal } from "./components/calendarModal";
import useWindowSize from "hooks/useWindowSize";
import { useSnapshot } from "valtio";
import { selectAccountStore } from "store/selectAccount";
import { ENDPOINTS, client } from "api";
import { Accounts } from "types/accounts";
import { DialogRoot } from "types/dialog";
import moment from "moment";
import { Message } from "types/message";
import { Link, useParams } from "react-router-dom";
import { routes } from "constantes/routes";

export const Detailed: FC = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const size = useWindowSize();
  const { account } = useSnapshot(selectAccountStore);
  const [dialogs, setDialogs] = useState<DialogRoot[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // getDialogs(account?.id);
      getDialogs(+id);
    }
  }, [id]);

  const getDialogs = async (accountId: number) => {
    try {
      const res = await client.get(
        `${ENDPOINTS.EXPORT.GET_DIALOGS}?accountId=${accountId}&page=0&size=20`
      );

      if (res.status === 200) {
        setDialogs(res.data.content);
        if (res.data.content[0]) {
          getMessages(2200230478, 5000012909, "User");
        }
        getMessages(2200230478, 5000012909, "User");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMessages = async (
    accountId: number,
    dialogId: number,
    dialogType: string
  ) => {
    try {
      const res = await client.get(
        `${ENDPOINTS.EXPORT.MESSAGES}?accountId=${accountId}&dialogId=${dialogId}&dialogType=${dialogType}&page=0&size=20`
      );

      if (res.status === 200) {
        setMessages(res.data.content);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="page">
      <CalendarModal
        setOpenCalendar={setOpenCalendar}
        openCalendar={openCalendar}
      />
      {/* Left Bar */}

      <div className={styles.main}>
        <div className={styles.header_wrapper}>
          <div className={styles.header}>
            <div className={styles.leftBar_header}>
              <IconLogo />
            </div>
            <div className={styles.header__inner}>
              <Link to={routes.selectAccount} className={styles.header__left}>
                <IconBack className={styles.back} />
                <h4 className={clsx(styles.name, "bold")}>
                  {account ? account.firstName : "-"}
                </h4>
                <IconInfo className={styles.back} />
              </Link>
              <UserMenu />
            </div>
          </div>
        </div>
        <div className={styles.main__inner}>
          <div className={styles.leftBar}>
            <Scrollbars
              autoHeight
              autoHeightMax={"90vh"}
              autoHide
              universal={true}
            >
              <div className={styles.account_list}>
                {dialogs.map((item, id) => (
                  <div className={styles.account__item} key={id}>
                    <Avatar name={item?.name ? item.name : ""} />
                    <div className={clsx(styles.account__detail, "ellipsis")}>
                      <div className={styles.account__header}>
                        <h4 className={clsx(styles.account__name, "ellipsis")}>
                          {item?.name ? item.name : "-"}
                        </h4>
                        <span>
                          {item?.lastDate
                            ? moment
                                .utc(new Date(item.lastDate))
                                .local()
                                .format("HH:mm")
                            : "-:-"}
                        </span>
                      </div>

                      <p
                        className={clsx(styles.account__text, "ellipsis grey")}
                      >
                        Не подскажу Не подскажу Не подскажу Не подскажуНе
                        подскажу
                      </p>
                    </div>
                  </div>
                ))}
                {/* <div className={styles.account__item}>
                  <Avatar />
                  <div className={clsx(styles.account__detail, "ellipsis")}>
                    <div className={styles.account__header}>
                      <h4 className={clsx(styles.account__name, "ellipsis")}>
                        Артур П.Артур П.Артур П.Артур П.Артур П.Артур П.Артур
                        П.Артур П.
                      </h4>
                      <span>19:48</span>
                    </div>

                    <p className={clsx(styles.account__text, "ellipsis grey")}>
                      Не подскажу Не подскажу Не подскажу Не подскажуНе подскажу
                    </p>
                  </div>
                </div> */}
              </div>
            </Scrollbars>
          </div>
          <div className={styles.chat}>
            <div className={styles.chat_header}>
              <div className={styles.chat_header__left}>
                <IconBack className={styles.back} />
                <div>
                  <div className={clsx(styles.chat_header__title, "bold")}>
                    Mini Boss
                  </div>
                  <p className="grey">Backup created 5 minutes ago</p>
                </div>
              </div>
              <div
                className={styles.chat_header__icon}
                onClick={() => setOpenCalendar(true)}
              >
                <IconCalendar />
              </div>
            </div>

            <div className={styles.messages}>
              <Scrollbars
                autoHeight
                autoHeightMax={size < 900 ? "85vh" : "76vh"}
                autoHide
                universal={true}
              >
                <div className={styles.messages__dateTitle}>Today</div>

                {messages.map((item) => (
                  <div
                    className={clsx(styles.account__item, styles.start)}
                    key={item.id}
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
                        <div
                          className={clsx(styles.account__item, styles.file)}
                        >
                          <div className={clsx(styles.file__ava, styles.red)}>
                            <IconFile />
                          </div>
                          <div className={styles.account__detail}>
                            <div className={styles.account__header}>
                              <h4
                                className={clsx(styles.account__name, "bold")}
                              >
                                Парапам пам пам.dpf
                              </h4>
                            </div>
                            <p
                              className={clsx(
                                styles.account__text,
                                "ellipsis grey"
                              )}
                            >
                              1.5 MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className={clsx(styles.account__item, styles.start)}>
                  <Avatar />
                  <div className={styles.account__detail}>
                    <div className={styles.account__header}>
                      <h4 className={clsx(styles.account__name, "bold")}>
                        Артур П.
                      </h4>
                      <span>18:12</span>
                    </div>

                    <p className={styles.account__text}>Привет, что именно ?</p>
                    <div className={clsx(styles.account__item, styles.file)}>
                      <div className={clsx(styles.file__ava, styles.blue)}>
                        <IconMicro />
                      </div>
                      <div className={styles.account__detail}>
                        <div className={styles.account__header}>
                          <h4 className={clsx(styles.account__name, "bold")}>
                            Voice message
                          </h4>
                        </div>
                        <p
                          className={clsx(
                            styles.account__text,
                            "ellipsis grey"
                          )}
                        >
                          00:48
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {Array(100)
                  .fill(2)
                  .map((i, id) => (
                    <div
                      className={clsx(styles.account__item, styles.start)}
                      key={id}
                    >
                      <Avatar />
                      <div className={styles.account__detail}>
                        <div className={styles.account__header}>
                          <h4 className={clsx(styles.account__name, "bold")}>
                            Артур П.
                          </h4>
                          <span>18:12</span>
                        </div>

                        <p className={styles.account__text}>
                          Привет, что именно ?
                        </p>
                        <div
                          className={clsx(styles.account__item, styles.file)}
                        >
                          <div className={clsx(styles.file__ava, styles.blue)}>
                            <IconMicro />
                          </div>
                          <div className={styles.account__detail}>
                            <div className={styles.account__header}>
                              <h4
                                className={clsx(styles.account__name, "bold")}
                              >
                                Voice message
                              </h4>
                            </div>
                            <p
                              className={clsx(
                                styles.account__text,
                                "ellipsis grey"
                              )}
                            >
                              00:48
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Scrollbars>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
