import { Input } from '@/components/ui/input';
import { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const SearchInput = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('term') || '');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!value) {
      setSearchParams({});
      return;
    }

    const timeout = setTimeout(() => {
      setSearchParams({ term: value });

      if (location.pathname !== '/search') {
        navigate('/search', { replace: false, state: { term: value } });
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [value, location.pathname, navigate, setSearchParams]);

  useEffect(() => {
    const urlValue = searchParams.get('term') || '';
    if (urlValue !== value) setValue(urlValue);
  }, [searchParams]);

  return (
    <Input
      className="md:w-1/4 w-full"
      placeholder="Buscar filmes..."
      value={value}
      onChange={(e) => setValue(e.target.value)}

    />
  );
});
