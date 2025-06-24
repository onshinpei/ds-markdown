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

### 🔧 **開発者エクスペリエンス**

- **宣言的 API**：シンプルなシナリオに適し、React スタイル
- **命令的 API**：ストリーミングデータに適し、より良いパフォーマンス
- **ネイティブ TypeScript サポート**：完全な型ヒント
- タイピングの中断 `stop` と再開 `resume` をサポート

### 🎬 **滑らかなアニメーション**

- デュアルタイマーモード最適化、`requestAnimationFrame` と `setTimeout` モードをサポート
- 高頻度タイピングサポート（`requestAnimationFrame` モードでは `0ms` に近いタイピング間隔をサポート）
- フレーム同期レンダリング、ブラウザの 60fps と完璧にマッチ
- スマート文字バッチ処理により、より自然な視覚効果

### 🧮 **数式サポート**

- **KaTeX 統合**：高性能な数式レンダリング
- **プラグインアーキテクチャ**：プラグインシステムによる柔軟な設定
- **デュアル構文サポート**：`$...$` と `\[...\]` の2つの区切り文字
- **ストリーミング対応**：タイピングアニメーションでの数式の完璧なサポート
- **テーマ適応**：ライト/ダークテーマへの自動適応

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
<!-- スタイルのインポート -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/style.css" />
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

### 数式サポート

```tsx
import DsMarkdown from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css'; // 数式スタイルのインポート

function MathDemo() {
  return (
    <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
      # ピタゴラスの定理 直角三角形では、斜辺の二乗は二つの直角辺の二乗の和に等しい： $a^2 + b^2 = c^2$ ここで： - $a$ と $b$ は直角辺 - $c$ は斜辺 古典的な「3-4-5」三角形の場合： $c = \sqrt
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

### 宣言的 API（初心者向け推奨）

| プロパティ    | 型                                          | 説明                             | デフォルト                                                            |
| ------------- | ------------------------------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `interval`    | `number`                                    | タイピング間隔（ミリ秒）         | `30`                                                                  |
| `timerType`   | `'setTimeout'` \| `'requestAnimationFrame'` | タイマータイプ                   | 現在のデフォルトは`setTimeout`、後で`requestAnimationFrame`に変更予定 |
| `answerType`  | `'thinking'` \| `'answer'`                  | コンテンツタイプ                 | `'answer'`                                                            |
| `theme`       | `'light'` \| `'dark'`                       | テーマタイプ                     | `'light'`                                                             |
| `math`        | `IMarkdownMath`                             | 数式設定                         | `{ isOpen: false, splitSymbol: 'dollar' }`                            |
| `onEnd`       | `(data: EndData) => void`                   | タイピング完了コールバック       | -                                                                     |
| `onStart`     | `(data: StartData) => void`                 | タイピング開始コールバック       | -                                                                     |
| `onTypedChar` | `(data: CharData) => void`                  | 文字ごとのタイピングコールバック | -                                                                     |

### 数式設定

| プロパティ    | 型                        | 説明                         | デフォルト |
| ------------- | ------------------------- | ---------------------------- | ---------- |
| `isOpen`      | `boolean`                 | 数式レンダリングを有効にする | `false`    |
| `splitSymbol` | `'dollar'` \| `'bracket'` | 数式区切り文字タイプ         | `'dollar'` |

**区切り文字の説明：**

- `'dollar'`：`$...$` と `$$...$$` 構文を使用
- `'bracket'`：`\(...\)` と `\[...\]` 構文を使用

### 命令的 API（ストリーミングシナリオにおすすめ）

| メソッド          | パラメータ                                  | 説明                                 |
| ----------------- | ------------------------------------------- | ------------------------------------ |
| `push`            | `(content: string, answerType: AnswerType)` | コンテンツを追加してタイピングを開始 |
| `clear`           | -                                           | すべてのコンテンツと状態をクリア     |
| `triggerWholeEnd` | -                                           | 完了コールバックを手動でトリガー     |
| `stop`            | -                                           | タイピングを一時停止                 |
| `resume`          | -                                           | タイピングを再開                     |

**使用例：**

```tsx
markdownRef.current?.stop(); // アニメーションを一時停止
markdownRef.current?.resume(); // アニメーションを再開
```

---

## 🧮 数式使用ガイド

### 基本構文

```tsx
// 1. 数式サポートを有効にする
<DsMarkdown math={{ isOpen: true }}>
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
<DsMarkdown math={{ isOpen: true, splitSymbol: 'dollar' }}>
  インライン：$a + b = c$
  ブロック：$$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$$
</DsMarkdown>

// 括弧区切り文字を使用
<DsMarkdown math={{ isOpen: true, splitSymbol: 'bracket' }}>
  インライン：\(a + b = c\)
  ブロック：\[\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n\]
</DsMarkdown>
```

### ストリーミング数式

```tsx
// ストリーミング出力での数式の完璧なサポート
const mathContent = ['ピタゴラスの定理：', '$a^2 + b^2 = c^2$', '\n\n', 'ここで：', '- $a$ と $b$ は直角辺', '- $c$ は斜辺'];

mathContent.forEach((chunk) => {
  markdownRef.current?.push(chunk, 'answer');
});
```

### スタイルカスタマイズ

```css
/* 数式スタイルのカスタマイズ */
.katex {
  font-size: 1.1em;
}

.katex-display {
  margin: 1em 0;
  text-align: center;
}

/* ダークテーマ適応 */
[data-theme='dark'] .katex {
  color: #e1e1e1;
}
```

---

## 🎛️ タイマーモード詳細

### `requestAnimationFrame` モード 🌟（推奨）

```typescript
// 🎯 特徴
- 時間駆動：実際の経過時間に基づいて文字数を計算
- バッチ処理：1フレーム内で複数の文字を処理可能
- フレーム同期：ブラウザの60fpsリフレッシュレートと同期
- 高頻度最適化：interval < 16msの高速タイピングを完璧にサポート

// 🎯 適用シナリオ
- モダンWebアプリケーションのデフォルト選択
- 滑らかなアニメーション効果を追求
- 高頻度タイピング（interval > 0で十分）
- AIリアルタイム会話シナリオ
```

### `setTimeout` モード 📟（互換性）

```typescript
// 🎯 特徴
- 単一文字：毎回正確に1文字を処理
- 固定間隔：設定された時間に厳密に実行
- ビート感：クラシックタイプライターのリズム感
- 精密制御：特定のタイミング要件に適している

// 🎯 適用シナリオ
- 精密な時間制御が必要
- レトロタイプライター効果を演出
- 互換性要件の高いシナリオ
```

### 📊 パフォーマンス比較

| 特徴                             | requestAnimationFrame               | setTimeout        |
| -------------------------------- | ----------------------------------- | ----------------- |
| **文字処理**                     | 1フレームで複数文字を処理可能       | 毎回1文字を処理   |
| **高頻度間隔**                   | ✅ 優秀（5ms → 1フレーム3文字）     | ❌ ラグの可能性   |
| **低頻度間隔**                   | ✅ 正常（100ms → 6フレーム後1文字） | ✅ 精密           |
| **視覚効果**                     | 🎬 滑らかなアニメーション感         | ⚡ 精密なビート感 |
| **パフォーマンスオーバーヘッド** | 🟢 低（フレーム同期）               | 🟡 中（タイマー） |

高頻度は`requestAnimationFrame`、低頻度は`setTimeout`を推奨

---

## 💡 実践例

### 📝 AI ストリーミング会話

[DEMO: 🔧 StackBlitz 体験](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)

````tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  // AI ストリーミング応答をシミュレート
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // 思考段階
    markdownRef.current?.push('🤔 あなたの質問を分析しています...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ 分析完了、回答を開始', 'thinking');

    // ストリーミング回答
    const chunks = [
      '# React 19 新機能解析\n\n',
      '## 🚀 React Compiler\n',
      'React 19 の最大のハイライトは**React Compiler**の導入です：\n\n',
      '- 🎯 **自動最適化**：手動のmemoとuseMemoが不要\n',
      '- ⚡ **パフォーマンス向上**：コンパイル時最適化、実行時ゼロオーバーヘッド\n',
      '- 🔧 **後方互換性**：既存コードの修正不要\n\n',
      '## 📝 Actions フォーム簡素化\n',
      '新しいActions APIによりフォーム処理がより簡単になります：\n\n',
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
      'この回答がお役に立てば幸いです！🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div className="chat-container">
      <button onClick={simulateAIResponse}>🤖 React 19 新機能について質問</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('段落完了:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🧮 数式ストリーミングレンダリング

```tsx
function MathStreamingDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  const simulateMathResponse = async () => {
    markdownRef.current?.clear();

    const mathChunks = [
      '# ピタゴラスの定理の説明\n\n',
      '直角三角形では、斜辺の二乗は二つの直角辺の二乗の和に等しい：\n\n',
      '$a^2 + b^2 = c^2$\n\n',
      'ここで：\n',
      '- $a$ と $b$ は直角辺\n',
      '- $c$ は斜辺\n\n',
      '古典的な「3-4-5」三角形の場合：\n',
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

      <MarkdownCMD ref={markdownRef} interval={20} timerType="requestAnimationFrame" math={{ isOpen: true, splitSymbol: 'dollar' }} />
    </div>
  );
}
```

### 🔄 ストリーミングMarkdown構文処理

**核心問題**：ストリーミング出力時に不完全なMarkdown構文がレンダリングエラーを引き起こす

```tsx
// 🚨 問題シナリオ
push('#'); // "# "
push(' '); // "# "
push('タイトル'); // "# タイトル"
push('\n'); // "# タイトル\n"
push('1'); // "# タイトル\n1"     ← ここで段落として誤解析される
push('.'); // "# タイトル\n1."    ← 正しいリストを形成
push(' 項目'); // "# タイトル\n1. 項目"
```

**✅ スマート解決策**：内蔵同期バッファリングメカニズム

```tsx
// コンポーネントが構文境界をインテリジェントに処理
const handleStreamingMarkdown = () => {
  const chunks = ['#', ' ', '使用', 'スキル', '\n', '1', '.', ' ', 'スキル1', '\n', '2', '.', ' スキル2'];

  chunks.forEach((chunk) => {
    markdownRef.current?.push(chunk, 'answer');
    // 遅延不要、コンポーネントが内部でインテリジェントにバッファリング
  });
};

// 🧠 インテリジェント処理フロー：
// 1. "# 使用スキル\n1" のような不完全な構文をリアルタイム検出
// 2. インテリジェントバッファリング、より多くの文字を待機
// 3. "." を受信して "1." を形成した後すぐに処理
// 4. ゼロ遅延、純粋な同期処理
```

**サポートされる構文検出**：

````typescript
// ✅ 完全な構文（即座に処理）
'## タイトル'; // 完全なタイトル
'1. リスト項目'; // 完全なリスト項目
'- 項目'; // 完全な順序なしリスト
'> 引用コンテンツ'; // 完全な引用
'```javascript'; // コードブロック開始
'```'; // コードブロック終了
'改行で終わるコンテンツ\n'; // 改行境界
'$a + b$'; // 完全な数式
'$$\\sum x$$'; // 完全なブロック数式

// 🔄 不完全な構文（インテリジェントバッファリング）
'##'; // タイトル記号のみ
'1'; // 数字のみ
'```java'; // 可能性のあるコードブロック開始
'$a +'; // 不完全な数式
````

---

## 🔧 ベストプラクティス

### 1. パフォーマンス最適化

```tsx
// ✅ 推奨設定
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30msが最適な体験
/>

// ❌ 小さすぎる間隔を避ける
<DsMarkdown interval={1} /> // パフォーマンス問題を引き起こす可能性
```

### 2. ストリーミングデータ処理

```tsx
// ✅ 推奨：命令的API
const ref = useRef<MarkdownCMDRef>(null);
useEffect(() => {
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);

// ❌ 避ける：頻繁なchildren更新
const [content, setContent] = useState('');
// 毎回の更新でコンテンツ全体を再解析
```

### 3. 数式最適化

```tsx
// ✅ 推奨：数式スタイルを必要に応じて読み込み
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css'; // 必要な時のみインポート

// ✅ 推奨：区切り文字の合理的な使用
// シンプルな数式には $...$ で簡潔さを
// 複雑な数式には $$...$$ で明確さを

// ❌ 避ける：不要な時に数式を有効にする
<DsMarkdown math={{ isOpen: true }}>プレーンテキストコンテンツ</DsMarkdown>;
```

### 4. 型安全性

```tsx
import { MarkdownCMDRef } from 'ds-markdown';

const ref = useRef<MarkdownCMDRef>(null);
// 完全なTypeScript型ヒント
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
