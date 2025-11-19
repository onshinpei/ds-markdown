import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 配置
const SRC_DIR = 'src';
const ES_DIR = 'es';

// 清理输出目录
async function cleanDirs() {
  await fs.remove(ES_DIR);
  await fs.ensureDir(ES_DIR);
}

// 编译TypeScript项目
async function compileTypeScript() {
  try {
    // 编译ES Module版本
    console.log('Compiling ES Module version...');
    execSync('npx tsc -p tsconfig.esm.json', { stdio: 'inherit' });
  } catch (error) {
    console.error('TypeScript compilation failed:', error.message);
    throw error;
  }
}

// 处理Less文件
async function processLessFiles() {
  const lessFiles = glob.sync(`${SRC_DIR}/**/*.less`, { nodir: true });

  for (const lessFile of lessFiles) {
    const relativePath = path.relative(SRC_DIR, lessFile);
    const dir = path.dirname(relativePath);
    const name = path.basename(lessFile, '.less');

    const esDir = path.join(ES_DIR, dir);
    await fs.ensureDir(esDir);

    // 编译Less为CSS
    const esOutput = path.join(esDir, `${name}.css`);

    try {
      execSync(`npx lessc ${lessFile} ${esOutput}`, { stdio: 'inherit' });
      console.log(`Compiled ${lessFile} -> ${esOutput}`);
    } catch (error) {
      console.error(`Failed to compile less ${lessFile}:`, error.message);
    }
  }
}

// 复制其他文件
async function copyOtherFiles() {
  const otherFiles = glob.sync(`${SRC_DIR}/**/*`, {
    nodir: true,
    ignore: [`${SRC_DIR}/**/*.{ts,tsx,less}`],
  });

  for (const file of otherFiles) {
    const relativePath = path.relative(SRC_DIR, file);
    const esDest = path.join(ES_DIR, relativePath);

    await fs.ensureDir(path.dirname(esDest));
    await fs.copy(file, esDest);
  }
}

// 后处理：修复ES Module的导入路径
async function postProcessESM() {
  const jsFiles = glob.sync(`${ES_DIR}/**/*.js`, { nodir: true });
  const dtsFiles = glob.sync(`${ES_DIR}/**/*.d.ts`, { nodir: true });

  const files = [...jsFiles, ...dtsFiles];

  for (const file of files) {
    const filePath = path.resolve(__dirname, '..', file);

    let content = await fs.readFile(filePath, 'utf8');

    console.log('filePath', filePath);
    // 修复相对路径导入，确保使用正确的扩展名
    content = content.replace(/(?:from|import)\s+['"](\.\/[^'"]*|\.\.\/[^'"]*)['"]/g, (match, importPath) => {
      // 如果已经有正确的扩展名，直接返回
      if (importPath.endsWith('.js') || importPath.endsWith('.css')) {
        return match;
      }

      // 检查是否是目录导入（没有文件扩展名）
      const importPathWithoutExt = importPath.replace(/\.(js|ts|tsx|less)$/, '');
      const potentialDir = path.join(path.dirname(file), importPathWithoutExt);
      const potentialIndexFile = path.join(potentialDir, 'index.js');

      // 如果存在对应的index.js文件，则使用目录导入
      if (fs.existsSync(potentialIndexFile)) {
        return match.replace(importPath, `${importPathWithoutExt}/index.js`);
      }

      // 检查是否是.less文件导入
      if (importPath.endsWith('.less')) {
        return match.replace(importPath, importPath.replace('.less', '.css'));
      }

      // 否则添加.js扩展名
      return match.replace(importPath, `${importPath}.js`);
    });

    await fs.writeFile(file, content, 'utf8');
  }
}

// 主函数
async function build() {
  try {
    console.log('Cleaning directories...');
    await cleanDirs();

    console.log('Compiling TypeScript...');
    await compileTypeScript();

    console.log('Processing Less files...');
    await processLessFiles();

    console.log('Copying other files...');
    await copyOtherFiles();

    console.log('Post-processing ES modules...');
    await postProcessESM();

    console.log('Build completed successfully!');
    console.log(`Output directory: ${ES_DIR}/ (ES Modules)`);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
