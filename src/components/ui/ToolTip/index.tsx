import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface ToolTipProps {
  title: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  delay?: number;
}

const ToolTip = forwardRef<HTMLElement, ToolTipProps>(({ title, children, position = 'top', className = '', style, showArrow = true, delay = 200 }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  // 转发ref到trigger元素
  useImperativeHandle(ref, () => triggerRef.current!, []);

  const showTooltip = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + 8;
        break;
    }

    setTooltipStyle({
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 1000,
    });
  }, [position]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible, position, updatePosition]);

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    const handleResize = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, updatePosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const renderTooltip = () => {
    if (!isVisible) return null;

    const tooltipElement = (
      <div ref={tooltipRef} className={classNames('ds-tooltip', `ds-tooltip--${position}`)} style={tooltipStyle}>
        <div className="ds-tooltip__title">{title}</div>
        {showArrow && <div className={classNames('ds-tooltip__arrow', `ds-tooltip__arrow--${position}`)} />}
      </div>
    );

    return createPortal(tooltipElement, document.body);
  };

  // 合并原有的事件处理器
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // 阻止事件冒泡
      showTooltip();
      // 只在子元素有onMouseEnter时才调用
      const props = children.props as { onMouseEnter?: (e: React.MouseEvent) => void };
      if (props.onMouseEnter) {
        props.onMouseEnter(e);
      }
    },
    [children.props, showTooltip],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // 阻止事件冒泡
      hideTooltip();
      // 只在子元素有onMouseLeave时才调用
      const props = children.props as { onMouseLeave?: (e: React.MouseEvent) => void };
      if (props.onMouseLeave) {
        props.onMouseLeave(e);
      }
    },
    [children.props, hideTooltip],
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent) => {
      e.stopPropagation(); // 阻止事件冒泡
      showTooltip();
      // 只在子元素有onFocus时才调用
      const props = children.props as { onFocus?: (e: React.FocusEvent) => void };
      if (props.onFocus) {
        props.onFocus(e);
      }
    },
    [children.props, showTooltip],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      e.stopPropagation(); // 阻止事件冒泡
      hideTooltip();
      // 只在子元素有onBlur时才调用
      const props = children.props as { onBlur?: (e: React.FocusEvent) => void };
      if (props.onBlur) {
        props.onBlur(e);
      }
    },
    [children.props, hideTooltip],
  );

  // 处理onClick事件
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // 调用原有的onClick
      const props = children.props as { onClick?: (e: React.MouseEvent) => void };
      if (props.onClick) {
        props.onClick(e);
      }
    },
    [children.props],
  );

  // 检查组件是否支持ref
  const isForwardRef =
    React.isValidElement(children) &&
    typeof children.type === 'function' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (children.type as any).$$typeof === Symbol.for('react.forward_ref');

  // 如果组件不支持ref，使用包装div的方式
  if (!isForwardRef && typeof children.type === 'function') {
    return (
      <div
        ref={triggerRef as React.Ref<HTMLDivElement>}
        className={classNames('ds-tooltip-trigger', className)}
        style={style}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
        {renderTooltip()}
      </div>
    );
  }

  // 使用 cloneElement 直接给子元素添加事件监听器和ref

  const enhancedChild = React.cloneElement(children, {
    ref: triggerRef,
    className: classNames((children.props as { className?: string }).className, className),
    style: { ...(children.props as { style?: React.CSSProperties }).style, ...style },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: handleClick,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  return (
    <>
      {enhancedChild}
      {renderTooltip()}
    </>
  );
});

ToolTip.displayName = 'ToolTip';

export default ToolTip;
