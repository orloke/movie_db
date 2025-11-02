import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="h-full w-full justify-center flex  flex-col gap-8 items-center">
      <h1 className="text-white text-3xl">404 - Página não encontrada</h1>
      <Link
        className={cn(
          buttonVariants({ variant: 'default' }),
          'py-3 h-auto mt-4',
        )}
        to="/"
      >
        Home
      </Link>
    </div>
  );
};
