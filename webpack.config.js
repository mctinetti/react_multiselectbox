var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "dist");
var APP_DIR = __dirname;

var config = {
  entry: APP_DIR + "/react-multiselectbox.jsx",
  output: {
    path: BUILD_DIR,
    filename: "react-multiselectbox.js",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  mode: "production",
};

module.exports = config;
