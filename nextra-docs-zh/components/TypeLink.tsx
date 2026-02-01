import React from 'react';
import Link from 'next/link';

interface TypeLinkProps {
  type: string;
  children?: React.ReactNode;
}

/**
 * 类型链接组件
 * 用于在 API 文档中创建指向类型定义的链接
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

