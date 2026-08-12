/**
 * Reusable Markdown renderer component for AI responses
 */
const renderInlineMarkdown = (text) => {
  if (!text) return text;
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-emerald-950">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

const FormattedMarkdown = ({ content }) => {
  if (!content) return null;

  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-2.5">
      {blocks.map((block, bIdx) => {
        const lines = block.split('\n').filter(Boolean);

        // Header check (### Header or ## Header)
        if (lines.length === 1 && /^#{1,4}\s+/.test(lines[0])) {
          const headerText = lines[0].replace(/^#{1,4}\s+/, '');
          return (
            <h4 key={bIdx} className="text-xs sm:text-sm font-extrabold text-emerald-900 mt-1 mb-0.5">
              {renderInlineMarkdown(headerText)}
            </h4>
          );
        }

        // Bulleted list check (* item, - item, • item)
        const isBulletList = lines.every(line => /^[\*\-\•]\s+/.test(line.trim()));
        if (isBulletList) {
          return (
            <ul key={bIdx} className="list-disc list-inside space-y-1 my-1 pl-1">
              {lines.map((line, lIdx) => {
                const text = line.replace(/^[\*\-\•]\s+/, '');
                return <li key={lIdx} className="leading-relaxed">{renderInlineMarkdown(text)}</li>;
              })}
            </ul>
          );
        }

        // Numbered list check (1. item, 2. item)
        const isNumberedList = lines.every(line => /^\d+[\.\)]\s+/.test(line.trim()));
        if (isNumberedList) {
          return (
            <ol key={bIdx} className="list-decimal list-inside space-y-1 my-1 pl-1">
              {lines.map((line, lIdx) => {
                const text = line.replace(/^\d+[\.\)]\s+/, '');
                return <li key={lIdx} className="leading-relaxed">{renderInlineMarkdown(text)}</li>;
              })}
            </ol>
          );
        }

        // Standard Paragraph block
        return (
          <p key={bIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => {
              if (/^[\*\-\•]\s+/.test(line.trim())) {
                const cleanText = line.replace(/^[\*\-\•]\s+/, '');
                return (
                  <span key={lIdx} className="block pl-3 my-0.5 relative">
                    <span className="absolute left-0 top-0 text-emerald-600">•</span>
                    {renderInlineMarkdown(cleanText)}
                  </span>
                );
              }
              return (
                <span key={lIdx}>
                  {lIdx > 0 && <br />}
                  {renderInlineMarkdown(line)}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};

export default FormattedMarkdown;
