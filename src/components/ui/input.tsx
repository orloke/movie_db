import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border text-white border-gray-600 py-2 outline-none px-4 rounded-3xl bg-background-700 focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-primary focus-visible:ring-offset-0 focus-visible:outline-offset-0 focus-visible:border-primary',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
