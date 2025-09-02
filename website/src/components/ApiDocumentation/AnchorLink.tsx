import React from 'react';
import { useLocation } from 'react-router-dom';

interface AnchorLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * 自定义锚点链接组件，解决React Router hash模式下锚点链接无效的问题
 * 在hash模式下，URL格式为 #/docs#anchor，需要特殊处理
 */
export const AnchorLink: React.FC<AnchorLinkProps> = ({ href, className, children }) => {
  const handleClick = (href: string) => {
    // 移除href中的#号
    const anchorId = href.replace('#', '');

    // 延迟执行滚动，确保DOM已更新
    setTimeout(() => {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  return (
    <a
      // href={href}
      className={className}
      onClick={() => handleClick(href)}
      style={{
        color: '#1890ff',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.textDecoration = 'underline';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.textDecoration = 'none';
      }}
    >
      {children}
    </a>
  );
};

export default AnchorLink;
