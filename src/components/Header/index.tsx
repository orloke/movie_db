import logo from '@/assets/movie.svg';
import { Link } from 'react-router-dom';
import { SearchInput } from '@/components/Header/SearchInput';
import { NavHeader } from './NavHeader';
import { memo } from 'react';

export const Header = memo(() => {
  return (
    <header className="md:p-8 p-4 max-w-640 mx-auto w-full pb-4 flex items-center border-b border-gray-600 justify-between gap-8">
      <Link to="/" className="flex items-center gap-4">
        <img src={logo} alt="logo" className="min-h-10 min-w-10" />
        <h1 className="text-content-primary font-bold text-2xl md:flex hidden">
          MovieDB
        </h1>
      </Link>
      <SearchInput />
      <NavHeader />
    </header>
  );
});
