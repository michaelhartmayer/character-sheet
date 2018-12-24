let baseConfig = require('./webpack.base.config');

const config = {
	...baseConfig,

	mode: 'production',

	optimization: {
		minimize: true
	}
};

module.exports = config;
