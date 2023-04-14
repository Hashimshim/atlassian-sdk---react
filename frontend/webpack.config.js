const WrmPlugin = require('atlassian-webresource-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  watch: true,
  entry: {
    app: './src/App.tsx',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new WrmPlugin({
      pluginKey: 'ru.matveev.alexey.atlas.jira.jira-react-atlaskit',
      locationPrefix: 'frontend/',
      contextMap: {
        app: ['app'],
      },
      watch: true,
      xmlDescriptors: path.resolve('../backend/src/main/resources', 'META-INF', 'plugin-descriptors', 'wr-defs.xml'),
    }),
  ],
  output: {
    filename: 'bundled.[name].js',
    path: path.resolve('../backend/src/main/resources/frontend'),
  },
};
