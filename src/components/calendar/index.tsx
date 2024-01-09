import React, { useState, FC, ReactNode } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import el from "date-fns/locale/ru";

import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

registerLocale("el", el);

type Props = {
  children?: ReactNode;
};

export const Calendar: FC<Props> = ({ children }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <div className="calendar">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
        locale="el"
      />
      {children}
    </div>
  );
};
