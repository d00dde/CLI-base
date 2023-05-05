const fs = require('fs/promises');
const path = require('path');

(async function () {
  const dirPath = path.join(__dirname, 'secret-folder');
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  for (const item of items) {
    if(item.isFile()) {
      const filePath =  path.join(dirPath, item.name);
      const stats = await fs.stat(filePath);
      const extension = path.extname(filePath);
      console.log(`${path.basename(filePath, extension)} - ${extension} - ${stats.size} bytes`);
    }
  }
})();

