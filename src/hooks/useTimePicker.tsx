import { useState } from "react";

function useTimePicker() {
  const [clickHour, setClickHour] = useState<string>("00");
  const [clickMinute, setClickMinute] = useState<string>("00");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const handleHour = (e: string) => {
    setClickHour(e);
  };

  const handleMinute = (e: string) => {
    setClickMinute(e);
  };

  const hour: string[] = [];
  for (let i = 0; i < 24; i++) {
    const hourString = i <= 9 ? `0${i}` : i.toString();
    hour.push(hourString);
  }

  const minute: string[] = [];
  for (let i = 0; i < 60; i++) {
    const minuteString = i <= 9 ? `0${i}` : String(i);
    minute.push(minuteString);
  }

  return {
    hour,
    minute,
    handleHour,
    handleMinute,
    clickHour,
    clickMinute,
    selectedTime,
    setSelectedTime,
    date,
    setDate,
  };
}

export default useTimePicker;
