import { cn } from '@/lib/utils';
import { type ComponentProps, useState } from 'react';

type ImageProps = ComponentProps<'img'> & {
  errorText?: string;
};

export const Image = ({
  className,
  errorText = 'Imagem não disponível',
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          'w-full h-full flex items-center justify-center bg-gray-500 text-gray-100 text-sm',
          className,
        )}
      >
        {errorText}
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-600 rounded-md" />
      )}

      <img
        {...props}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  );
};
