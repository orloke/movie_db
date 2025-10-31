interface HighlightTextProps {
  text: string;
  term: string;
}

export const HighlightText = ({ text, term }: HighlightTextProps) => {
  if (!term) return <>{text}</>;

  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedTerm})`, 'gi');

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-300 text-black rounded-sm px-1 w-fit">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
};
