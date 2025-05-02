const WrmPlugin = require('atlassian-webresource-webpack-plugin');
const path = require('path');

module.exports = {
module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
 watch: true,
 mode: 'production',
  entry: {
    app: './src/App.tsx',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
   plugins: [
    new WrmPlugin({
      pluginKey: 'ru.matveev.alexey.atlas.jira.jira-react-atlaskit',
      locationPrefix: 'frontend',
      contextMap: { app: ['app'] },
      xmlDescriptors: path.resolve(
        __dirname,
        '../backend/src/main/resources/META-INF/plugin-descriptors/wr-defs.xml'
      ),
      watch: false,
      watchPrepare: false,
    }),
  ],
  output: {
    filename: 'bundled.[name].js',
    path: path.resolve(__dirname, '../backend/src/main/resources/frontend'),
    publicPath: '/jira/plugins/servlet/com.mycompany.jira-react-atlaskit/frontend/',
  },
};
