import chokidar from 'chokidar';

const watcher = chokidar.watch('.', {
  ignored: /node_modules/,
  persistent: true
});

watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`));
