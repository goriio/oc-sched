import { useRoutes } from 'react-router-dom';
import { ScheduleForm } from '../components/ScheduleForm';
import { Home } from '../containers/Home';
import { MainLayout } from '../layouts/MainLayout';

export function AppRoutes() {
  const element = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/add', element: <ScheduleForm /> },
        { path: '/', element: <Home /> },
      ],
    },
  ]);

  return element;
}
