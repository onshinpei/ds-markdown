# 🚀 Full API Demo

This demo showcases all the core features and functionalities of **ds-markdown**.

## ⌨️ Typing Animation Features

### 🎛️ Configurable Parameters

1. **interval**: Controls typing speed, adjustable from 5-200ms
2. **timerType**: Two modes
   - 🎬 **requestAnimationFrame** - Smooth animation, ideal for modern apps
   - ⏰ **setTimeout** - Precise timing, suitable for compatibility needs
3. **theme**: Theme switching
   - ☀️ **light** - Light theme, suitable for daytime use
   - 🌙 **dark** - Dark theme, suitable for nighttime use
4. **answerType**: Content type
   - 💬 **answer** - Answer mode
   - 🤔 **thinking** - Thinking mode

### 🎮 Control Methods

The following ref methods are supported:

- `start()` - Start typing animation
- `stop()` - Pause typing animation
- `resume()` - Resume typing animation
- `restart()` - Restart animation

### 🔄 Callback Monitoring

- **onStart**: Triggered when typing starts
- **onEnd**: Triggered when typing ends
- **onBeforeTypedChar**: Triggered before each character is typed
- **onTypedChar**: Triggered after each character is typed

Monitor all events and data changes during the typing process in real time.

## 🧮 Math Formula Demo

Here are some math formulas:

Inline formula: $E = mc^2$

Block formula:
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

Pythagorean theorem: $a^2 + b^2 = c^2$

## 💡 Best Practice Recommendations

### Performance Optimization

- It is recommended to use **requestAnimationFrame** mode
- Set the interval to **15-30ms** for the best experience
- Enable RAF mode for multi-character processing in high-frequency scenarios

### User Experience

- Choose the appropriate theme based on the usage environment
- Select the suitable answerType according to the content type
- Use callback functions to add custom interactive effects

### Code Example

```typescript
import DsMarkdown from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

<DsMarkdown
  interval={30}
  timerType="requestAnimationFrame"
  theme="light"
  plugins={[katexPlugin]}
  onTypedChar={(data) => {
    console.log('Current char:', data.currentChar);
    console.log('Progress:', data.percent);
  }}
>
  # Hello World
  This is a **typing animation** example.
</DsMarkdown>
```

> 🎯 This is a complete feature demo, showcasing all the core features of the library!

## 🔧 Technical Features

### Type Safety

- Complete TypeScript type definitions
- Intelligent code hints and error checking
- Type-safe ref method calls

### Plugin System

- Supports remark/rehype plugins
- Built-in KaTeX math formula support
- Extensible plugin architecture

### Performance Monitoring

- Real-time FPS monitoring
- Typing speed statistics
- Memory usage optimization

This demo allows you to experience and debug all features in real time!
