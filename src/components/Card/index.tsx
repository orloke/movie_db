import { cn } from '@/lib/utils';
import { type ComponentProps } from 'react';
import { Badge as BadgeShadcn } from '../ui/badge';

const Root = ({ children, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={cn(
        'bg-background-500 w-full flex flex-col h-96 relative rounded-2xl justify-end overflow-hidden',
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
