# ds-markdown

> 🚀 고성능 React Markdown 타이핑 애니메이션 컴포넌트, DeepSeek 채팅 인터페이스 효과 완벽 재현

**[🇨🇳 中文](./README.md) | [🇺🇸 English](./README.en.md) | [🇯🇵 日本語](./README.ja.md) | 🇰🇷 한국어**

현대 AI 애플리케이션을 위해 특별히 설계된 React 컴포넌트로, 부드러운 실시간 타이핑 애니메이션과 완전한 Markdown 렌더링 기능을 제공합니다.

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 온라인 데모](https://onshinpei.github.io/ds-markdown/)

[DEMO：🔧 StackBlitz 체험](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)

---

## ✨ 핵심 기능

### 🤖 **AI 대화 시나리오**

- [DeepSeek 웹사이트](https://chat.deepseek.com/) 채팅 응답 효과를 1:1로 재현
- 사고 과정(`thinking`)과 답변 내용(`answer`) 두 가지 모드 지원
- 스트리밍 데이터에 완벽하게 적응, 사용자 입력에 대한 지연 없는 응답

### 📊 **콘텐츠 표시 시나리오**

- 코드 하이라이팅, 테이블, 목록 등을 포함한 완전한 Markdown 구문 지원
- 수식 렌더링 (KaTeX), `$...$` 및 `\[...\]` 구문 지원
- 라이트/다크 테마 지원, 다양한 제품 스타일에 적응
- remark/rehype 플러그인 확장을 지원하는 플러그인 아키텍처

### 🔧 **개발자 경험**

- 타이핑 중단 `stop` 및 재개 `resume` 지원
- 타이핑 비활성화 및 활성화 지원

### 🎬 **부드러운 애니메이션**

- 듀얼 타이머 모드 최적화, `requestAnimationFrame` 및 `setTimeout` 모드 지원
- 고주파 타이핑 지원(`requestAnimationFrame` 모드에서 `0ms`에 가까운 타이핑 간격 지원)
- 프레임 동기화 렌더링으로 브라우저 새로고침 속도와 완벽 매칭
- 스마트 문자 배치 처리로 더 자연스러운 시각적 효과

---

## 📦 빠른 설치

```bash
# npm
npm install ds-markdown

# yarn
yarn add ds-markdown

# pnpm
pnpm add ds-markdown
```

### ESM CDN으로 사용하기

설치 없이 브라우저에서 직접 사용할 수 있습니다:

[DEMO](https://stackblitz.com/edit/stackblitz-starters-7vcclcw7?file=index.html)

```html
<!-- 스타일 가져오기, 필수 -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/style.css" />

<!-- katex 수학 공식 스타일 가져오기, 필요한 경우만 -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/katex.css" />

<!-- 컴포넌트 가져오기 -->
<script type="module">
  import Markdown from 'https://esm.sh/ds-markdown';
</script>
```

## 🚀 5분 빠른 시작

### 기본 사용법

[DEMO](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx)

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function App() {
  return (
    <DsMarkdown interval={20} answerType="answer">
      # Hello ds-markdown 이것은 **고성능** 타이핑 애니메이션 컴포넌트입니다! ## 기능 - ⚡ 지연 없는 스트리밍 처리 - 🎬 부드러운 타이핑 애니메이션 - 🎯 완벽한 구문 지원
    </DsMarkdown>
  );
}
```

### 타이핑 애니메이션 비활성화

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function StaticDemo() {
  const [disableTyping, setDisableTyping] = useState(false);

  return (
    <div>
      <button onClick={() => setDisableTyping(!disableTyping)}>{disableTyping ? '활성화' : '비활성화'}타이핑 효과</button>

      <DsMarkdown interval={20} answerType="answer" disableTyping={disableTyping}>
        # 정적 표시 모드 `disableTyping`이 `true`일 때, 콘텐츠는 타이핑 애니메이션 효과 없이 즉시 모두 표시됩니다. 이는 특정 시나리오에서 매우 유용합니다: - 📄 정적 문서 표시 - 🔄 표시 모드 전환 - ⚡
        콘텐츠 빠른 미리보기
      </DsMarkdown>
    </div>
  );
}
```

### 수학 공식 지원

```tsx
import DsMarkdown from 'ds-markdown';
// 공식을 표시해야 하는 경우 공식 변환 플러그인을 가져옵니다
import { katexPlugin } from 'ds-markdown/plugins';
import 'ds-markdown/style.css';
// 공식을 표시해야 하는 경우 수학 공식 스타일을 가져옵니다
import 'ds-markdown/katex.css';

function MathDemo() {
  return (
    <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
      # 피타고라스 정리 직각삼각형에서 빗변의 제곱은 두 직각변의 제곱의 합과 같습니다: $a^2 + b^2 = c^2$ 여기서: - $a$와 $b$는 직각변 - $c$는 빗변 고전적인 "구삼고사현오"의 경우: $c = \sqrt
      {3 ^ (2 + 4) ^ 2} = \sqrt{25} = 5$
    </DsMarkdown>
  );
}
```

### AI 대화 시나리오

```tsx
function ChatDemo() {
  const [thinking, setThinking] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = () => {
    setThinking('🤔 질문을 분석 중입니다...');

    setTimeout(() => {
      setAnswer(`# React 19에 대해

React 19는 많은 흥미로운 새 기능을 제공합니다:

## 🚀 주요 업데이트
1. **React Compiler** - 자동 성능 최적화
2. **Actions** - 폼 처리 간소화
3. **Document Metadata** - 내장 SEO 지원

이러한 새 기능들을 함께 탐험해봅시다!`);
    }, 2000);
  };

  return (
    <div>
      <button onClick={handleAsk}>AI에게 질문하기</button>

      {thinking && (
        <DsMarkdown answerType="thinking" interval={30}>
          {thinking}
        </DsMarkdown>
      )}

      {answer && (
        <DsMarkdown answerType="answer" interval={15}>
          {answer}
        </DsMarkdown>
      )}
    </div>
  );
}
```

---

## 📚 완전 API 문서

### 기본 내보내기 DsMarkdown 및 MarkdownCMD props

```js
import DsMarkdown, { MarkdownCMD } from 'ds-markdown';
```

| 속성            | 타입                                          | 설명                       | 기본값                                                                 |
| --------------- | --------------------------------------------- | -------------------------- | ---------------------------------------------------------------------- |
| `interval`      | `number`                                      | 타이핑 간격 (밀리초)       | `30`                                                                   |
| `timerType`     | `'setTimeout'` \| `'requestAnimationFrame'`   | 타이머 타입                | 현재 기본값은 `setTimeout`, 나중에 `requestAnimationFrame`로 변경 예정 |
| `answerType`    | `'thinking'` \| `'answer'`                    | 콘텐츠 타입 (스타일 영향)  | `'answer'`                                                             |
| `theme`         | `'light'` \| `'dark'`                         | 테마 타입                  | `'light'`                                                              |
| `plugins`       | `IMarkdownPlugin[]`                           | 플러그인 설정              | `[]`                                                                   |
| `math`          | [IMarkdownMath](#IMarkdownMath)               | 수학 공식 설정             | `{ splitSymbol: 'dollar' }`                                            |
| `onEnd`         | `(data: EndData) => void`                     | 타이핑 완료 콜백           | -                                                                      |
| `onStart`       | `(data: StartData) => void`                   | 타이핑 시작 콜백           | -                                                                      |
| `onTypedChar`   | `(data: `[ITypedChar](#ITypedChar)`) => void` | 문자별 타이핑 콜백         | -                                                                      |
| `disableTyping` | `boolean`                                     | 타이핑 애니메이션 비활성화 | `false`                                                                |

> 참고: 타이핑 중에 `disableTyping`이 `true`에서 `false`로 변경되면 다음 타이핑 트리거 시 남은 모든 문자가 한 번에 표시됩니다.

### ITypedChar

| 속성           | 타입     | 설명                        | 기본값 |
| -------------- | -------- | --------------------------- | ------ |
| `percent`      | `number` | 타이핑 진행률 백분율        | `0`    |
| `currentChar`  | `string` | 현재 타이핑 중인 문자       | -      |
| `currentIndex` | `number` | 전체 문자열에서 현재 인덱스 | `0`    |

#### IMarkdownMath

| 속성          | 타입                      | 설명             | 기본값     |
| ------------- | ------------------------- | ---------------- | ---------- |
| `splitSymbol` | `'dollar'` \| `'bracket'` | 수학 공식 구분자 | `'dollar'` |

**구분자 설명:**

- `'dollar'`: `$...$` 및 `$$...$$` 구문 사용
- `'bracket'`: `\(...\)` 및 `\[...\]` 구문 사용

#### IMarkdownPlugin

| 속성           | 타입                      | 설명             | 기본값 |
| -------------- | ------------------------- | ---------------- | ------ |
| `remarkPlugin` | `unknown`                 | remark 플러그인  | -      |
| `rehypePlugin` | `unknown`                 | rehype 플러그인  | -      |
| `type`         | `'buildIn'` \| `'custom'` | 플러그인 타입    | -      |
| `id`           | `any`                     | 플러그인 고유 ID | -      |

### 컴포넌트 노출 메서드

#### 기본 내보내기 DsMarkdown

| 메서드   | 매개변수 | 설명            |
| -------- | -------- | --------------- |
| `stop`   | -        | 타이핑 일시정지 |
| `resume` | -        | 타이핑 재개     |

#### MarkdownCMD 노출 메서드

| 메서드            | 매개변수                                    | 설명                       |
| ----------------- | ------------------------------------------- | -------------------------- |
| `push`            | `(content: string, answerType: AnswerType)` | 콘텐츠 추가 및 타이핑 시작 |
| `clear`           | -                                           | 모든 콘텐츠 및 상태 지우기 |
| `triggerWholeEnd` | -                                           | 수동으로 완료 콜백 트리거  |
| `stop`            | -                                           | 타이핑 일시정지            |
| `resume`          | -                                           | 타이핑 재개                |

**사용 예:**

```tsx
markdownRef.current?.stop(); // 애니메이션 일시정지
markdownRef.current?.resume(); // 애니메이션 재개
```

---

## 🧮 수학 공식 사용 가이드

[DEMO1: 피타고라스 정리](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx)

[DEMO2: 문제 해답](https://stackblitz.com/edit/vitejs-vite-xk9lxagc?file=README.md)

### 기본 구문

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

// 1. 수학 공식 지원 활성화
<DsMarkdown plugins={[katexPlugin]}>
  # 수학 공식 예제

  // 인라인 공식
  이것은 인라인 공식입니다: $E = mc^2$

  // 블록 공식
  $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
</DsMarkdown>
```

### 구분자 선택

```tsx
// 달러 기호 구분자 사용 (기본값)
<DsMarkdown
  plugins={[katexPlugin]}
  math={{ splitSymbol: 'dollar' }}
>
  인라인: $a + b = c$
  블록: $$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$$
</DsMarkdown>

// 괄호 구분자 사용
<DsMarkdown
  plugins={[katexPlugin]}
  math={{ splitSymbol: 'bracket' }}
>
  인라인: \(a + b = c\)
  블록: \[\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n\]
</DsMarkdown>
```

### 스트리밍 수학 공식

```tsx
// 스트리밍 출력에서 수학 공식을 완벽하게 지원
const mathContent = [
  '피타고라스 정리:',
  '$a^2 + b^2 = c^2$',
  '\n\n',
  '여기서:',
  '- $a$와 $b$는 직각변\n',
  '- $c$는 빗변\n\n',
  '고전적인 "구삼고사현오"의 경우:\n',
  '$c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$\n\n',
  '이 정리는 기하학에서 광범위하게 응용됩니다!',
];

mathContent.forEach((chunk) => {
  markdownRef.current?.push(chunk, 'answer');
});
```

### 스타일 커스터마이징

```css
/* 수학 공식 스타일 커스터마이징 */
.katex {
  font-size: 1.1em;
}

.katex-display {
  margin: 1em 0;
  text-align: center;
}

/* 다크 테마 적응 */
[data-theme='dark'] .katex {
  color: #e1e1e1;
}
```

---

## 🔌 플러그인 시스템

### 내장 플러그인

#### KaTeX 수학 공식 플러그인

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

// 수학 공식 지원 활성화
<DsMarkdown plugins={[katexPlugin]}>수학 공식: $E = mc^2$</DsMarkdown>;
```

### 커스텀 플러그인

```tsx
import { createBuildInPlugin } from 'ds-markdown/plugins';

// 커스텀 플러그인 생성
const customPlugin = createBuildInPlugin({
  remarkPlugin: yourRemarkPlugin,
  rehypePlugin: yourRehypePlugin,
  id: Symbol('custom-plugin'),
});

// 커스텀 플러그인 사용
<DsMarkdown plugins={[katexPlugin, customPlugin]}>콘텐츠</DsMarkdown>;
```

---

## 🎛️ 타이머 모드 상세

### `requestAnimationFrame` 모드 🌟 (권장)

```typescript
// 🎯 특징
- 시간 기반: 실제 경과 시간을 바탕으로 문자 수 계산
- 배치 처리: 단일 프레임 내에서 여러 문자 처리 가능
- 프레임 동기화: 브라우저 60fps 새로고침 속도와 동기화
- 고주파 최적화: interval < 16ms의 고속 타이핑을 완벽하게 지원

// 🎯 적용 시나리오
- 현대 웹 애플리케이션의 기본 선택
- 부드러운 애니메이션 효과 추구
- 고주파 타이핑 (interval > 0으로 충분)
- AI 실시간 대화 시나리오
```

### `setTimeout` 모드 📟 (호환)

```typescript
// 🎯 특징
- 단일 문자: 매번 정확히 한 문자씩 처리
- 고정 간격: 설정된 시간에 따라 엄격하게 실행
- 리듬감: 클래식 타자기의 리듬감
- 정밀 제어: 특정 타이밍 요구사항에 적합

// 🎯 적용 시나리오
- 정밀한 시간 제어가 필요한 경우
- 레트로 타자기 효과 연출
- 호환성 요구사항이 높은 시나리오
```

### 📊 성능 비교

| 특징              | requestAnimationFrame              | setTimeout       |
| ----------------- | ---------------------------------- | ---------------- |
| **문자 처리**     | 프레임당 여러 문자                 | 한 번에 한 문자  |
| **고주파**        | ✅ 우수 (5ms → 프레임당 3문자)     | ❌ 지연 가능성   |
| **저주파**        | ✅ 정상 (100ms → 6프레임 후 1문자) | ✅ 정밀          |
| **시각적 효과**   | 🎬 부드러운 애니메이션 감각        | ⚡ 정밀한 리듬감 |
| **성능 오버헤드** | 🟢 낮음 (프레임 동기화)            | 🟡 보통 (타이머) |

고주파는 `requestAnimationFrame` 권장, 저주파는 `setTimeout` 권장

---

## 💡 실전 예제

### 📝 AI 스트리밍 대화

[DEMO: 🔧 StackBlitz 체험](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)

````tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  // AI 스트리밍 응답 시뮬레이션
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // 사고 단계
    markdownRef.current?.push('🤔 질문을 분석 중입니다...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ 분석 완료, 답변 시작', 'thinking');

    // 스트리밍 답변
    const chunks = [
      '# React 19 신기능 분석\n\n',
      '## 🚀 React Compiler\n',
      'React 19의 가장 큰 하이라이트는 **React Compiler** 도입입니다:\n\n',
      '- 🎯 **자동 최적화**: 수동 memo와 useMemo 불필요\n',
      '- ⚡ **성능 향상**: 컴파일 타임 최적화, 런타임 제로 오버헤드\n',
      '- 🔧 **후방 호환성**: 기존 코드 수정 불필요\n\n',
      '## 📝 Actions로 폼 간소화\n',
      '새로운 Actions API로 폼 처리가 더 간단해집니다:\n\n',
      '```tsx\n',
      'function ContactForm({ action }) {\n',
      '  const [state, formAction] = useActionState(action, null);\n',
      '  return (\n',
      '    <form action={formAction}>\n',
      '      <input name="email" type="email" />\n',
      '      <button>제출</button>\n',
      '    </form>\n',
      '  );\n',
      '}\n',
      '```\n\n',
      '이 답변이 도움이 되었기를 바랍니다! 🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div className="chat-container">
      <button onClick={simulateAIResponse}>🤖 React 19 신기능에 대해 질문</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('섹션 완료:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🧮 수학 공식 스트리밍 렌더링

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

function MathStreamingDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  const simulateMathResponse = async () => {
    markdownRef.current?.clear();

    const mathChunks = [
      '# 피타고라스 정리 상세 설명\n\n',
      '직각삼각형에서 빗변의 제곱은 두 직각변의 제곱의 합과 같습니다:\n\n',
      '$a^2 + b^2 = c^2$\n\n',
      '여기서:\n',
      '- $a$와 $b$는 직각변\n',
      '- $c$는 빗변\n\n',
      '고전적인 "구삼고사현오"의 경우:\n',
      '$c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$\n\n',
      '이 정리는 기하학에서 광범위하게 응용됩니다!',
    ];

    for (const chunk of mathChunks) {
      await delay(150);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={simulateMathResponse}>📐 피타고라스 정리 설명</button>

      <MarkdownCMD ref={markdownRef} interval={20} timerType="requestAnimationFrame" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }} />
    </div>
  );
}
```

## 🔧 모범 사례

### 1. 성능 최적화

```tsx
// ✅ 권장 구성
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30ms가 최적 경험
/>

// ❌ 너무 작은 간격 피하기
<DsMarkdown interval={1} /> // 성능 문제 야기 가능
```

### 2. 스트리밍 데이터 처리

```tsx
// ✅ 권장: 명령형 API
const ref = useRef<MarkdownCMDRef>(null);
useEffect(() => {
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);

// ❌ 피하기: 빈번한 children 업데이트
const [content, setContent] = useState('');
// 각 업데이트마다 전체 내용을 재분석
```

### 3. 수학 공식 최적화

```tsx
// ✅ 권장: 필요시 수학 공식 스타일 로드
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css'; // 필요할 때만 가져오기

// ✅ 권장: 적절한 구분자 사용
// 간단한 공식에는 $...$가 더 간결
// 복잡한 공식에는 $$...$$가 더 명확

// ✅ 권장: 플러그인 구성
import { katexPlugin } from 'ds-markdown/plugins';
<DsMarkdown plugins={[katexPlugin]}>수학 공식 내용</DsMarkdown>;
```

### 4. 타입 안전성

```tsx
import { MarkdownCMDRef } from 'ds-markdown';

const ref = useRef<MarkdownCMDRef>(null);
// 완전한 TypeScript 타입 힌트
```
