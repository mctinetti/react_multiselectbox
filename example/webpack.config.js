var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "dist");
var APP_DIR = __dirname;

module.exports = {
	entry: path.resolve(__dirname, './example.jsx'),
	
	output: {
		path: BUILD_DIR,
		filename: "example.js",
		libraryTarget: "umd",
		umdNamedDefine: true,
	},
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname),
		  },
		  compress: true,
		  port: 3001,
		  host: '127.0.0.1',
	},
	  module: {
		rules: [
			{
				test:       /\.jsx?$/,
				exclude:    /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
								 [
									"@babel/preset-env",
									{
										"useBuiltIns": "entry", // imports feature directly entry point where there is a neeed of polyfill
										"corejs": "3.16",
										"targets": {
											"ie": "11",
										}
									}
									//Example environments: chrome, opera, edge, firefox, safari, ie, ios, android, node
								],
								"@babel/preset-react"
							],
						}
					}
				},
				
				
				{
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
				type: 'asset/inline'
            },
            {
                test: /\.css$/,
                exclude: path.join(__dirname, 'post-css'),
                use:['style-loader','css-loader']
            },
			
			
				
		],
	  },
  mode: 'development',
};