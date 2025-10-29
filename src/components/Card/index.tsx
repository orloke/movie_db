import { cn } from '@/lib/utils';
import { type ComponentProps } from 'react';
import { Badge as BadgeShadcn } from '../ui/badge';

interface RootProps extends ComponentProps<'div'>{
  onClick?: () => void;
  disabled?: boolean;
}

const Root = ({ children, ...props }: RootProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && props.onClick) {
      e.preventDefault();
      props.onClick();
    }
  };

  return (
    <div
      {...props}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={cn(
        'bg-background-500 w-full flex flex-col h-96 relative justify-end overflow-hidden outline-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary cursor-pointer hover:ring-primary ring-2 ring-transparent transition-all',
        props.className,
      )}
    >
      {children}
    </div>
  );
};

const Description = ({ children, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={cn(
        'bg-background-700 p-4 flex flex-col gap-2',
        props.className,
      )}
    >
      {children}
    </div>
  );
};

const Title = ({ children, ...props }: ComponentProps<'h2'>) => {
  return (
    <h2 {...props} className={cn('text-white font-bold', props.className)}>
      {children}
    </h2>
  );
};

const Badge = ({ children, ...props }: ComponentProps<'span'>) => {
  return (
    <BadgeShadcn
      {...props}
      className={cn(
        'bg-content-primary rounded-full px-2 py-1 text-xs font-bold w-fit',
        props.className,
      )}
    >
      {children}
    </BadgeShadcn>
  );
};

const Button = ({ children, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      className={cn(
        'bg-background-700 rounded-full p-2 w-fit cursor-pointer hover:scale-110 transition-all',
        props.className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (props.onClick) props.onClick(e);
      }}
    >
      {children}
    </button>
  );
};

export const Card = {
  CardRoot: Root,
  CardDescription: Description,
  CardTitle: Title,
  CardBadge: Badge,
  CardButton: Button,
};
