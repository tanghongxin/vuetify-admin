const requirePlugins = require.context('./', true, /\.js$/);

requirePlugins.keys().forEach(fileName => {
  if (fileName === './index.js') return;
  requirePlugins(fileName);
});
