import { useEffect, useRef } from 'react';
import { AnswerType, IChar, MarkdownProps } from '../defined.js';

interface UseTypingTaskOptions {
  timerType: MarkdownProps['timerType'];
  interval: number;
  charsRef: React.MutableRefObject<IChar[]>;
  onEnd?: (data?: { str?: string; answerType?: AnswerType }) => void;
  onStart?: (data?: { currentIndex: number; currentChar: string; answerType: AnswerType; prevStr: string }) => void;
  onTypedChar?: (data?: { currentIndex: number; currentChar: string; answerType: AnswerType; prevStr: string }) => void;
  processCharDisplay: (char: IChar) => void;
}

export interface TypingTaskController {
  start: () => void;
  stop: () => void;
  clear: () => void;
  isTyping: () => boolean;
}

export const useTypingTask = (options: UseTypingTaskOptions): TypingTaskController => {
  const { timerType = 'setTimeout', interval, charsRef, onEnd, onStart, onTypedChar, processCharDisplay } = options;
  /** 是否卸载 */
  const isUnmountRef = useRef(false);
  /** 是否正在打字 */
  const isTypedRef = useRef(false);
  /** 打字开始时间 */
  const startTimeRef = useRef<number | null>(null);
  /** 已经打出的字符数量 */
  const typedCountRef = useRef<number>(0);
  /** 动画帧ID */
  const animationFrameRef = useRef<number | null>(null);
  /** 传统定时器（兼容模式） */
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 已经打过的字记录
  const typedCharsRef = useRef<{ typedContent: string; answerType: AnswerType; prevStr: string } | undefined>(undefined);

  useEffect(() => {
    isUnmountRef.current = false;

    return () => {
      isUnmountRef.current = true;
    };
  }, []);

  /**
   * 记录打过的字
   * @param char 当前字符
   * @returns
   */
  const recordTypedChars = (char: IChar) => {
    let prevStr = '';
    if (!typedCharsRef.current || typedCharsRef.current.answerType !== char.answerType) {
      typedCharsRef.current = {
        typedContent: char.content,
        answerType: char.answerType,
        prevStr: '',
      };
    } else {
      prevStr = typedCharsRef.current.typedContent;
      typedCharsRef.current.typedContent += char.content;
      typedCharsRef.current.prevStr = prevStr;
    }

    return {
      prevStr,
      nextStr: typedCharsRef.current?.typedContent || '',
    };
  };

  /**
   * 触发打字开始回调
   * @param char 当前字符
   */
  const triggerOnStart = (char: IChar) => {
    if (!onStart) {
      return;
    }
    const { prevStr } = recordTypedChars(char);
    onStart({
      currentIndex: prevStr.length,
      currentChar: char.content,
      answerType: char.answerType,
      prevStr,
    });
  };

  /**
   * 触发打字结束回调
   */
  const triggerOnEnd = () => {
    if (!onEnd) {
      return;
    }

    onEnd({
      str: typedCharsRef.current?.typedContent,
      answerType: typedCharsRef.current?.answerType,
    });
  };

  /**
   * 触发打字过程中回调
   * @param char 当前字符
   * @param isStartPoint 是否是开始打字(第一个字)
   */
  const triggerOnTypedChar = (char: IChar, isStartPoint = false) => {
    if (!isStartPoint) {
      recordTypedChars(char);
    }
    if (!onTypedChar) {
      return;
    }

    onTypedChar({
      currentIndex: typedCharsRef.current?.prevStr.length || 0,
      currentChar: char.content,
      answerType: char.answerType,
      prevStr: typedCharsRef.current?.prevStr || '',
    });
  };

  /**
   * 处理下一个字符（用于时间戳驱动模式）
   */
  const processNextChar = (): boolean => {
    const chars = charsRef.current;
    if (chars.length === 0) {
      return false;
    }

    const char = chars.shift();
    if (char === undefined) {
      return false;
    }

    // 第一个字符需要触发开始回调
    if (typedCountRef.current === 0) {
      triggerOnStart(char);
      triggerOnTypedChar(char, true);
    } else {
      triggerOnTypedChar(char);
    }

    processCharDisplay(char);
    typedCountRef.current++;
    return true;
  };

  /** 清除定时器 */
  const clearTimer = () => {
    // 清理 requestAnimationFrame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // 清理 setTimeout (可能被 timestamp 模式使用)
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    isTypedRef.current = false;
    startTimeRef.current = null;
    typedCountRef.current = 0;
  };

  /** 开始打字任务 */
  const startTypedTask = () => {
    if (isTypedRef.current) {
      return;
    }

    switch (timerType) {
      case 'timestamp':
        startTimestampMode();
        break;
      case 'requestAnimationFrame':
        startAnimationFrameMode();
        break;
      default:
        startTimeoutMode();
        break;
    }
  };

  /** 时间戳驱动模式 */
  const startTimestampMode = () => {
    startTimeRef.current = Date.now();
    typedCountRef.current = 0;
    isTypedRef.current = true;

    const timestampLoop = (currentTime: number) => {
      if (isUnmountRef.current || !isTypedRef.current) {
        return;
      }

      const chars = charsRef.current;
      if (chars.length === 0) {
        isTypedRef.current = false;
        triggerOnEnd();
        return;
      }

      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const expectedChars = Math.floor(elapsed / interval);
      const actualChars = typedCountRef.current;

      // 如果需要追赶进度，一次性打出多个字符
      if (expectedChars > actualChars) {
        const charsToType = Math.min(expectedChars - actualChars, chars.length);
        for (let i = 0; i < charsToType; i++) {
          if (!processNextChar()) break;
        }
      }

      // 继续下一帧
      if (chars.length > 0) {
        scheduleNextTimestampFrame(timestampLoop);
      } else {
        isTypedRef.current = false;
        triggerOnEnd();
      }
    };

    animationFrameRef.current = requestAnimationFrame(timestampLoop);
  };

  /** 调度下一个时间戳帧 */
  const scheduleNextTimestampFrame = (timestampLoop: (time: number) => void) => {
    if (interval < 16) {
      // 使用 setTimeout 来实现更精确的时间控制
      const nextCheckDelay = Math.max(1, Math.min(interval, 16));
      setTimeout(() => {
        if (!isUnmountRef.current && isTypedRef.current) {
          animationFrameRef.current = requestAnimationFrame(timestampLoop);
        }
      }, nextCheckDelay);
    } else {
      animationFrameRef.current = requestAnimationFrame(timestampLoop);
    }
  };

  /** requestAnimationFrame 模式 */
  const startAnimationFrameMode = () => {
    const chars = charsRef.current;
    let lastFrameTime = 0;

    const frameLoop = (currentTime: number) => {
      if (isUnmountRef.current) return;

      if (chars.length === 0) {
        stopAnimationFrame();
        return;
      }

      // 计算这一帧应该打多少个字符
      if (lastFrameTime === 0) {
        lastFrameTime = currentTime;
      }

      const deltaTime = currentTime - lastFrameTime;
      const charsToType = Math.max(1, Math.floor(deltaTime / interval));
      const actualCharsToType = Math.min(charsToType, chars.length);

      // 处理字符
      for (let i = 0; i < actualCharsToType; i++) {
        const char = chars.shift();
        if (char === undefined) break;

        if (!isTypedRef.current) {
          isTypedRef.current = true;
          triggerOnStart(char);
          triggerOnTypedChar(char, true);
        } else {
          triggerOnTypedChar(char);
        }
        processCharDisplay(char);
      }

      lastFrameTime = currentTime;

      // 继续下一帧
      if (chars.length > 0) {
        animationFrameRef.current = requestAnimationFrame(frameLoop);
      } else {
        isTypedRef.current = false;
        triggerOnEnd();
      }
    };

    animationFrameRef.current = requestAnimationFrame(frameLoop);
  };

  /** 停止动画帧模式 */
  const stopAnimationFrame = () => {
    isTypedRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    triggerOnEnd();
  };

  /** setTimeout 模式 */
  const startTimeoutMode = () => {
    const chars = charsRef.current;

    const nextTyped = () => {
      if (chars.length === 0) {
        stopTimeout();
        return;
      }
      timerRef.current = setTimeout(startTyped, interval);
    };

    const startTyped = (isStartPoint = false) => {
      if (isUnmountRef.current) return;

      isTypedRef.current = true;
      const char = chars.shift();

      if (char === undefined) {
        stopTimeout();
        return;
      }

      if (isStartPoint) {
        triggerOnStart(char);
        triggerOnTypedChar(char, isStartPoint);
      } else {
        triggerOnTypedChar(char);
      }

      processCharDisplay(char);
      nextTyped();
    };

    startTyped(true);
  };

  /** 停止超时模式 */
  const stopTimeout = () => {
    isTypedRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    triggerOnEnd();
  };

  return {
    start: startTypedTask,
    stop: clearTimer,
    clear: () => {
      clearTimer();
      startTimeRef.current = null;
      typedCountRef.current = 0;
      typedCharsRef.current = undefined;
    },
    isTyping: () => isTypedRef.current,
  };
};
