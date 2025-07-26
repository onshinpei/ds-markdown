// scripts/set-tag.js
const { version } = require('../package.json');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');
// 如果当前分支是main，则设置tag为latest，否则设置为beta

const currentBranch = execSync('git branch --show-current').toString().trim();

const packagePath = path.join(__dirname, '../package.json');
const packageData = require(packagePath);

if (currentBranch === 'main') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('你正在 main 分支，是否要发布正式版？(Y/N): ', (answer) => {
    if (answer !== 'Y' && answer !== 'y') {
      console.log('已取消发布。');
      rl.close();
      process.exit(0);
    }
    rl.close();
    proceedMain();
  });
  function proceedMain() {
    packageData.publishConfig = { tag: 'latest' };
    // 如果读取到版本号位 0.0.7-beta.x，则latest版本号设置为0.0.7
    // 0.0.7-beta.x -> 0.0.7
    if (version.includes('beta')) {
      packageData.version = version.split('-')[0];
    } else {
      packageData.version = version.split('.')[0] + '.' + parseInt(version.split('.')[1]) + '.' + (parseInt(version.split('.')[2]) + 1);
    }
    fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
    console.log('\x1b[32m%s\x1b[0m', `✅ 版本号已更新为: ${packageData.version}`);
  }
} else {
  packageData.publishConfig = { tag: 'beta' };

  if (version.includes('beta')) {
    // 如果读取到版本号位 0.0.7-beta.0，则beta版本号设置为0.0.8-beta.1
    packageData.version = version.split('-')[0] + '-beta.' + (parseInt(version.split('-')[1].split('.')[1]) + 1);
  } else {
    // 如果读取到版本号位 0.0.7，则beta版本号设置为0.0.8-beta.0
    packageData.version = version.split('.')[0] + '.' + parseInt(version.split('.')[1]) + '.' + (parseInt(version.split('.')[2]) + 1) + '-beta.0';
  }
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
  console.log('\x1b[33m%s\x1b[0m', `✅ 版本号已更新为: ${packageData.version}`);
}
