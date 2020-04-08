module.exports = {
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
		} else {
			// 为开发环境修改配置...
			config.devServer = {
				port: 4000,
				proxy: {
					'/api': {
						target: 'http://192.168.1.65:3100',
						pathRewrite: {
							'^/api': ''
						}
					}
				}
			}
		}
	},
	chainWebpack: config => {
		config
		.plugin('html')
		.tap(args => {
			args[0].title = 'Your new title'
			return args
		})
	}
}