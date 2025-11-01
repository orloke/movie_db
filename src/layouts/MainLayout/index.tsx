import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-background-900">
      <Header />
      <div className="pt-8 mb-4 w-full max-w-640 mx-auto overflow-auto scrollbar-custom h-full">
        <Outlet />
      </div>
    </div>
  );
}
