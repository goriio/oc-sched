import { Container, Group, Title } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <Container size="xs">
      <Group position="apart">
        <Title
          component={Link}
          to="/"
          sx={{ fontSize: '1.5rem', textDecoration: 'none' }}
        >
          Schedule
        </Title>
      </Group>
      <Outlet />
    </Container>
  );
}
