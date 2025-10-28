import logo from '@/assets/movie.svg';
import { Heart, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SearchInput } from '../SearchInput';
import { buttonVariants } from '../ui/button';

export const Header = () => {
  return (
    <header className="md:p-8 p-4 pb-4 flex items-center border-b border-gray-600 justify-between gap-8">
      <div className="flex items-center gap-4">
        <img src={logo} alt="logo" className="min-h-10 min-w-10" />
        <h1 className="text-content-primary font-bold text-2xl md:flex hidden">
          MovieDB
        </h1>
      </div>
      <SearchInput />
      <div className="flex gap-4">
        <Link to="/" className={buttonVariants({ variant: 'default' })}>
          <Home className="w-6 h-6" />
          <span className='md:flex hidden'>Home</span>
        </Link>
        <Link to="/" className={buttonVariants({ variant: 'secondary' })}>
          <Heart className="w-6 h-6" />
          <span className='md:flex hidden'>Favoritos</span>
        </Link>
      </div>
    </header>
  );
};
