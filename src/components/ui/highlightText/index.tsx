interface HighlightTextProps {
  text: string;
  search: string;
}

export function HighlightText({ text, search }: HighlightTextProps) {
  if (!search) return <>{text}</>;

  const parts = text.split(new RegExp(`(${search})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === search.toLowerCase() ? (
          <span key={i} className="bg-yellow-100 px-1 rounded">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}