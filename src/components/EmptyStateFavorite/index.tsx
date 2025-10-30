import logo from '@/assets/movie.svg';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { buttonVariants } from '../ui/button';

export function EmptyStateFavorite() {
  return (
    <div className="flex flex-col justify-center items-center h-full text-gray-400 gap-4 -mt-8">
      <img src={logo} alt="logo" className="h-20 w-20" />
      <p className="font-bold">Nenhum filme favorito ainda</p>
      <p>Comece explorando filmes populares e adicione seus favoritos!</p>
      <Link
        className={cn(
          buttonVariants({ variant: 'default' }),
          'py-3 h-auto mt-4',
        )}
        to="/"
      >
        Explorar Filmes
      </Link>
    </div>
  );
}
