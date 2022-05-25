import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import { ScheduleProvider } from '../contexts/schedule-context';

export function AppProvider({ children }) {
  return (
    <MantineProvider withGlobalStyles theme={{ colorScheme: 'dark' }}>
      <NotificationsProvider>
        <ScheduleProvider>
          <Router>{children}</Router>
        </ScheduleProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}
