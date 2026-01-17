import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../../ui/Button';
import { CheckMarkIcon } from '../../Icon';

// Get Button type
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(async () => {
    if (isLoading || isSuccess) {
      return;
    }
    try {
      // If onClick is not async, call directly
      const returnValue = onClick();
      if (returnValue instanceof Promise) {
        setIsLoading(true);
        const result = await returnValue;
        if (result) {
          setIsSuccess(true);
        }
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isSuccess, onClick]);

  // Handle success state timeout with proper cleanup
  useEffect(() => {
    if (isSuccess) {
      timerRef.current = setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isSuccess]);

  return (
    <Button {...rest} onClick={handleClick} icon={isSuccess ? <CheckMarkIcon size={24} /> : icon}>
      {isSuccess ? executeText || children : children}
    </Button>
  );
};

export default SuccessButton;
