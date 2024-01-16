import React, { FC } from "react";
import styles from "./style.module.scss";
import { Calendar } from "components/calendar";
import { IconBack } from "assets";
import { Modal } from "components/modal";
import { useSnapshot } from "valtio";

type Props = {
  setOpenCalendar: (v: boolean) => void;
  openCalendar: boolean;
  startDate: Date | null;
  setStartDate: (v: Date | null) => void;
  minDate?: string;
  maxDate?: string;
};

export const CalendarModal: FC<Props> = ({
  setOpenCalendar,
  openCalendar,
  startDate,
  setStartDate,
  minDate,
  maxDate,
}) => {
  const onClose = () => setOpenCalendar(false);
  // const snap = useSnapshot(selectAccountStore);

  return (
    <Modal
      open={openCalendar}
      onClose={onClose}
      className={styles.calendar_modal}
    >
      <div>
        <div className={styles.calendar__header}>
          <div className={styles.back}>
            <IconBack className={styles.back__icon} onClick={onClose} />
            <div className={styles.back__title}>Календарь</div>
          </div>
        </div>
        <div className={styles.calendar__inner}>
          <Calendar
            startDate={startDate}
            setStartDate={setStartDate}
            minDate={minDate}
            maxDate={maxDate}
          >
            <div className={styles.calendar__close} onClick={onClose}>
              Close
            </div>
          </Calendar>
        </div>
      </div>
    </Modal>
  );
};
