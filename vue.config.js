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
						target: 'http://121.36.33.251:8081',
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