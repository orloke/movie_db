import logo from '@/public/movie.svg';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { buttonVariants } from '../ui/button';

interface EmptyStateFavoriteProps {
  title: string;
  label: string;
  labelButton: string;
  href: string;
}

export const EmptyStateFavorite = ({ title, label, labelButton, href }: EmptyStateFavoriteProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-gray-400 gap-4 -mt-8">
      <img src={logo} alt="logo" className="h-20 w-20" />
      <p className="font-bold">{title}</p>
      <p>{label}</p>
      <Link
        className={cn(
          buttonVariants({ variant: 'default' }),
          'py-3 h-auto mt-4',
        )}
        to={href}
      >
        {labelButton}
      </Link>
    </div>
  );
}
