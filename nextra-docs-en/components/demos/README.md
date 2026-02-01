# Demo Component Usage Guide

This directory contains interactive demo components that can be used in Nextra documentation.

## Directory Structure

```
components/demos/
├── DemoContainer.tsx      # Universal demo container component
├── BasicUsageDemo.tsx     # Basic usage demo
├── index.ts               # Unified export file
└── README.md             # This file
```

## How to Use in MDX

### 1. Import components at the top of MDX file

```mdx
import { BasicUsageDemo } from '../../components/demos'
```

### 2. Use components in content

```mdx
# Example Page

This is some description text...

## Live Demo

<BasicUsageDemo />

More content...
```

## Creating New Demo Components

### Step 1: Create component file

Create a new component file in the `components/demos/` directory, for example `CustomThemeDemo.tsx`:

```tsx
'use client';

import React from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown from 'ds-markdown';

export const CustomThemeDemo: React.FC = () => {
  return (
    <DemoContainer 
      title="Custom Theme Demo" 
      description="Demonstrates how to customize theme styles"
    >
      <div className="demo-impl demo-impl-light">
        {/* Your demo code */}
        <DsMarkdown>
          # Custom Theme
        </DsMarkdown>
      </div>
    </DemoContainer>
  );
};

export default CustomThemeDemo;
```

### Step 2: Export in index.ts

```ts
export { default as CustomThemeDemo } from './CustomThemeDemo';
```

### Step 3: Use in MDX

```mdx
import { CustomThemeDemo } from '../../components/demos'

<CustomThemeDemo />
```

## Style Guide

All styles are defined in `styles/demos.css`, mainly including:

### Container Classes
- `.demo-container` - Outer container style for demo
- `.demo-content` - Demo content area
- `.demo-impl` - Demo implementation area
- `.demo-impl-light` / `.demo-impl-dark` - Light/dark themes

### Control Classes
- `.demo-controls` - Control button area
- `.demo-preview` - Preview area

### Button Classes
- `.demo-btn` - Base button style
- `.demo-btn-success` - Success button (green)
- `.demo-btn-warning` - Warning button (orange)
- `.demo-btn-danger` - Danger button (red)
- `.demo-btn-secondary` - Secondary button (gray)
- `.demo-btn-outline` - Outline button

## Best Practices

### 1. Use DemoContainer

Always wrap your demo with `DemoContainer` for consistent appearance:

```tsx
<DemoContainer title="Title" description="Description">
  {/* Your demo content */}
</DemoContainer>
```

### 2. Add 'use client' Directive

Since demo components often contain interactions and state, remember to add at the top of the file:

```tsx
'use client';
```

### 3. Viewport Detection

For auto-playing demos, use IntersectionObserver to detect when component enters viewport:

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Start demo
      }
    },
    { threshold: 0.3 }
  );
  
  if (containerRef.current) {
    observer.observe(containerRef.current);
  }
  
  return () => observer.disconnect();
}, []);
```

### 4. Responsive Design

Ensure your demos work well on mobile devices:

```css
@media (max-width: 768px) {
  /* Mobile style adjustments */
}
```

## Notes

1. **Performance Optimization**: Avoid excessive real-time updates and animations in demos
2. **Error Handling**: Provide friendly error messages, especially when dependencies are not installed
3. **Resource Cleanup**: Release resources in useEffect cleanup functions (timers, observers, etc.)
4. **Accessibility**: Add appropriate aria labels and disabled states for buttons

## Installing Dependencies

Make sure `ds-markdown` is installed:

```bash
npm install ds-markdown
```

or

```bash
pnpm add ds-markdown
```

## Development & Debugging

Run the development server:

```bash
npm run dev
```

Then visit http://localhost:3000 to see your demos.
