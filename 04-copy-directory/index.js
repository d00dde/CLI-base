const fs = require('fs/promises');
const path = require('path');

const srcPath = path.join(__dirname, 'files');
const distPath = path.join(__dirname, 'files-copy');

(async function () {
  await removeDir(distPath);
  await copyFiles(srcPath, distPath);
})();


async function copyFiles(srcPath, distPath) {
  await fs.mkdir(distPath, { recursive: true });
  const items = await fs.readdir(srcPath, { withFileTypes: true });
  for(const item of items) {
    const srcItem = path.join(srcPath, item.name);
    const distItem = path.join(distPath, item.name);
    if(item.isFile()) {
      await fs.copyFile(srcItem, distItem);
    }
    else {
      await copyFiles(srcItem, distItem);
    }
  }
}

async function removeDir(removePath) {
  let items;
  try {
    items = await fs.readdir(removePath, { withFileTypes: true });
  }
  catch(err) {
    return;
  }
  for(const item of items) {
    const itemPath = path.join(removePath, item.name);
    if(item.isFile()) {
      await fs.unlink(itemPath);
    }
    else {
      await removeDir(itemPath);
    }
  }
  try {
    await fs.rmdir(removePath);
  }
  catch(err) {
    // console.log(err);
  }
}

module.exports = {
  copyFiles,
  removeDir,
};
