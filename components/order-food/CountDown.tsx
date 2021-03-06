import React, { useState, useEffect, useMemo } from 'react';

interface Props {
  due: number;
}

function padZero(n: string, width: number) {
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

export function useCurrentTime() {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    setTime(Date.now());
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export const formatTimeLeft = (time: number | null, due: number) => {
  if (time === null) return '…';
  const difference = Math.floor((due - time) / 1000);
  if (difference < 0) return '00:00:00';
  const seconds = difference % 60;
  const minutes = Math.floor(difference / 60) % 60;
  const hours = Math.floor(difference / 3600) % 24;
  const days = Math.floor(difference / 86400);
  const parts = [
    ...(days > 0 ? [days] : []),
    padZero(`${hours}`, 2),
    padZero(`${minutes}`, 2),
    padZero(`${seconds}`, 2)
  ];
  return parts.join(':');
};

const Countdown: React.FC<Props> = ({ due }) => {
  const time = useCurrentTime();
  const timeLeft = useMemo(() => formatTimeLeft(time, due), [time, due]);

  return <>{timeLeft}</>;
};

export default Countdown;
