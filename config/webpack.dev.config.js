let baseConfig = require('./webpack.base.config');

const config = {
	...baseConfig,

	mode: 'development',

	optimization: {
		minimize: false
	}
};

module.exports = config;
