import React from 'react';

/**
 * Parses basic markdown bold tags (**text**) into React strong elements.
 */
export const formatText = (text: string): React.ReactNode => {
  if (!text || typeof text !== 'string') return text;
  
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};
