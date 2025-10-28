import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="h-screen flex flex-col bg-background-900">
      <Header />
      <Outlet />
    </div>
  );
}
