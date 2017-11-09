const fs = require('fs');
const projectName = 'test';
// const {promiseify} = require('../bin/util');

// const mkdir = promiseify(fs.mkdir, fs);

const tree = [{
  name: projectName,
  type: 'd',
  dirPath: `../src/${projectName}`,
  child: [{
    name: 'main.js',
    type: 'f',
    filepath: `../src/${projectName}/main.js`,
  }, {
    name: `${projectName}.html`,
    type: 'f',
    filepath: `../src/${projectName}/${projectName}.html`,
  }, {
    name: 'states',
    type: 'd',
    dirPath: `../src/${projectName}/states`,
    child: [{
      name: 'Boot.js',
      type: 'f',
      filepath: `../src/${projectName}/states/Boot.js`,
    }, {
      name: 'Created.js',
      type: 'f',
      filepath: `../src/${projectName}/states/Created.js`,
    }, {
      name: 'Over.js',
      type: 'f',
      filepath: `../src/${projectName}/states/Over.js`,
    }, {
      name: 'Play.js',
      type: 'f',
      filepath: `../src/${projectName}/states/Play.js`,
    }, {
      name: 'Preload.js',
      type: 'f',
      filepath: `../src/${projectName}/states/Preload.js`,
    }],
  }, {
    name: 'sprites',
    dirPath: `../src/${projectName}/sprites`,
    type: 'd',
    child: [{
      name: 'Mushroom.js',
      type: 'f',
      filepath: `../src/${projectName}/sprites/Mushroom.js`,
    }],
  }],
}];

const createDir = (args) => {
  fs.mkdirSync(args);
};

const createFile = (filepath) => {
  fs.writeFileSync(filepath, '1111', 'utf-8');
};

const init = (list) => {
  list.forEach((item) => {
    // console.log(item);
    if (item.type === 'd') {
      createDir(item.dirPath);
    } else {
      createFile(item.filepath);
    }
    if (Array.isArray(item.child)) {
      init(item.child);
    }
  });
};

// init(tree);
createDir('../src/tets', '0755');
