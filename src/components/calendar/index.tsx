import React, { useState, FC, ReactNode } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import el from "date-fns/locale/ru";

import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

registerLocale("el", el);

type Props = {
  children?: ReactNode;
  startDate: Date | null;
  setStartDate: (v: Date | null) => void;
  minDate?: string;
  maxDate?: string;
};

export const Calendar: FC<Props> = ({
  children,
  startDate,
  setStartDate,
  minDate,
  maxDate,
}: Props) => {
  return (
    <div className="calendar">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
        locale="el"
        minDate={minDate ? new Date(minDate) : null}
        maxDate={maxDate ? new Date(maxDate) : null}
      />
      {children}
    </div>
  );
};
