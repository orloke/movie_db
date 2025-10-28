import { useParams } from 'react-router-dom';

export function Movie() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1>Detalhes do Filme</h1>
      <p>ID do filme: {id}</p>
    </div>
  );
}
