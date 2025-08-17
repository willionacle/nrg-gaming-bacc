import React from 'react';
import dayjs from 'dayjs';

interface DateFormatterProps {
  date: string | Date;
  formatString?: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({
  date,
  formatString = 'YYYY-MM-DD HH:mm:ss',
}) => {
  const formattedDate = dayjs(date).format(formatString);
  return <span>{formattedDate}</span>;
};

export default DateFormatter;
