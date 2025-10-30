import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface LinkItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export const LinkItem = ({ to, icon: Icon, label }: LinkItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        buttonVariants({
          variant: isActive ? 'default' : 'secondary',
        }),
        'flex items-center gap-2 transition-colors'
      )}
    >
      <Icon className="w-6 h-6" />
      <span className="md:flex hidden">{label}</span>
    </Link>
  );
};
