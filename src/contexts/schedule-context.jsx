import { createContext, useEffect, useState } from 'react';

export const ScheduleContext = createContext([]);

export function ScheduleProvider({ children }) {
  const [schedule, setSchedule] = useState(
    JSON.parse(localStorage.getItem('schedule')) || []
  );

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  return (
    <ScheduleContext.Provider value={{ schedule, setSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
}
