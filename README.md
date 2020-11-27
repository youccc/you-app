## 介绍
- 基于vue、element-ui构建开发

# 技术栈
你需要在本地安装 nodejs。

# 目录结构
下面是整个项目的目录结构。
```bash
├── vue.config                 // 构建配置相关
├── dist                       // 构建打包生成部署文件
├── public                     
│   ├── index.html             // html模板
├── src                        // 源代码
│   ├── assets                 // 静态资源
│   ├── components             // 全局公用组件
│   ├── config                 // 全局变量配置
│   ├── icons                  // 所有 svg icons
│   ├── router                 // vue 路由管理
│   ├── store                  // vue store数据状态管理
│   ├── api                    // 接口管理
│   ├── service                // 网络配置
│   ├── styles                 // 样式类
│   ├── plugins                // 插件类
│   ├── utils                  // 工具类
│   ├── views                  // view
│   ├── App.vue                // 入口组件
│   ├── main.js                // 入口
├── .babel.config              // babel-loader 配置
├── .gitignore                 // git 忽略项
└── package.json               // package.json
```

# 安装
```bashi
# 安装依赖
yarn install

# 启动服务
yarn run dev
```


# 启动服务
yarn run dev
```
启动完成后会自动打开浏览器访问 [http://localhost:8080]()。

# 打包部署
```
修改
/static/config/index-[prod].js文件中  
window.SITE_CONFIG['baseUrl'] = 'http://xxx'// 后台接口请求地址
window.SITE_CONFIG['domain'] = '静态资源cdn地址';  

# 构建生产环境(默认)
npm run build

```
# 部署Nginx配置参考
```
  location / {
        # 指向我们打包后上传的前端文件
        root /usr/local/nginx/dist;
        index index.html;
    }
    location /platform-plus {
        # 转发请求到后端
        proxy_pass                         http://localhost:8888;
        proxy_set_header  Host             $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
```

#### 提交反馈
1. 欢迎提交 issue，请写清楚遇到问题的原因，开发环境，复显步骤。
2. 不接受`功能请求`的 issue，功能请求可能会被直接关闭。  
3. 代码修改请遵循指定的 `ESLint` 规则，`PR` 之前请先执行 `npm run lint` 进行代码风格检测，大部分语法细节可以通过 `npm run fix` 修正。

#### 常用API
- [Vue](https://cn.vuejs.org/v2/api/)
- [element-ui](http://element-cn.eleme.io/#/zh-CN/component/installation)
- [echarts](https://www.echartsjs.com/api.html#echarts)
- [iconfont](https://www.iconfont.cn/search/index)
