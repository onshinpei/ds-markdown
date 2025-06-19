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

### 🎯 **완벽한 재현**

- [DeepSeek 웹사이트](https://chat.deepseek.com/) 채팅 응답 효과를 1:1로 재현
- 사고 과정(`thinking`)과 답변 내용(`answer`) 두 가지 모드 지원
- 코드 하이라이팅, 테이블, 목록 등을 포함한 네이티브 Markdown 구문 지원
- 라이트/다크 테마 지원, 다양한 시나리오에 완벽하게 대응

### ⚡ **극한의 성능**

- 스마트 배치 처리로 대용량 문서도 지연 없는 렌더링
- 듀얼 타이머 모드: `requestAnimationFrame` + `setTimeout`
- 내장 스트리밍 구문 버퍼링으로 불완전한 Markdown 렌더링 오류 방지

### 🎬 **부드러운 애니메이션**

- 고주파 타이핑 지원(`requestAnimationFrame` 모드에서 `0ms`에 가까운 타이핑 간격 지원)
- 프레임 동기화 렌더링으로 브라우저 60fps와 완벽 매칭
- 스마트 문자 배치 처리로 더 자연스러운 시각적 효과

### 🔧 **유연하고 사용하기 쉬움**

- **선언적 API**: 간단한 시나리오에 적합, React 스타일
- **명령형 API**: 스트리밍 데이터에 적합, 더 나은 성능
- **네이티브 TypeScript 지원**: 완전한 타입 힌트

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

```html
<!-- 스타일 가져오기 -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/style.css" />

<!-- 컴포넌트 가져오기 -->
<script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19.1.0",
      "react-dom/client": "https://esm.sh/react-dom@19.1.0/client",
      "ds-markdown": "https://esm.sh/ds-markdown"
    }
  }
</script>
<script type="module" src="https://esm.sh/tsx"></script>

<script type="text/babel">
  import { createRoot } from 'react-dom/client';
  import DsMarkdown from 'ds-markdown';

  const markdown = `
# Hello ds-markdown

이것은 **고성능** 타이핑 애니메이션 컴포넌트입니다!

## 특징
- ⚡ 지연 없는 스트리밍
- 🎬 부드러운 타이핑 애니메이션
- 🎯 완벽한 구문 지원
  `;

  const root = createRoot(document.getElementById('root'));
  root.render(<DsMarkdown interval={20}>{markdown}</DsMarkdown>);
</script>
```

## 🚀 5분 빠른 시작

### 기본 사용법

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

### 선언적 API (초보자 추천)

| 속성          | 타입                                        | 설명                 | 기본값                                                                 |
| ------------- | ------------------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| `interval`    | `number`                                    | 타이핑 간격 (밀리초) | `30`                                                                   |
| `timerType`   | `'setTimeout'` \| `'requestAnimationFrame'` | 타이머 타입          | 현재 기본값은 `setTimeout`, 나중에 `requestAnimationFrame`로 변경 예정 |
| `answerType`  | `'thinking'` \| `'answer'`                  | 콘텐츠 타입          | `'answer'`                                                             |
| `theme`       | `'light'` \| `'dark'`                       | 테마 타입            | `'light'`                                                              |
| `onEnd`       | `(data: EndData) => void`                   | 타이핑 완료 콜백     | -                                                                      |
| `onStart`     | `(data: StartData) => void`                 | 타이핑 시작 콜백     | -                                                                      |
| `onTypedChar` | `(data: CharData) => void`                  | 문자별 타이핑 콜백   | -                                                                      |

### 명령형 API (스트리밍 시나리오 추천)

```typescript
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

interface MarkdownCMDRef {
  push: (content: string, answerType: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}
```

| 메서드            | 매개변수                                    | 설명                       |
| ----------------- | ------------------------------------------- | -------------------------- |
| `push`            | `(content: string, answerType: AnswerType)` | 콘텐츠 추가 및 타이핑 시작 |
| `clear`           | -                                           | 모든 콘텐츠와 상태 초기화  |
| `triggerWholeEnd` | -                                           | 완료 콜백 수동 트리거      |

---

## 🎛️ 타이머 모드 상세 설명

### `requestAnimationFrame` 모드 🌟 (추천)

```typescript
// 🎯 특징
- 시간 기반: 실제 경과 시간을 기반으로 문자 수 계산
- 배치 처리: 단일 프레임 내에서 여러 문자 처리 가능
- 프레임 동기화: 브라우저 60fps 새로고침 속도와 동기화
- 고주파 최적화: interval < 16ms 고속 타이핑 완벽 지원

// 🎯 적용 시나리오
- 현대 웹 애플리케이션의 기본 선택
- 부드러운 애니메이션 효과 추구
- 고주파 타이핑 (interval > 0이면 충분)
- AI 실시간 대화 시나리오
```

### `setTimeout` 모드 📟 (호환성)

```typescript
// 🎯 특징
- 단일 문자: 한 번에 정확히 하나의 문자 처리
- 고정 간격: 설정된 시간에 따라 엄격하게 실행
- 리듬감: 클래식 타자기의 리듬
- 정밀 제어: 특정 타이밍 요구사항에 적합

// 🎯 적용 시나리오
- 정밀한 시간 제어가 필요
- 레트로 타자기 효과 생성
- 호환성 요구사항이 높은 시나리오
```

### 📊 성능 비교

| 기능              | requestAnimationFrame              | setTimeout           |
| ----------------- | ---------------------------------- | -------------------- |
| **문자 처리**     | 프레임당 여러 문자 처리 가능       | 한 번에 한 문자 처리 |
| **고주파 간격**   | ✅ 우수 (5ms → 프레임당 3문자)     | ❌ 지연 가능성       |
| **저주파 간격**   | ✅ 정상 (100ms → 6프레임 후 1문자) | ✅ 정밀              |
| **시각적 효과**   | 🎬 부드러운 애니메이션 느낌        | ⚡ 정밀한 리듬감     |
| **성능 오버헤드** | 🟢 낮음 (프레임 동기화)            | 🟡 중간 (타이머)     |

고주파는 `requestAnimationFrame`, 저주파는 `setTimeout` 추천

---

## 💡 실전 예제

### 📝 AI 스트리밍 대화

````tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  // AI 스트리밍 응답 시뮬레이션
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // 사고 단계
    markdownRef.current?.push('🤔 질문을 분석하고 있습니다...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ 분석 완료, 답변을 시작합니다', 'thinking');

    // 스트리밍 답변
    const chunks = [
      '# React 19 새 기능 분석\n\n',
      '## 🚀 React Compiler\n',
      'React 19의 가장 큰 하이라이트는 **React Compiler** 도입입니다:\n\n',
      '- 🎯 **자동 최적화**: 수동 memo와 useMemo 불필요\n',
      '- ⚡ **성능 향상**: 컴파일 타임 최적화, 런타임 오버헤드 제로\n',
      '- 🔧 **하위 호환성**: 기존 코드 수정 불필요\n\n',
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
      <button onClick={simulateAIResponse}>🤖 React 19 기능에 대해 질문하기</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('단락 완료:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🔄 스트리밍 Markdown 구문 처리

**핵심 문제**: 스트리밍 출력 시 불완전한 Markdown 구문이 렌더링 오류를 일으킬 수 있음

```tsx
// 🚨 문제 시나리오
push('#'); // "# "
push(' '); // "# "
push('제목'); // "# 제목"
push('\n'); // "# 제목\n"
push('1'); // "# 제목\n1"     ← 이것은 단락으로 잘못 해석됨
push('.'); // "# 제목\n1."    ← 올바른 리스트 형성
push(' 항목'); // "# 제목\n1. 항목"
```

**✅ 스마트 솔루션**: 컴포넌트 내장 동기 버퍼링 메커니즘

```tsx
// 컴포넌트가 구문 경계를 지능적으로 처리
const handleStreamingMarkdown = () => {
  const chunks = ['#', ' ', '사용', '기술', '\n', '1', '.', ' ', '기술1', '\n', '2', '.', ' 기술2'];

  chunks.forEach((chunk) => {
    markdownRef.current?.push(chunk, 'answer');
    // 지연 불필요, 컴포넌트 내부에서 지능적 버퍼링
  });
};

// 🧠 스마트 처리 플로우:
// 1. "# 사용기술\n1" 구문 불완전 실시간 감지
// 2. 스마트 버퍼링, 더 많은 문자 대기
// 3. "."을 받아 "1." 형성 후 즉시 처리
// 4. 지연 없음, 순수 동기 처리
```

**지원되는 구문 감지**:

````typescript
// ✅ 완전한 구문 (즉시 처리)
'## 제목'; // 완전한 제목
'1. 리스트 항목'; // 완전한 리스트 항목
'- 항목'; // 완전한 무순서 리스트
'> 인용 콘텐츠'; // 완전한 인용
'```javascript'; // 코드 블록 시작
'```'; // 코드 블록 끝
'개행으로 끝나는 콘텐츠\n'; // 개행 경계

// 🔄 불완전한 구문 (스마트 버퍼링)
'##'; // 제목 기호만
'1'; // 숫자만
'```java'; // 가능한 코드 블록 시작
````

---

## 🔧 모범 사례

### 1. 성능 최적화

```tsx
// ✅ 추천 구성
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30ms가 최적 경험
/>

// ❌ 너무 작은 간격 피하기
<DsMarkdown interval={1} /> // 성능 문제를 일으킬 수 있음
```

### 2. 스트리밍 데이터 처리

```tsx
// ✅ 추천: 명령형 API
const ref = useRef<MarkdownCMDRef>(null);
useEffect(() => {
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);

// ❌ 피하기: 빈번한 children 업데이트
const [content, setContent] = useState('');
// 각 업데이트마다 전체 콘텐츠를 다시 파싱
```

### 3. 타입 안전성

```tsx
import { MarkdownCMDRef } from 'ds-markdown';

const ref = useRef<MarkdownCMDRef>(null);
// 완전한 TypeScript 타입 힌트
```

### 4. 스타일 커스터마이징

```css
/* 사고 영역 스타일 */
.ds-markdown-thinking {
  background: rgba(255, 193, 7, 0.1);
  border-left: 3px solid #ffc107;
  padding: 12px;
  border-radius: 6px;
  margin: 8px 0;
}

/* 답변 영역 스타일 */
.ds-markdown-answer {
  color: #333;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 코드 블록 스타일 */
.ds-markdown pre {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

/* 테이블 스타일 */
.ds-markdown-table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
}

.ds-markdown-table th,
.ds-markdown-table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}
```

---

## 🌐 호환성

| 환경           | 버전 요구사항                       | 설명                  |
| -------------- | ----------------------------------- | --------------------- |
| **React**      | 16.8.0+                             | Hooks 지원 필요       |
| **TypeScript** | 4.0+                                | 선택사항, 하지만 추천 |
| **브라우저**   | Chrome 60+, Firefox 55+, Safari 12+ | 모던 브라우저         |
| **Node.js**    | 14.0+                               | 빌드 환경             |

---

## 🤝 기여 가이드

Issue와 Pull Request 제출을 환영합니다!

1. 이 리포지토리 포크
2. 기능 브랜치 생성: `git checkout -b feature/amazing-feature`
3. 변경사항 커밋: `git commit -m 'Add amazing feature'`
4. 브랜치 푸시: `git push origin feature/amazing-feature`
5. Pull Request 제출

---

## 📄 라이선스

MIT © [onshinpei](https://github.com/onshinpei)

---

<div align="center">
  <strong>이 프로젝트가 도움이 되었다면, ⭐️ Star로 지원해주세요!</strong>
  
  <br><br>
  
  [🐛 문제 보고](https://github.com/onshinpei/ds-markdown/issues) | 
  [💡 기능 제안](https://github.com/onshinpei/ds-markdown/issues) | 
  [📖 문서 보기](https://onshinpei.github.io/ds-markdown/)
</div>
