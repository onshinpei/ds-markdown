import React, { useEffect, useRef, useState } from 'react';
import Button from '../../ui/Button';
import { CheckMarkIcon } from '../../Icon';

// 拿到Button的类型
type ButtonProps = React.ComponentProps<typeof Button>;

interface SuccessButtonProps extends Omit<ButtonProps, 'onClick'> {
  children: React.ReactNode;
  onClick: () => Promise<boolean>;
  executeText?: string;
}

const SuccessButton: React.FC<SuccessButtonProps> = (props: SuccessButtonProps) => {
  const { onClick, icon, executeText, children, ...rest } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isUnmounted = useRef(false);
  const handleClick = async () => {
    if (isLoading || isSuccess) {
      return;
    }
    try {
      // 如果onClick不是异步函数，则直接调用
      const returnValue = onClick();
      if (returnValue instanceof Promise) {
        setIsLoading(true);
        const result = await returnValue;
        if (result) {
          setIsSuccess(true);
          setTimeout(() => {
            if (!isUnmounted.current) {
              setIsSuccess(false);
            }
          }, 1000);
        }
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isUnmounted.current = false;
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  return (
    <Button {...rest} onClick={handleClick} icon={isSuccess ? <CheckMarkIcon size={24} /> : icon}>
      {isSuccess ? executeText || children : children}
    </Button>
  );
};

export default SuccessButton;
