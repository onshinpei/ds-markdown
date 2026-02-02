import React from 'react';
import Link from 'next/link';

interface TypeLinkProps {
  type: string;
  children?: React.ReactNode;
}

/**
 * Type Link Component
 * Used to create links to type definitions in API documentation
 */
export const TypeLink: React.FC<TypeLinkProps> = ({ type, children }) => {
  const href = `/api-reference/types#${type.toLowerCase()}`;
  const displayText = children || type;

  return (
    <Link 
      href={href}
      className="type-link"
    >
      {displayText}
    </Link>
  );
};

export default TypeLink;
