export function PhotographyCollectionHeroTitle({
  title,
  id,
  className = "",
}: {
  title: string;
  id?: string;
  className?: string;
}) {
  return (
    <h1
      id={id}
      className={`photo-collection-shared-title portfolio-display-title ${className}`.trim()}
    >
      {title.split(" ").map((word, index, words) => (
        <span key={`${word}-${index}`}>
          <span className="photo-collection-shared-word">{word}</span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
