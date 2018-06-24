第一部分：错误及其解决方案
1-1：node-sass安装报错解决方案
  第一步：安装淘宝cnpm镜像
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  第二步：使用淘宝镜像安装依赖模块
  cnpm install
1-2：关于npm run build对element-ui报错问题
  解决方案：使用cnpm run build

第二部分：增加对scss的支持
  解决方案：执行命令 cnpm install node-sass sass-loader --save-dev

第三部分：关于本项目
  第一步：安装淘宝cnpm镜像
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  第二步：使用淘宝镜像安装依赖模块
  cnpm install

第四部分：其他
4-1：mongodb启动命令
  mongod --dbpath=../data/db
4-2：查看模块所有版本
  npm view element-ui versions

// 要尽可能的做的简单与实用才好

永远要记住 做的越简单越好
