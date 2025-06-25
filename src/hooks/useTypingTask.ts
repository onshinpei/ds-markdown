import { useEffect, useRef } from 'react';
import { AnswerType, IChar, ITypedChar, IWholeContent, MarkdownProps, IEndData } from '../defined.js';

interface UseTypingTaskOptions {
  timerType: MarkdownProps['timerType'];
  interval: number;
  charsRef: React.RefObject<IChar[]>;
  onEnd?: (data?: IEndData) => void;
  onStart?: (data?: { currentIndex: number; currentChar: string; answerType: AnswerType; prevStr: string }) => void;
  onTypedChar?: (data?: ITypedChar) => void;
  processCharDisplay: (char: IChar) => void;
  wholeContentRef: React.RefObject<IWholeContent>;
  disableTyping: boolean;
  triggerUpdate: () => void;
}

export interface TypingTaskController {
  start: () => void;
  stop: () => void;
  clear: () => void;
  isTyping: () => boolean;
  /** 是否主动调用 stop 方法 */
  typedIsManualStopRef: React.RefObject<boolean>;
  resume: () => void;
}

export const useTypingTask = (options: UseTypingTaskOptions): TypingTaskController => {
  const { timerType = 'setTimeout', interval, charsRef, onEnd, onStart, onTypedChar, processCharDisplay, wholeContentRef, disableTyping, triggerUpdate } = options;
  /** 是否卸载 */
  const isUnmountRef = useRef(false);
  /** 是否正在打字 */
  const isTypingRef = useRef(false);
  /** 动画帧ID */
  const animationFrameRef = useRef<number | null>(null);
  /** 传统定时器（兼容模式） */
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // 已经打过的字记录
  const typedCharsRef = useRef<{ typedContent: string; answerType: AnswerType; prevStr: string } | undefined>(undefined);
  // 是否主动调用 stop 方法
  const typedIsManualStopRef = useRef(false);

  const disableTypingRef = useRef(disableTyping);
  disableTypingRef.current = disableTyping;

  const getChars = () => {
    return charsRef.current;
  };

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
  const triggerOnEnd = (data?: { manual?: boolean }) => {
    if (!onEnd) {
      return;
    }

    onEnd({
      str: typedCharsRef.current?.typedContent,
      answerType: typedCharsRef.current?.answerType || 'answer',
      manual: data?.manual ?? false,
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

    const { answerType, content, index } = char;

    const allLength = wholeContentRef.current.allLength;

    const percent = ((char.index + 1) / allLength) * 100;

    onTypedChar({
      currentIndex: index,
      currentChar: content,
      answerType: answerType,
      prevStr: typedCharsRef.current?.prevStr || '',
      percent,
    });
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

    isTypingRef.current = false;
    typedCharsRef.current = undefined;
  };

  /** 开始打字任务 */
  const startTypedTask = () => {
    /** 如果手动调用 stop 方法，则不重新开始打字 */
    if (typedIsManualStopRef.current) {
      return;
    }

    if (isTypingRef.current) {
      return;
    }

    if (timerType === 'requestAnimationFrame') {
      startAnimationFrameMode();
    } else {
      startTimeoutMode();
    }
  };

  /** 打字机打完所有字符 */
  function typingRemainAll() {
    const chars = getChars();
    const thinkingCharsStr = chars
      .filter((char) => char.answerType === 'thinking')
      .map((char) => char.content)
      .join('');
    const answerCharsStr = chars
      .filter((char) => char.answerType === 'answer')
      .map((char) => char.content)
      .join('');

    if (thinkingCharsStr) {
      onTypedChar?.({
        currentIndex: wholeContentRef.current.thinking.length,
        currentChar: thinkingCharsStr,
        answerType: 'thinking',
        prevStr: typedCharsRef.current?.prevStr || '',
        percent: 100,
      });
    }

    if (answerCharsStr) {
      onTypedChar?.({
        currentIndex: wholeContentRef.current.answer.length,
        currentChar: answerCharsStr,
        answerType: 'answer',
        prevStr: typedCharsRef.current?.prevStr || '',
        percent: 100,
      });
    }

    wholeContentRef.current.thinking.content += thinkingCharsStr;
    wholeContentRef.current.thinking.length += thinkingCharsStr.length;
    wholeContentRef.current.answer.content += answerCharsStr;
    wholeContentRef.current.answer.length += answerCharsStr.length;
    wholeContentRef.current.allLength += thinkingCharsStr.length + answerCharsStr.length;
    charsRef.current = [];
    isTypingRef.current = false;

    triggerOnEnd();
    triggerUpdate();
  }

  /** requestAnimationFrame 模式 */
  const startAnimationFrameMode = () => {
    let lastFrameTime = 0;

    const frameLoop = (currentTime: number) => {
      // 如果关闭打字机效果，则打完所有字符
      if (disableTypingRef.current) {
        typingRemainAll();
        return;
      }
      const chars = getChars();

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

        if (!isTypingRef.current) {
          isTypingRef.current = true;
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
        isTypingRef.current = false;
        triggerOnEnd();
      }
    };

    animationFrameRef.current = requestAnimationFrame(frameLoop);
  };

  /** 停止动画帧模式 */
  const stopAnimationFrame = (manual = false) => {
    isTypingRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (!manual) {
      triggerOnEnd({ manual });
    }
  };

  /** setTimeout 模式 */
  const startTimeoutMode = () => {
    const nextTyped = () => {
      const chars = getChars();
      if (chars.length === 0) {
        stopTimeout();
        return;
      }
      timerRef.current = setTimeout(startTyped, interval);
    };

    const startTyped = (isStartPoint = false) => {
      // 如果关闭打字机效果，则打完所有字符
      if (disableTypingRef.current) {
        typingRemainAll();
        return;
      }

      const chars = getChars();
      if (isUnmountRef.current) return;

      isTypingRef.current = true;
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
    isTypingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    triggerOnEnd();
  };

  const stopTask = () => {
    typedIsManualStopRef.current = true;
    if (timerType === 'requestAnimationFrame') {
      stopAnimationFrame();
    } else {
      stopTimeout();
    }
  };

  function restartTypedTask() {
    typedIsManualStopRef.current = false;
    startTypedTask();
  }

  return {
    start: startTypedTask,
    stop: stopTask,
    resume: restartTypedTask,
    clear: () => {
      clearTimer();
      typedCharsRef.current = undefined;
    },
    isTyping: () => isTypingRef.current,
    typedIsManualStopRef,
  };
};
