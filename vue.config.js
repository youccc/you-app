/**
 * vue配置
 */

module.exports = {
  runtimeCompiler: true, // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右
  publicPath: process.env.NODE_ENV === 'development'
      ? './'
      : './', // 配置环境变量的更换
  // outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  // indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  lintOnSave: true, // 是否在保存的时候检查
  configureWebpack: (config) => {
      if (process.env.NODE_ENV === 'production') {
          config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      }
  },

  css: {
      extract: false, // 是否使用css分离插件 ExtractTextPlugin,开启后样式无法热更新！！
      sourceMap: false, // 开启 CSS source maps
      loaderOptions: {
          sass: {
              data: `@import "~@/style/setting.scss";@import "~@/style/base.scss";`
              // 如果sass-loader不小心装了新版，此处的data要换成prependData
              // prependData: `@import "~@/style/setting.scss";`
          }
      }, // css预设器配置项
      modules: false// 启用 CSS modules for all css / pre-processor files.
  },
  devServer: {// 环境配置
      host: 'localhost',
      port: 8080,
      // https
      https: false,
      hotOnly: true,
      proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
          '/app': {
              target: 'http://174.34.200.237:8088',
              // target: 'http://localhost:9999',
              changeOrigin: true
          },
          '/foo': {
              target: '<other_url>'
          }
      }
  }

}
