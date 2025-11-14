export const RichText = ({ content }: { content: string }) => (
  <div className="prose prose-slate max-w-none">
    {content.split('\n').map((paragraph, index) => (
      <p key={`paragraph-${index.toString()}`}>{paragraph}</p>
    ))}
  </div>
);

