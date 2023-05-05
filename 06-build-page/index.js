const fs = require('fs/promises');
const path = require('path');
const { mergeCssFiles } = require('../05-merge-styles');
const { copyFiles, removeDir } = require('../04-copy-directory');

(async function () {
  const distPath = path.join(__dirname, 'project-dist');
  await removeDir(distPath);
  await copyFiles(path.join(__dirname, 'assets'), path.join(distPath, 'assets'));
  await mergeCssFiles(path.join(__dirname, 'styles'), path.join(distPath, 'style.css'));
  await mergeHtml(path.join(__dirname, 'components'), path.join(distPath, 'index.html'));

})();

async function mergeHtml(sourcePath, distPath) {
  let baseHtml = (await fs.readFile(path.join(__dirname, 'template.html'))).toString();
  const components = await readComponents(sourcePath);
  Object.entries(components).forEach(([ key, value ]) => {
    baseHtml = baseHtml.replace(`{{${key}}}`, value);
  });
  await fs.writeFile(distPath, baseHtml);
}

async function readComponents(srcPath) {
  const result = {};
  const items = await fs.readdir(srcPath, { withFileTypes: true });
  for (const item of items) {
    if(item.isFile()) {
      const filePath =  path.join(srcPath, item.name);
      const extension = path.extname(filePath);
      if (extension === '.html') {
        result[path.basename(filePath, extension)] = (await fs.readFile(filePath)).toString();
      }
    }
  }
  return result;
}
