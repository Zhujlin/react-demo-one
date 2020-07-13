前言：
1.为了方便下载，已删除node_modules，拉取代码后，需要：npm install
2.项目中有栗子，开盖即食。

配置及安装方式：
1.搭建 react ： npx create-react-app my-app （my-app 自己起的文件名，如果一直安装失败，试着清一下缓存：npm cache clean --force）
1.1： npm i react-router-dom  （加入路由）
1.2： npm install --save redux react-redux redux-thunk （安装Redux）

2.引入moment.js： npm install moment

3.引入eCharts： npm install echarts

4.引入Antd： npm install antd --save （--save,原指把模块写入到 packages.json。现在已经是内置参数，不用额外写了）

5.安装less：npm install -g less  （或者：npm install less less-loader --save）（还没成功，有点麻烦，还需要配置webpack.config.js）

6.配置webpack.config.js文件

6.1 首先我们需要运行 npm run eject 来暴露webpack的配置文件，你会发现多了config为名的文件夹。（如果这步报错没关系，
实我们只需要在之前运行?git add . 命令，然后再运行??git commit -m "init" 命令就可以解决。）

6.2 最后是我们需要手动在webpack.config.js里配置less：
// 在module中做两处修改?
// 第一处是找到:
const sassRegex = /\.(scss|sass)$/;      改成=>   const sassRegex = /\.(scss|sass|less)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;       改成=>  const sassModuleRegex = /\.module\.(scss|sass|less)$/;
// 第二处是找到两个‘sass-loader’换成‘less-loader’

6.3 配置常用的路径
module.exports = function(webpackEnv) {
  return {
    resolve: {
      alias: {
        // react 路径配置 import改为绝对路径, 不必一直 ../../
        "components": path.resolve(__dirname, "../src/components"),
        "pages": path.resolve(__dirname, "../src/pages"),
        "router": path.resolve(__dirname, "../src/router"),
        "assets": path.resolve(__dirname, "../src/assets"),
        "store": path.resolve(__dirname, "../src/store"),
      },
    },
  };
};