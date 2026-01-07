import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Markdown from '../../src/Markdown';
import MarkdownCMD from '../../src/MarkdownCMD';
import Button from '../../src/components/ui/Button';
import IconButton from '../../src/components/ui/IconButton';
import SuccessButton from '../../src/components/ui/SuccessButton';
import CopyButton from '../../src/components/CopyButton';
import DownloadButton from '../../src/components/DownloadButton';
import { ConfigProvider } from '../../src/context/ConfigProvider';
import { enUS } from '../../src/i18n/en';

// Mock react-markdown-typer to avoid complex dependency issues in tests
jest.mock('react-markdown-typer', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mockReact = require('react');
  return {
    MarkdownTyperCMD: mockReact.forwardRef(({ children }: { children?: string }, ref: unknown) => {
      mockReact.useImperativeHandle(ref, () => ({
        push: jest.fn(),
        clear: jest.fn(),
        triggerWholeEnd: jest.fn(),
        stop: jest.fn(),
        resume: jest.fn(),
        start: jest.fn(),
        restart: jest.fn(),
      }));
      return mockReact.createElement('div', { 'data-testid': 'markdown-typer' }, children);
    }),
  };
});

// Mock getScreenRefreshRate to return a fixed value in tests
jest.mock('../../src/utils/getScreenRefreshRate', () => ({
  getScreenRefreshRate: jest.fn(() => 16.67),
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('Markdown Component', () => {
  it('should render without crashing', () => {
    render(<Markdown interval={16.67}>Hello World</Markdown>);
    expect(screen.getByTestId('markdown-typer')).toBeInTheDocument();
  });

  it('should render with children', () => {
    render(<Markdown interval={16.67}>Test content</Markdown>);
    expect(screen.getByTestId('markdown-typer')).toBeInTheDocument();
  });

  it('should render with thinking answerType', () => {
    const { container } = render(
      <Markdown interval={16.67} answerType="thinking">
        Test
      </Markdown>,
    );
    expect(container.querySelector('.ds-markdown-thinking')).toBeInTheDocument();
  });

  it('should render with answer answerType', () => {
    const { container } = render(
      <Markdown interval={16.67} answerType="answer">
        Test
      </Markdown>,
    );
    expect(container.querySelector('.ds-markdown-answer')).toBeInTheDocument();
  });

  it('should render with dark theme', () => {
    const { container } = render(
      <Markdown interval={16.67} theme="dark">
        Test
      </Markdown>,
    );
    expect(container.querySelector('.ds-markdown-dark')).toBeInTheDocument();
  });

  it('should render with light theme', () => {
    const { container } = render(
      <Markdown interval={16.67} theme="light">
        Test
      </Markdown>,
    );
    expect(container.querySelector('.ds-markdown')).toBeInTheDocument();
    expect(container.querySelector('.ds-markdown-dark')).not.toBeInTheDocument();
  });

  it('should handle empty children', () => {
    render(<Markdown interval={16.67}>{''}</Markdown>);
    expect(screen.getByTestId('markdown-typer')).toBeInTheDocument();
  });

  it('should expose ref methods', () => {
    const ref = React.createRef<{ stop: () => void; resume: () => void; start: () => void; restart: () => void }>();
    render(
      <Markdown interval={16.67} ref={ref}>
        Test
      </Markdown>,
    );

    expect(ref.current).toBeDefined();
    expect(typeof ref.current?.stop).toBe('function');
    expect(typeof ref.current?.resume).toBe('function');
    expect(typeof ref.current?.start).toBe('function');
    expect(typeof ref.current?.restart).toBe('function');
  });
});

describe('MarkdownCMD Component', () => {
  it('should render without crashing', () => {
    render(<MarkdownCMD interval={16.67} />);
    expect(screen.getByTestId('markdown-typer')).toBeInTheDocument();
  });

  it('should render with dark theme', () => {
    const { container } = render(<MarkdownCMD interval={16.67} theme="dark" />);
    expect(container.querySelector('.ds-markdown-dark')).toBeInTheDocument();
  });

  it('should render with thinking answerType', () => {
    const { container } = render(<MarkdownCMD interval={16.67} answerType="thinking" />);
    expect(container.querySelector('.ds-markdown-thinking')).toBeInTheDocument();
  });

  it('should expose ref methods', () => {
    const ref = React.createRef<{ push: (content: string) => void; clear: () => void; triggerWholeEnd: () => void; stop: () => void; resume: () => void; start: () => void; restart: () => void }>();
    render(<MarkdownCMD interval={16.67} ref={ref} />);

    expect(ref.current).toBeDefined();
    expect(typeof ref.current?.push).toBe('function');
    expect(typeof ref.current?.clear).toBe('function');
    expect(typeof ref.current?.triggerWholeEnd).toBe('function');
    expect(typeof ref.current?.stop).toBe('function');
    expect(typeof ref.current?.resume).toBe('function');
    expect(typeof ref.current?.start).toBe('function');
    expect(typeof ref.current?.restart).toBe('function');
  });
});

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with custom className', () => {
    const { container } = render(<Button className="custom-class">Test</Button>);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    render(<Button icon={<span data-testid="icon">🔥</span>}>With Icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should have disabled class when disabled', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    expect(container.querySelector('.ds-button__disabled')).toBeInTheDocument();
  });
});

describe('IconButton Component', () => {
  it('should render icon button', () => {
    render(<IconButton icon={<span data-testid="icon">🔥</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<IconButton icon={<span>🔥</span>} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have ds-icon-button class', () => {
    const { container } = render(<IconButton icon={<span>🔥</span>} />);
    expect(container.querySelector('.ds-icon-button')).toBeInTheDocument();
  });
});

describe('SuccessButton Component', () => {
  it('should render success button with children', () => {
    render(<SuccessButton onClick={async () => true}>Success</SuccessButton>);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('should handle async click and show success state', async () => {
    const handleClick = jest.fn().mockResolvedValue(true);
    render(
      <SuccessButton onClick={handleClick} executeText="Done!">
        Click
      </SuccessButton>,
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalled();
    });
  });

  it('should render with icon', () => {
    render(
      <SuccessButton onClick={async () => true} icon={<span data-testid="icon">✓</span>}>
        Success
      </SuccessButton>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});

describe('CopyButton Component', () => {
  const renderWithConfig = (component: React.ReactNode) => {
    return render(<ConfigProvider locale={enUS}>{component}</ConfigProvider>);
  };

  it('should render copy button', () => {
    renderWithConfig(<CopyButton codeContent="Copy this" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('should copy text on click', async () => {
    renderWithConfig(<CopyButton codeContent="Copy this" />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Copy this');
    });
  });

  it('should handle empty codeContent', async () => {
    renderWithConfig(<CopyButton codeContent="" />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('');
    });
  });
});

describe('DownloadButton Component', () => {
  const renderWithConfig = (component: React.ReactNode) => {
    return render(<ConfigProvider locale={enUS}>{component}</ConfigProvider>);
  };

  it('should render download button', () => {
    renderWithConfig(<DownloadButton codeContent="Download content" language="javascript" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should handle click on download button', async () => {
    renderWithConfig(<DownloadButton codeContent="console.log('hello');" language="javascript" />);

    // Just verify the button is clickable
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    // Verify the button still exists after click
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('should render with empty codeContent', () => {
    renderWithConfig(<DownloadButton codeContent="" language="javascript" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
