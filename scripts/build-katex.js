import fs from 'fs';
import path from 'path';

// 读取 katex CSS 文件
const katexCssPath = path.join(process.cwd(), 'node_modules', 'katex', 'dist', 'katex.min.css');
const outputPath = path.join(process.cwd(), 'dist', 'katex.css');

try {
  // 确保 dist 目录存在
  const distDir = path.dirname(outputPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 读取 katex CSS 内容
  const katexCss = fs.readFileSync(katexCssPath, 'utf8');

  // 写入到目标文件
  fs.writeFileSync(outputPath, katexCss);

  console.log(`✅ Successfully copied katex CSS to ${outputPath}`);
} catch (error) {
  console.error('❌ Error copying katex CSS:', error.message);
  process.exit(1);
}
