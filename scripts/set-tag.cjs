// scripts/set-tag.cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const packagePath = path.join(__dirname, '../package.json');
const packageData = require(packagePath);
const packageName = packageData.name;

// ─── helpers ──────────────────────────────────────────────────────────────────

function bumpVersion(ver, type) {
  const [major, minor, patch] = ver.split('.').map(Number);
  if (type === 'patch') return `${major}.${minor}.${patch + 1}`;
  if (type === 'minor') return `${major}.${minor + 1}.0`;
  if (type === 'major') return `${major + 1}.0.0`;
  throw new Error(`Unknown bump type: ${type}`);
}

function getNpmVersion(tag) {
  try {
    return execSync(`npm view ${packageName} dist-tags.${tag} 2>/dev/null`).toString().trim();
  } catch {
    return null;
  }
}

function stripBeta(ver) {
  return ver.includes('-') ? ver.split('-')[0] : ver;
}

function isBetaVersion(ver) {
  return ver.includes('beta');
}

function prompt(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function createRL() {
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

// ─── select version via numbered menu ────────────────────────────────────────

async function selectVersion(rl, choices, label) {
  console.log(`\n${label}`);
  choices.forEach((c, i) => console.log(`  ${i + 1}) ${c}`));
  console.log(`  ${choices.length + 1}) 自定义`);

  while (true) {
    const input = (await prompt(rl, `请选择 (1-${choices.length + 1}): `)).trim();
    const idx = parseInt(input, 10);

    if (idx >= 1 && idx <= choices.length) {
      return choices[idx - 1];
    }

    if (idx === choices.length + 1) {
      while (true) {
        const custom = (await prompt(rl, '请输入自定义版本号 (回车确认): ')).trim();
        if (custom) return custom;
        console.log('  ⚠️  版本号不能为空，请重新输入。');
      }
    }

    console.log(`  ⚠️  无效输入，请输入 1 到 ${choices.length + 1} 之间的数字。`);
  }
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const currentBranch = execSync('git branch --show-current').toString().trim();
  const rl = createRL();

  try {
    if (currentBranch === 'main') {
      // ── main 分支：发布正式版 ──────────────────────────────────────────────
      console.log('\n📦 正在从 npm 获取最新 latest 版本号...');
      const latestVersion = getNpmVersion('latest') || packageData.version;
      const baseVersion = stripBeta(latestVersion);

      console.log(`\n当前 npm latest 版本: \x1b[36m${baseVersion}\x1b[0m`);

      const confirm = (await prompt(rl, '\n你正在 main 分支，是否要发布正式版？(Y/N): ')).trim();
      if (confirm !== 'Y' && confirm !== 'y') {
        console.log('\n已取消发布。');
        process.exit(0);
      }

      const choices = [
        bumpVersion(baseVersion, 'patch'),  // e.g. 1.1.1
        bumpVersion(baseVersion, 'minor'),  // e.g. 1.2.0
        bumpVersion(baseVersion, 'major'),  // e.g. 2.0.0
      ];

      const selected = await selectVersion(
        rl,
        choices,
        `当前 latest 为 ${baseVersion}，请选择新版本号：`,
      );

      packageData.version = selected;
      packageData.publishConfig = { tag: 'latest' };
      fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
      console.log('\x1b[32m%s\x1b[0m', `\n✅ 版本号已更新为: ${packageData.version}`);
    } else {
      // ── 非 main 分支：发布 beta 版 ────────────────────────────────────────
      console.log('\n📦 正在从 npm 获取最新 beta 版本号...');
      const betaVersion = getNpmVersion('beta');

      let choices;

      if (betaVersion && isBetaVersion(betaVersion)) {
        // npm 上已有 beta 版本，在其基础上递增 beta 序号
        const baseOfBeta = stripBeta(betaVersion);                         // e.g. "1.1.1"
        const betaSeq = parseInt(betaVersion.split('-beta.')[1], 10);      // e.g. 0

        console.log(`\n当前 npm beta  版本: \x1b[33m${betaVersion}\x1b[0m`);

        choices = [
          `${baseOfBeta}-beta.${betaSeq + 1}`,                             // 同基版本，序号 +1
          `${bumpVersion(baseOfBeta, 'minor')}-beta.0`,                    // minor 升级
          `${bumpVersion(baseOfBeta, 'major')}-beta.0`,                    // major 升级
        ];
      } else {
        // npm 上没有 beta，或者 beta 是正式版，基于 latest 生成
        const latestVersion = getNpmVersion('latest') || packageData.version;
        const baseVersion = stripBeta(latestVersion);

        console.log(`\n当前 npm latest 版本: \x1b[36m${baseVersion}\x1b[0m`);
        console.log('当前 npm beta  版本: \x1b[33m无\x1b[0m');

        choices = [
          `${bumpVersion(baseVersion, 'patch')}-beta.0`,                   // e.g. 1.1.1-beta.0
          `${bumpVersion(baseVersion, 'minor')}-beta.0`,                   // e.g. 1.2.0-beta.0
          `${bumpVersion(baseVersion, 'major')}-beta.0`,                   // e.g. 2.0.0-beta.0
        ];
      }

      const selected = await selectVersion(
        rl,
        choices,
        '请选择 beta 版本号：',
      );

      packageData.version = selected;
      packageData.publishConfig = { tag: 'beta' };
      fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
      console.log('\x1b[33m%s\x1b[0m', `\n✅ 版本号已更新为: ${packageData.version}`);
    }
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error('\x1b[31m%s\x1b[0m', `\n❌ 发生错误: ${err.message}`);
  process.exit(1);
});
