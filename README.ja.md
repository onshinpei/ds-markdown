# ds-markdown

> 🚀 高性能 React Markdown タイピングアニメーションコンポーネント、DeepSeek チャットインターフェース効果を完璧に再現

**[🇨🇳 中文](./README.md) | [🇺🇸 English](./README.en.md) | 🇯🇵 日本語 | [🇰🇷 한국어](./README.ko.md)**

現代の AI アプリケーション向けに特別に設計された React コンポーネントで、滑らかなリアルタイムタイピングアニメーションと完全な Markdown レンダリング機能を提供します。

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 ライブデモ](https://onshinpei.github.io/ds-markdown/) | [🔧 StackBlitz 体験](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)

---

## ✨ コア機能

### 🎯 **完璧な再現**

- [DeepSeek ウェブサイト](https://chat.deepseek.com/) チャット応答効果の 1:1 再現
- 思考プロセス（`thinking`）と回答コンテンツ（`answer`）の両モードをサポート
- コードハイライト、テーブル、リストなどを含むネイティブ Markdown 構文サポート

### ⚡ **究極のパフォーマンス**

- スマートバッチ処理により、大容量ドキュメントでもラグゼロレンダリング
- デュアルタイマーモード：`requestAnimationFrame` + `setTimeout`
- 内蔵ストリーミング構文バッファリングで、不完全な Markdown レンダリングエラーを回避

### 🎬 **滑らかなアニメーション**

- 高頻度タイピングサポート（`requestAnimationFrame` モードでは `0ms` に近いタイピング間隔をサポート）
- フレーム同期レンダリング、ブラウザの 60fps と完璧にマッチ
- スマート文字バッチ処理により、より自然な視覚効果

### 🔧 **柔軟で使いやすい**

- **宣言的 API**：シンプルなシナリオに適し、React スタイル
- **命令的 API**：ストリーミングデータに適し、より良いパフォーマンス
- **ネイティブ TypeScript サポート**：完全な型ヒント

---

## 📦 クイックインストール

```bash
# npm
npm install ds-markdown

# yarn
yarn add ds-markdown

# pnpm
pnpm add ds-markdown
```

## 🚀 5分クイックスタート

### 基本的な使用法

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function App() {
  return (
    <DsMarkdown interval={20} answerType="answer">
      # Hello ds-markdown これは**高性能**なタイピングアニメーションコンポーネントです！ ## 機能 - ⚡ ゼロ遅延ストリーミング処理 - 🎬 滑らかなタイピングアニメーション - 🎯 完璧な構文サポート
    </DsMarkdown>
  );
}
```

### AI 会話シナリオ

```tsx
function ChatDemo() {
  const [thinking, setThinking] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = () => {
    setThinking('🤔 あなたの質問について考えています...');

    setTimeout(() => {
      setAnswer(`# React 19 について

React 19 は多くのエキサイティングな新機能をもたらします：

## 🚀 主要アップデート
1. **React Compiler** - 自動パフォーマンス最適化
2. **Actions** - フォーム処理の簡素化
3. **Document Metadata** - 内蔵 SEO サポート

これらの新機能を一緒に探求しましょう！`);
    }, 2000);
  };

  return (
    <div>
      <button onClick={handleAsk}>AI に質問</button>

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

## 📚 完全 API ドキュメント

### 宣言的 API（初心者におすすめ）

| プロパティ    | 型                                          | 説明                                     | デフォルト                                                               |
| ------------- | ------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| `interval`    | `number`                                    | タイピング間隔（ミリ秒）                 | `30`                                                                     |
| `timerType`   | `'setTimeout'` \| `'requestAnimationFrame'` | タイマー型                               | 現在のデフォルトは `setTimeout`、後で `requestAnimationFrame` に変更予定 |
| `answerType`  | `'thinking'` \| `'answer'`                  | コンテンツタイプ（スタイルテーマに影響） | `'answer'`                                                               |
| `onEnd`       | `(data: EndData) => void`                   | タイピング完了コールバック               | -                                                                        |
| `onStart`     | `(data: StartData) => void`                 | タイピング開始コールバック               | -                                                                        |
| `onTypedChar` | `(data: CharData) => void`                  | 文字単位タイピングコールバック           | -                                                                        |

### 命令的 API（ストリーミングシナリオにおすすめ）

```typescript
import { MarkdownCMD, MarkdownRef } from 'ds-markdown';

interface MarkdownRef {
  push: (content: string, answerType: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
  flushBuffer: (answerType?: AnswerType) => void;
}
```

| メソッド          | パラメータ                                  | 説明                                 |
| ----------------- | ------------------------------------------- | ------------------------------------ |
| `push`            | `(content: string, answerType: AnswerType)` | コンテンツを追加してタイピングを開始 |
| `clear`           | -                                           | すべてのコンテンツと状態をクリア     |
| `triggerWholeEnd` | -                                           | 手動で完了コールバックをトリガー     |
| `flushBuffer`     | `answerType?: AnswerType`                   | バッファーコンテンツを強制フラッシュ |

---

## 🎛️ タイマーモード詳細説明

### `requestAnimationFrame` モード 🌟（推奨）

```typescript
// 🎯 特徴
- 時間駆動：実際の経過時間に基づいて文字数を計算
- バッチ処理：単一フレーム内で複数文字を処理可能
- フレーム同期：ブラウザ 60fps リフレッシュレートと同期
- 高頻度最適化：interval < 16ms の高速タイピングを完璧サポート

// 🎯 適用シナリオ
- 現代 Web アプリケーションのデフォルト選択
- 滑らかなアニメーション効果を追求
- 高頻度タイピング（interval > 0 で十分）
- AI リアルタイム会話シナリオ
```

### `setTimeout` モード 📟（互換性）

```typescript
// 🎯 特徴
- 単一文字：一度に正確に一文字を処理
- 固定間隔：設定時間に従って厳密に実行
- リズム感：クラシックタイプライターのリズム
- 精密制御：特定のタイミング要件に適用

// 🎯 適用シナリオ
- 精密時間制御が必要
- レトロタイプライター効果の作成
- 互換性要件の高いシナリオ
```

### 📊 パフォーマンス比較

| 機能                             | requestAnimationFrame                 | setTimeout            |
| -------------------------------- | ------------------------------------- | --------------------- |
| **文字処理**                     | フレームあたり複数文字を処理可能      | 一度に一文字を処理    |
| **高頻度間隔**                   | ✅ 優秀（5ms → フレームあたり3文字）  | ❌ ラグの可能性       |
| **低頻度間隔**                   | ✅ 通常（100ms → 6フレーム後に1文字） | ✅ 精密               |
| **視覚効果**                     | 🎬 滑らかなアニメーション感           | ⚡ 精密なリズム感     |
| **パフォーマンスオーバーヘッド** | 🟢 低（フレーム同期）                 | 🟡 中程度（タイマー） |

高頻度では `requestAnimationFrame`、低頻度では `setTimeout` を推奨

---

## 💡 実践例

### 📝 AI ストリーミング会話

````tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownRef>(null);

  // AI ストリーミング応答をシミュレート
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // 思考段階
    markdownRef.current?.push('🤔 あなたの質問を分析しています...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ 分析完了、回答を開始します', 'thinking');

    // ストリーミング回答
    const chunks = [
      '# React 19 新機能分析\n\n',
      '## 🚀 React Compiler\n',
      'React 19 の最大のハイライトは **React Compiler** の導入です：\n\n',
      '- 🎯 **自動最適化**：手動の memo と useMemo が不要\n',
      '- ⚡ **パフォーマンス向上**：コンパイル時最適化、ランタイムオーバーヘッドゼロ\n',
      '- 🔧 **後方互換**：既存コードの修正不要\n\n',
      '## 📝 Actions がフォームを簡素化\n',
      '新しい Actions API により、フォーム処理がより簡単になります：\n\n',
      '```tsx\n',
      'function ContactForm({ action }) {\n',
      '  const [state, formAction] = useActionState(action, null);\n',
      '  return (\n',
      '    <form action={formAction}>\n',
      '      <input name="email" type="email" />\n',
      '      <button>送信</button>\n',
      '    </form>\n',
      '  );\n',
      '}\n',
      '```\n\n',
      'この回答がお役に立てれば幸いです！🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div className="chat-container">
      <button onClick={simulateAIResponse}>🤖 React 19 機能について質問</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('段落完了:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🔄 ストリーミング Markdown 構文処理

**核心問題**：ストリーミング出力時、不完全な Markdown 構文がレンダリングエラーを引き起こす可能性

```tsx
// 🚨 問題シナリオ
push('#'); // "# "
push(' '); // "# "
push('タイトル'); // "# タイトル"
push('\n'); // "# タイトル\n"
push('1'); // "# タイトル\n1"     ← これは段落として誤解釈される
push('.'); // "# タイトル\n1."    ← 正しいリストを形成
push(' 項目'); // "# タイトル\n1. 項目"
```

**✅ スマートソリューション**：コンポーネント内蔵同期バッファリングメカニズム

```tsx
// コンポーネントが構文境界を知的に処理
const handleStreamingMarkdown = () => {
  const chunks = ['#', ' ', '使用', 'スキル', '\n', '1', '.', ' ', 'スキル1', '\n', '2', '.', ' スキル2'];

  chunks.forEach((chunk) => {
    markdownRef.current?.push(chunk, 'answer');
    // 遅延不要、コンポーネント内部で知的バッファリング
  });

  // オプション：残りのバッファーコンテンツを手動でフラッシュ
  markdownRef.current?.flushBuffer();
};

// 🧠 スマート処理フロー：
// 1. "# 使用スキル\n1" 構文不完全をリアルタイム検出
// 2. スマートバッファリング、より多くの文字を待機
// 3. "." を受信して "1." を形成後、即座に処理
// 4. ゼロ遅延、純粋同期処理
```

**バッファーメカニズム特徴**：

- ⚡ **ゼロ遅延**：setTimeout なし、純粋同期リアルタイム処理
- 🧠 **スマート境界**：Markdown 構文ルールに基づく境界検出
- 🔄 **リアルタイム分割**：完全構文に遭遇時即座に処理、不完全時はスマートバッファリング
- 🛡️ **安全保証**：残りコンテンツを処理する `flushBuffer()` メソッドを提供

**サポートされる構文検出**：

````typescript
// ✅ 完全構文（即座に処理）
'## タイトル'; // 完全タイトル
'1. リスト項目'; // 完全リスト項目
'- 項目'; // 完全無順序リスト
'> 引用コンテンツ'; // 完全引用
'```javascript'; // コードブロック開始
'```'; // コードブロック終了
'改行で終わるコンテンツ\n'; // 改行境界

// 🔄 不完全構文（スマートバッファリング）
'##'; // タイトル記号のみ
'1'; // 数字のみ
'```java'; // 可能なコードブロック開始
````

---

## 🔧 ベストプラクティス

### 1. パフォーマンス最適化

```tsx
// ✅ 推奨設定
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30ms が最適体験
/>

// ❌ 過小間隔を避ける
<DsMarkdown interval={1} /> // パフォーマンス問題を引き起こす可能性
```

### 2. ストリーミングデータ処理

```tsx
// ✅ 推奨：命令的 API
const ref = useRef<MarkdownRef>(null);
useEffect(() => {
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);

// ❌ 避ける：頻繁な children 更新
const [content, setContent] = useState('');
// 各更新で全体コンテンツを再解析
```

### 3. 型安全

```tsx
import { MarkdownRef } from 'ds-markdown';

const ref = useRef<MarkdownRef>(null);
// 完全な TypeScript 型ヒント
```

### 4. スタイルカスタマイズ

```css
/* 思考エリアスタイル */
.ds-markdown-thinking {
  background: rgba(255, 193, 7, 0.1);
  border-left: 3px solid #ffc107;
  padding: 12px;
  border-radius: 6px;
  margin: 8px 0;
}

/* 回答エリアスタイル */
.ds-markdown-answer {
  color: #333;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* コードブロックスタイル */
.ds-markdown pre {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

/* テーブルスタイル */
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

## 🌐 互換性

| 環境           | バージョン要件                      | 説明                   |
| -------------- | ----------------------------------- | ---------------------- |
| **React**      | 16.8.0+                             | Hooks サポートが必要   |
| **TypeScript** | 4.0+                                | オプション、ただし推奨 |
| **ブラウザ**   | Chrome 60+, Firefox 55+, Safari 12+ | モダンブラウザ         |
| **Node.js**    | 14.0+                               | ビルド環境             |

---

## 🤝 貢献ガイド

Issue と Pull Request の提出を歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成：`git checkout -b feature/amazing-feature`
3. 変更をコミット：`git commit -m 'Add amazing feature'`
4. ブランチをプッシュ：`git push origin feature/amazing-feature`
5. Pull Request を提出

---

## 📄 ライセンス

MIT © [onshinpei](https://github.com/onshinpei)

---

<div align="center">
  <strong>このプロジェクトがお役に立てば、⭐️ Star でサポートしてください！</strong>
  
  <br><br>
  
  [🐛 問題報告](https://github.com/onshinpei/ds-markdown/issues) | 
  [💡 機能提案](https://github.com/onshinpei/ds-markdown/issues) | 
  [📖 ドキュメント参照](https://onshinpei.github.io/ds-markdown/)
</div>
