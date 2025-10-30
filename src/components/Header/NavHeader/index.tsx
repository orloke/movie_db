import { Heart, Home } from 'lucide-react';
import { LinkItem } from './LinkItem';

export function NavHeader() {
  return (
    <div className="flex gap-4">
      <LinkItem to="/" icon={Home} label="Home" />
      <LinkItem to="/favorites" icon={Heart} label="Favoritos" />
    </div>
  );
}
