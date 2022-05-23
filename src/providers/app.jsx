import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter as Router } from 'react-router-dom';

export function AppProvider({ children }) {
  return (
    <MantineProvider withGlobalStyles theme={{ colorScheme: 'dark' }}>
      <NotificationsProvider>
        <Router>{children}</Router>
      </NotificationsProvider>
    </MantineProvider>
  );
}
