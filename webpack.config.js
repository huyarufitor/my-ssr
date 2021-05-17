const path = require('path');
const htmlWebpackplugin = require('html-webpack-plugin');
// vue-loader 还需要一个额外的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
 
 
module.exports = {
    // 手动指定入口和出口
    // 入口：要打包的文件路径
    entry: path.join(__dirname,'./src/main.js'),
  
    output: {
        path: path.join(__dirname, './dist'),  // 出口：最后输出到哪个目录下面
        filename: 'bundle.js'//输出文件的名称
    },
    plugins: [
        new htmlWebpackplugin({ //创建一个在内存中生成的html页面的插件
            // 根据指定的页面在内存中生成模板插件
            template: path.join(__dirname, './src/index.html'),
            // 指定生成的页面名称
            filename: 'index.html'
        }),
        // 放入额外的插件
        new VueLoaderPlugin()
    ],
    module: { //这个节点用于配置所有的第三方模块加载器
        rules: [
            {test: /\.css$/, use:['style-loader','css-loader']},//配置处理.css文件的第三方处理规则
            {test: /\.less$/, use: ["style-loader",'css-loader','less-loader']},
            {test: /\.scss$/, use: ["style-loader",'css-loader','sass-loader']},
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: "url-loader?limit=8000"},
            {test: /\.(tff|eot|svg|woff|woff2)$/, use: "url-loader"},
            {test:/\.js$/, use:'babel-loader',exclude:/node_modules/},
            {test: /\.vue$/, use: 'vue-loader'},//处理vue打包的规则,
            {
                test: /\.sass$/,
                loaders: ['style', 'css', 'sass']
              }
        ]
    }
};