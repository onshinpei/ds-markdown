# ds-markdown

> 🚀 高性能 React Markdown タイピングアニメーションコンポーネント、DeepSeek チャットインターフェース効果を完璧に再現

**[🇨🇳 中文](./README.md) | [🇺🇸 English](./README.en.md) | 🇯🇵 日本語 | [🇰🇷 한국어](./README.ko.md)**

現代の AI アプリケーション向けに特別に設計された React コンポーネントで、滑らかなリアルタイムタイピングアニメーションと完全な Markdown レンダリング機能を提供します。

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 オンラインデモ](https://onshinpei.github.io/ds-markdown/)

[DEMO：🔧 StackBlitz 体験](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)

---

## ✨ コア機能

### 🤖 **AI 会話シナリオ**

- [DeepSeek ウェブサイト](https://chat.deepseek.com/) のチャット応答効果を1:1で再現
- 思考プロセス（`thinking`）と回答内容（`answer`）の両方のモードをサポート
- ストリーミングデータに完璧に対応、ユーザー入力への遅延ゼロ応答

### 📊 **コンテンツ表示シナリオ**

- コードハイライト、テーブル、リストなどを含む完全な Markdown 構文サポート
- 数式レンダリング (KaTeX)、`$...$` と `\[...\]` 構文をサポート
- ライト/ダークテーマサポート、様々なプロダクトスタイルに対応
- remark/rehype プラグイン拡張をサポートするプラグインアーキテクチャ

### �� **開発者エクスペリエンス**

- タイピングの中断 `stop` と再開 `resume` をサポート
- タイピングの無効化と有効化をサポート

### 🎬 **滑らかなアニメーション**

- デュアルタイマーモード最適化、`requestAnimationFrame` と `setTimeout` モードをサポート
- 高頻度タイピングサポート（`requestAnimationFrame` モードでは `0ms` に近いタイピング間隔をサポート）
- フレーム同期レンダリング、ブラウザのリフレッシュレートと完璧にマッチ
- スマート文字バッチ処理により、より自然な視覚効果

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

### ESM CDN での使用

インストール不要、ブラウザで直接使用できます：

[DEMO](https://stackblitz.com/edit/stackblitz-starters-7vcclcw7?file=index.html)

```html
<!-- スタイルのインポート、必須 -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/style.css" />

<!-- katex数学公式スタイルのインポート、必要な場合のみ -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/katex.css" />

<!-- コンポーネントのインポート -->
<script type="module">
  import Markdown from 'https://esm.sh/ds-markdown';
</script>
```

## 🚀 5分クイックスタート

### 基本的な使用法

[DEMO](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx)

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

### タイピングアニメーションの無効化

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function StaticDemo() {
  const [disableTyping, setDisableTyping] = useState(false);

  return (
    <div>
      <button onClick={() => setDisableTyping(!disableTyping)}>{disableTyping ? '有効' : '無効'}にするタイピング効果</button>

      <DsMarkdown interval={20} answerType="answer" disableTyping={disableTyping}>
        # 静的表示モード `disableTyping` が `true` の場合、コンテンツはタイピングアニメーション効果なしで即座に全て表示されます。これは特定のシナリオで非常に有用です： - 📄 静的ドキュメント表示 - 🔄
        表示モードの切り替え - ⚡ コンテンツの素早いプレビュー
      </DsMarkdown>
    </div>
  );
}
```

### 数式サポート

```tsx
import DsMarkdown from 'ds-markdown';
// 数式を表示する必要がある場合は、数式変換プラグインを取り込む
import { katexPlugin } from 'ds-markdown/plugins';
import 'ds-markdown/style.css';
// 数式を表示する必要がある場合は、数学公式スタイルを取り込む
import 'ds-markdown/katex.css';

function MathDemo() {
  return (
    <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
      # ピタゴラスの定理 直角三角形では、斜辺の二乗は二つの直角辺の二乗の和に等しい： $a^2 + b^2 = c^2$ ここで： - $a$ と $b$ は直角辺 - $c$ は斜辺 古典的な「勾三股四弦五」の場合： $c = \sqrt
      {3 ^ (2 + 4) ^ 2} = \sqrt{25} = 5$
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

### デフォルトエクスポート DsMarkdown と MarkdownCMD の props

```js
import DsMarkdown, { MarkdownCMD } from 'ds-markdown';
```

| プロパティ      | 型                                            | 説明                               | デフォルト                                                            |
| --------------- | --------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------- |
| `interval`      | `number`                                      | タイピング間隔（ミリ秒）           | `30`                                                                  |
| `timerType`     | `'setTimeout'` \| `'requestAnimationFrame'`   | タイマータイプ                     | 現在のデフォルトは`setTimeout`、後で`requestAnimationFrame`に変更予定 |
| `answerType`    | `'thinking'` \| `'answer'`                    | コンテンツタイプ（スタイルに影響） | `'answer'`                                                            |
| `theme`         | `'light'` \| `'dark'`                         | テーマタイプ                       | `'light'`                                                             |
| `plugins`       | `IMarkdownPlugin[]`                           | プラグイン設定                     | `[]`                                                                  |
| `math`          | [IMarkdownMath](#IMarkdownMath)               | 数式設定                           | `{ splitSymbol: 'dollar' }`                                           |
| `onEnd`         | `(data: EndData) => void`                     | タイピング完了コールバック         | -                                                                     |
| `onStart`       | `(data: StartData) => void`                   | タイピング開始コールバック         | -                                                                     |
| `onTypedChar`   | `(data: `[ITypedChar](#ITypedChar)`) => void` | 文字ごとのタイピングコールバック   | -                                                                     |
| `disableTyping` | `boolean`                                     | タイピングアニメーション効果を無効 | `false`                                                               |

> 注意： タイピング中に `disableTyping` が `true` から `false` に変わると、次のタイピングトリガー時に残りの全文字が一度に表示されます。

### ITypedChar

| プロパティ     | 型       | 説明                             | デフォルト |
| -------------- | -------- | -------------------------------- | ---------- |
| `percent`      | `number` | タイピング進行パーセンテージ     | `0`        |
| `currentChar`  | `string` | 現在タイピング中の文字           | -          |
| `currentIndex` | `number` | 文字列全体での現在のインデックス | `0`        |

#### IMarkdownMath

| プロパティ    | 型                        | 説明                 | デフォルト |
| ------------- | ------------------------- | -------------------- | ---------- |
| `splitSymbol` | `'dollar'` \| `'bracket'` | 数式区切り文字タイプ | `'dollar'` |

**区切り文字の説明：**

- `'dollar'`：`$...$` と `$$...$$` 構文を使用
- `'bracket'`：`\(...\)` と `\[...\]` 構文を使用

#### IMarkdownPlugin

| プロパティ     | 型                        | 説明              | デフォルト |
| -------------- | ------------------------- | ----------------- | ---------- |
| `remarkPlugin` | `unknown`                 | remark プラグイン | -          |
| `rehypePlugin` | `unknown`                 | rehype プラグイン | -          |
| `type`         | `'buildIn'` \| `'custom'` | プラグインタイプ  | -          |
| `id`           | `any`                     | プラグイン固有ID  | -          |

### コンポーネント公開メソッド

#### デフォルトエクスポート DsMarkdown

| メソッド | パラメータ | 説明                 |
| -------- | ---------- | -------------------- |
| `stop`   | -          | タイピングを一時停止 |
| `resume` | -          | タイピングを再開     |

#### MarkdownCMD 公開メソッド

| メソッド          | パラメータ                                  | 説明                               |
| ----------------- | ------------------------------------------- | ---------------------------------- |
| `push`            | `(content: string, answerType: AnswerType)` | コンテンツを追加してタイピング開始 |
| `clear`           | -                                           | 全コンテンツと状態をクリア         |
| `triggerWholeEnd` | -                                           | 手動で完了コールバックを発火       |
| `stop`            | -                                           | タイピングを一時停止               |
| `resume`          | -                                           | タイピングを再開                   |

**使用例：**

```tsx
markdownRef.current?.stop(); // アニメーションを一時停止
markdownRef.current?.resume(); // アニメーションを再開
```

---

## 🧮 数式使用ガイド

[DEMO1：ピタゴラスの定理](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx)

[DEMO2：問題解答](https://stackblitz.com/edit/vitejs-vite-xk9lxagc?file=README.md)

### 基本構文

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

// 1. 数式サポートを有効化
<DsMarkdown plugins={[katexPlugin]}>
  # 数式の例

  // インライン数式
  これはインライン数式です：$E = mc^2$

  // ブロック数式
  $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
</DsMarkdown>
```

### 区切り文字の選択

```tsx
// ドル記号区切り文字を使用（デフォルト）
<DsMarkdown
  plugins={[katexPlugin]}
  math={{ splitSymbol: 'dollar' }}
>
  インライン：$a + b = c$
  ブロック：$$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$$
</DsMarkdown>

// 括弧区切り文字を使用
<DsMarkdown
  plugins={[katexPlugin]}
  math={{ splitSymbol: 'bracket' }}
>
  インライン：\(a + b = c\)
  ブロック：\[\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n\]
</DsMarkdown>
```

### ストリーミング数式

```tsx
// ストリーミング出力での数式を完璧にサポート
const mathContent = [
  'ピタゴラスの定理：',
  '$a^2 + b^2 = c^2$',
  '\n\n',
  'ここで：',
  '- $a$ と $b$ は直角辺\n',
  '- $c$ は斜辺\n\n',
  '古典的な「勾三股四弦五」の場合：\n',
  '$c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$\n\n',
  'この定理は幾何学で広く応用されています！',
];

mathContent.forEach((chunk) => {
  markdownRef.current?.push(chunk, 'answer');
});
```

### スタイルカスタマイズ

```css
/* 数式スタイルカスタマイズ */
.katex {
  font-size: 1.1em;
}

.katex-display {
  margin: 1em 0;
  text-align: center;
}

/* ダークテーマ対応 */
[data-theme='dark'] .katex {
  color: #e1e1e1;
}
```

---

## 🔌 プラグインシステム

### 内蔵プラグイン

#### KaTeX 数式プラグイン

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

// 数式サポートを有効化
<DsMarkdown plugins={[katexPlugin]}>数式：$E = mc^2$</DsMarkdown>;
```

### カスタムプラグイン

```tsx
import { createBuildInPlugin } from 'ds-markdown/plugins';

// カスタムプラグインを作成
const customPlugin = createBuildInPlugin({
  remarkPlugin: yourRemarkPlugin,
  rehypePlugin: yourRehypePlugin,
  id: Symbol('custom-plugin'),
});

// カスタムプラグインを使用
<DsMarkdown plugins={[katexPlugin, customPlugin]}>コンテンツ</DsMarkdown>;
```

---

## 🎛️ タイマーモード詳細

### `requestAnimationFrame` モード 🌟 (推奨)

```typescript
// 🎯 特徴
- 時間駆動：実際の経過時間に基づいて文字数を計算
- バッチ処理：単一フレーム内で複数文字を処理可能
- フレーム同期：ブラウザの60fpsリフレッシュレートと同期
- 高頻度最適化：interval < 16msの高速タイピングを完璧にサポート

// 🎯 適用シナリオ
- モダンWebアプリケーションのデフォルト選択
- 滑らかなアニメーション効果の追求
- 高頻度タイピング (interval > 0 で十分)
- AI リアルタイム会話シナリオ
```

### `setTimeout` モード 📟 (互換)

```typescript
// 🎯 特徴
- 単一文字：毎回正確に一文字を処理
- 固定間隔：設定時間通りに厳密実行
- リズム感：クラシックタイプライターのリズム感
- 精密制御：特定のタイミング要件に適している

// 🎯 適用シナリオ
- 精密な時間制御が必要
- レトロタイプライター効果の創出
- 互換性要件が高いシナリオ
```

### 📊 パフォーマンス比較

| 特徴                             | requestAnimationFrame               | setTimeout           |
| -------------------------------- | ----------------------------------- | -------------------- |
| **文字処理**                     | フレームあたり複数文字              | 一度に一文字         |
| **高頻度間隔**                   | ✅ 優秀 (5ms → フレームあたり3文字) | ❌ ラグ可能性あり    |
| **低頻度間隔**                   | ✅ 正常 (100ms → 6フレーム後1文字)  | ✅ 精密              |
| **視覚効果**                     | 🎬 滑らかなアニメーション感         | ⚡ 精密なリズム感    |
| **パフォーマンスオーバーヘッド** | 🟢 低 (フレーム同期)                | 🟡 中程度 (タイマー) |

高頻度は `requestAnimationFrame` 推奨、低頻度は `setTimeout` 推奨

---

## 💡 実戦例

### 📝 AI ストリーミング会話

[DEMO: 🔧 StackBlitz 体験](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)

````tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  // AI ストリーミング応答のシミュレート
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // 思考段階
    markdownRef.current?.push('🤔 あなたの質問を分析中...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ 分析完了、回答開始', 'thinking');

    // ストリーミング回答
    const chunks = [
      '# React 19 新機能解析\n\n',
      '## 🚀 React Compiler\n',
      'React 19 の最大のハイライトは **React Compiler** の導入です：\n\n',
      '- 🎯 **自動最適化**：手動でのmemoやuseMemoが不要\n',
      '- ⚡ **パフォーマンス向上**：コンパイル時最適化、ランタイムゼロオーバーヘッド\n',
      '- 🔧 **後方互換性**：既存コードの修正不要\n\n',
      '## 📝 Actions でフォーム簡素化\n',
      '新しい Actions API でフォーム処理がより簡単に：\n\n',
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
      <button onClick={simulateAIResponse}>🤖 React 19 新機能について質問</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('セクション完了:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🧮 数式ストリーミングレンダリング

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

function MathStreamingDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  const simulateMathResponse = async () => {
    markdownRef.current?.clear();

    const mathChunks = [
      '# ピタゴラスの定理詳解\n\n',
      '直角三角形では、斜辺の二乗は二つの直角辺の二乗の和に等しい：\n\n',
      '$a^2 + b^2 = c^2$\n\n',
      'ここで：\n',
      '- $a$ と $b$ は直角辺\n',
      '- $c$ は斜辺\n\n',
      '古典的な「勾三股四弦五」の場合：\n',
      '$c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$\n\n',
      'この定理は幾何学で広く応用されています！',
    ];

    for (const chunk of mathChunks) {
      await delay(150);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={simulateMathResponse}>📐 ピタゴラスの定理を説明</button>

      <MarkdownCMD ref={markdownRef} interval={20} timerType="requestAnimationFrame" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }} />
    </div>
  );
}
```

## 🔧 ベストプラクティス

### 1. パフォーマンス最適化

```tsx
// ✅ 推奨設定
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30ms が最適な体験
/>

// ❌ 過小な間隔は避ける
<DsMarkdown interval={1} /> // パフォーマンス問題を引き起こす可能性
```

### 2. ストリーミングデータ処理

```tsx
// ✅ 推奨：命令的 API
const ref = useRef<MarkdownCMDRef>(null);
useEffect(() => {
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);

// ❌ 避ける：頻繁な children 更新
const [content, setContent] = useState('');
// 各更新で全コンテンツを再解析
```

### 3. 数式最適化

```tsx
// ✅ 推奨：オンデマンドで数式スタイルを読み込み
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css'; // 必要な時のみインポート

// ✅ 推奨：適切な区切り文字の使用
// シンプルな数式には $...$ がより簡潔
// 複雑な数式には $$...$$ がより明確

// ✅ 推奨：プラグイン設定
import { katexPlugin } from 'ds-markdown/plugins';
<DsMarkdown plugins={[katexPlugin]}>数式コンテンツ</DsMarkdown>;
```

### 4. 型安全性

```tsx
import { MarkdownCMDRef } from 'ds-markdown';

const ref = useRef<MarkdownCMDRef>(null);
// 完全な TypeScript 型ヒント
```

### 5. スタイルカスタマイズ

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

/* 数式スタイル */
.katex {
  font-size: 1.1em;
}

.katex-display {
  margin: 1em 0;
  text-align: center;
}

/* ダークテーマ数式 */
[data-theme='dark'] .katex {
  color: #e1e1e1;
}
```

---

## 🌐 互換性

| 環境           | バージョン要件                      | 説明                |
| -------------- | ----------------------------------- | ------------------- |
| **React**      | 16.8.0+                             | Hooksサポートが必要 |
| **TypeScript** | 4.0+                                | オプションだが推奨  |
| **ブラウザ**   | Chrome 60+, Firefox 55+, Safari 12+ | モダンブラウザ      |
| **Node.js**    | 14.0+                               | ビルド環境          |

---

## 🤝 貢献ガイド

Issue と Pull Request の提出を歓迎します！

1. このリポジトリをFork
2. 機能ブランチを作成：`git checkout -b feature/amazing-feature`
3. 変更をコミット：`git commit -m 'Add amazing feature'`
4. ブランチをプッシュ：`git push origin feature/amazing-feature`
5. Pull Request を提出

---

## 📄 ライセンス

MIT © [onshinpei](https://github.com/onshinpei)

---

<div align="center">
  <strong>このプロジェクトがお役に立てば、⭐️ Star をお願いします！</strong>
  
  <br><br>
  
  [🐛 問題報告](https://github.com/onshinpei/ds-markdown/issues) | 
  [💡 機能提案](https://github.com/onshinpei/ds-markdown/issues) | 
  [📖 ドキュメント閲覧](https://onshinpei.github.io/ds-markdown/)
</div>
