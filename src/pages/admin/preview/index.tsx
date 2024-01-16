import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { IconLogo, IconBack, IconInfo } from "assets";
import { UserMenu } from "components/userMenu";
import { CalendarModal } from "components/calendarModal";
import useWindowSize from "hooks/useWindowSize";
import { ENDPOINTS, client } from "api";
import { DialogRoot } from "types/dialog";
import moment from "moment";
import { Message, MessageCollection } from "types/message";
import { Link, useParams } from "react-router-dom";
import { routes } from "constantes/routes";
import { Chat, LeftBar } from "components/chat";
import { AdminHeader } from "components/adminHeader";

export const AccountPreview: FC = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const size = useWindowSize();
  const [dialogs, setDialogs] = useState<DialogRoot[]>([]);
  const [dialog, setDialog] = useState<DialogRoot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dialogPage, setDilogPage] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesCollection, setMessagesCollection] =
    useState<MessageCollection | null>(null);
  const [loadAvailable, setLoadAvailable] = useState(true);
  const { id, userName } = useParams();

  useEffect(() => {
    if (id) {
      getDialogs(+id);
    }
  }, [id]);

  useEffect(() => {
    if (dialog) {
      getMessages(dialog.accountId, dialog.dialogId, dialog.dialogType);
    }
  }, [dialog]);

  const getDialogs = async (
    accountId: number,
    startDate: Date | string | null = "",
    page: number = 0
  ) => {
    setIsLoading(true);
    try {
      const res = await client.get(
        `${ENDPOINTS.EXPORT.GET_DIALOGS}?accountId=${accountId}&page=0&size=200`
      );

      if (res.status === 200) {
        if (res.data.content[0]) {
          setDialogs(res.data.content);
        }
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const getMessages = async (
    accountId: number,
    dialogId: number,
    dialogType: string,
    startDate: Date | string | null = ""
  ) => {
    setIsLoadingMessages(true);
    setDilogPage(0);
    try {
      const res = await client.get(
        `${ENDPOINTS.EXPORT.MESSAGES}?accountId=${accountId}&dialogId=${dialogId}&dialogType=${dialogType}&page=0&size=15&fromDate=${startDate}`
      );

      if (res.status === 200) {
        setMessages(res.data.content);
        let result: MessageCollection = {};
        res.data.content
          .sort(
            (a: any, b: any) =>
              new Date(a.messageDate).valueOf() -
              new Date(b.messageDate).valueOf()
          )
          .forEach((item: Message) => {
            const d = moment(item.messageDate).calendar(null, {
              lastDay: `[Yesterday]`,
              sameDay: `[Today]`,
              lastWeek: "D MMMM",
              nextWeek: "dddd",
              sameElse: "MM.DD.YYYY",
            });
            if (result[d]) {
              result[d].push(item);
            } else {
              result[d] = [item];
            }
          });
        setMessagesCollection(result);
        setLoadAvailable(true);
      }
      setIsLoadingMessages(false);
    } catch (e) {
      console.log(e);
      setIsLoadingMessages(false);
    }
  };

  const getMoreMessages = async () => {
    if (!dialog) return;
    setLoadAvailable(false);
    try {
      const res = await client.get(
        `${ENDPOINTS.EXPORT.MESSAGES}?accountId=${dialog.accountId}&dialogId=${
          dialog.dialogId
        }&dialogType=${dialog.dialogType}&page=${
          dialogPage + 1
        }&size=15&fromDate=${
          startDate ? moment(startDate).startOf("day").toISOString() : ""
        }`
        // `${
        //   ENDPOINTS.EXPORT.MESSAGES
        // }?accountId=6903303905&dialogId=286587557&dialogType=User&page=${
        //   dialogPage + 1
        // }&size=15&fromDate=${
        //   startDate ? moment(startDate).startOf("day").toISOString() : ""
        // }`
      );
      if (res.status === 200 && res.data.content.length) {
        setDilogPage(dialogPage + 1);
        setMessages([...messages, ...res.data.content]);
        let result: any = messagesCollection ?? {};
        res.data.content
          .sort(
            (a: any, b: any) =>
              new Date(a.messageDate).valueOf() -
              new Date(b.messageDate).valueOf()
          )
          .forEach((item: Message) => {
            const d = moment(item.messageDate).calendar(null, {
              lastDay: `[Yesterday]`,
              sameDay: `[Today]`,
              lastWeek: "D MMMM",
              nextWeek: "dddd",
              sameElse: "MM.DD.YYYY",
            });
            if (result[d]) {
              result[d].push(item);
            } else {
              result[d] = [item];
            }
          });
        setMessagesCollection({ ...messagesCollection, ...result });
        setLoadAvailable(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setNewDate = (startDate: Date | null) => {
    if (dialog) {
      getMessages(
        dialog?.accountId,
        dialog.dialogId,
        dialog.dialogType,
        moment(startDate).startOf("day").toISOString()
      );
    }
    setStartDate(startDate);
  };

  const getFile = async (id: number) => {
    try {
      const res = await client.get(`${ENDPOINTS.EXPORT.GET_MEDIA}?id=${id}`, {
        responseType: "blob",
      });
      if (res.status == 200) {
        const href = URL.createObjectURL(res.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="page">
      <CalendarModal
        startDate={startDate}
        setStartDate={setNewDate}
        setOpenCalendar={setOpenCalendar}
        openCalendar={openCalendar}
        minDate={dialog?.createDate}
        maxDate={dialog?.lastUpdateDate}
        // minDate={"2024-01-13T08:43:22.311408"}
        // maxDate={"2024-01-14T10:00:03.330512"}
      />
      {/* Left Bar */}

      <div className={styles.main}>
        <AdminHeader />

        <div className={styles.main__inner}>
          <LeftBar
            dialog={dialog}
            dialogs={dialogs}
            userName={userName || ""}
            setDialog={setDialog}
            setStartDate={setStartDate}
            mobHeader={true}
          />

          <Chat
            isLoadingMessages={isLoadingMessages}
            messagesCollection={messagesCollection}
            getMoreMessages={getMoreMessages}
            loadAvailable={loadAvailable}
            getFile={getFile}
            dialog={dialog}
            setDialog={setDialog}
            setOpenCalendar={setOpenCalendar}
          />
        </div>
      </div>
    </div>
  );
};
