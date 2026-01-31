#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('\n🚀 启动 ds-markdown 文档开发服务器...\n');

const dev = spawn('next', ['dev'], {
  stdio: 'pipe',
  shell: true
});

let hasShownUrl = false;

dev.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);
  
  // 检测到 Ready 或 Local 后打印正确的访问地址
  if (!hasShownUrl && (output.includes('Ready') || output.includes('Local:'))) {
    const portMatch = output.match(/localhost:(\d+)/);
    const port = portMatch ? portMatch[1] : '3000';
    
    console.log(`\n✨ 文档访问地址: \x1b[36mhttp://localhost:${port}/ds-markdown\x1b[0m\n`);
    hasShownUrl = true;
  }
});

dev.stderr.on('data', (data) => {
  process.stderr.write(data);
});

dev.on('close', (code) => {
  process.exit(code);
});

// 处理终止信号
process.on('SIGINT', () => {
  dev.kill('SIGINT');
});

process.on('SIGTERM', () => {
  dev.kill('SIGTERM');
});

