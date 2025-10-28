import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="h-screen flex flex-col bg-background-900">
      <Header />
      <div className='md:px-8  pt-8 mb-4 overflow-auto scrollbar-custom h-full'>
        <Outlet />
      </div>
    </div>
  );
}
