import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DsMarkdown from '../../src';

// Mock the plugins
jest.mock('../../src/plugins', () => ({
  katexPlugin: {
    id: Symbol('katex'),
    type: 'buildIn',
    remarkPlugin: jest.fn(),
    rehypePlugin: jest.fn(),
  },
  createBuildInPlugin: jest.fn(),
}));

describe('Simple Markdown Tests', () => {
  it('should render basic content with typing effect', async () => {
    render(
      <DsMarkdown interval={5} answerType="answer">
        Hello
      </DsMarkdown>,
    );

    // 开始时应该没有完整内容
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();

    // 等待打字效果完成
    await waitFor(
      () => {
        expect(screen.getByText('Hello')).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('should call onStart callback', async () => {
    const onStart = jest.fn();

    render(
      <DsMarkdown interval={5} onStart={onStart} answerType="answer">
        Test
      </DsMarkdown>,
    );

    await waitFor(
      () => {
        expect(onStart).toHaveBeenCalled();
      },
      { timeout: 1000 },
    );
  });

  it('should call onEnd callback', async () => {
    const onEnd = jest.fn();

    render(
      <DsMarkdown interval={5} onEnd={onEnd} answerType="answer">
        Test
      </DsMarkdown>,
    );

    await waitFor(
      () => {
        expect(onEnd).toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });
});
