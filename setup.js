const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const testDirs = argv._;

testDirs.forEach(dir => {
  processDir(dir, true);
});

function processDir(dir, gitkeep) {
  // ensure each dir contains a .gitkeep file so it stays in source control
  if(gitkeep) {
    fs.closeSync(fs.openSync(path.join(dir, '.gitkeep'), 'a'));
  }

  // get all files in the dir
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(err);
    }

    // each file in dir, if not .gitkeep, remove it.
    files.forEach(file => {
      const filePath = path.join(dir, file);

      // if directory, process it
      if(fs.lstatSync(filePath).isDirectory()) {
        processDir(filePath, false);
      } else {
          if (file !== '.gitkeep' || !gitkeep) {
            fs.unlinkSync(filePath);
          }
      }

    });
  });
}