const fs = require('fs/promises');
const path = require('path');

(async function () {
  const stylesPath = path.join(__dirname, 'styles');
  const distPath = path.join(__dirname, 'project-dist', 'bundle.css');
  try {
    await fs.unlink(distPath);
  } catch(err) {
    // console.log(err);
  }
  await mergeCssFiles(stylesPath, distPath);
})();

async function getCssFiles(dirPath) {
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  const result = [];
  for (const item of items) {
    if(item.isFile()) {
      const filePath = path.join(dirPath, item.name);
      const extension = path.extname(filePath);
      if(extension === '.css') {
        result.push(filePath);
      }
    }
  }
  return result;
}

async function mergeCssFiles(stylesPath, distPath) {
  const cssFiles = await getCssFiles(stylesPath);
  for (const cssFile of cssFiles) {
    const css = await fs.readFile(cssFile);
    await fs.appendFile(distPath, css);
  }
}

module.exports = {
  mergeCssFiles,
};
