import { useEffect, useState } from 'react'

interface ReturnDate {
    hour: string;
    minute: string;
    second: string;
    day: string;
}

const useDate = () : ReturnDate => {
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
        setDate(new Date());
    }, 1000);

  return () => {
      clearInterval(timer);
  };

  }, []);

  const hour = `${today.getHours()}`;
  const minute = `${today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()}`;
  const second = `${today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds()}`;
  const day = `${today.toLocaleDateString('en', {weekday: 'long'})}`;

  return {
    hour,
    minute,
    second,
    day
  }

}

export default useDate