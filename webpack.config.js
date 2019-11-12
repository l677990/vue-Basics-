const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry:path.join(__dirname,'./src/main.js'),
    output:{ //指定输出选项
        path : path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[ //所有webpack 插件配置节点
        new htmlWebpackPlugin({ //创建一个 在内存中 生成 HTML 页面的插件
            template:path.join(__dirname,'./src/index.html'), //指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
            filename:'index.html' //指定生成页面的名称
        }),
        new VueLoaderPlugin() //这个插件是Vue必须的
    ],
    module:{//配置所有第三方loader模块的
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test: /\.(png|jpe?g|gif)$/i,use:[{
                loader: 'file-loader?name=[hash:8]-[name].[ext]',   //name图片名字=原来的名字  npm install --save-dev url-loader || npm install file-loader --save-dev
              },]},
            {test:/\.(ttf|woff2|woff|eot|svg)$/,use:'file-loader'}, //处理字体对象的loader
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/transform-runtime']
                }
              }
            },//这是配置Babel来转换高级的ES6语法
            {test:/\.vue$/,use:"vue-loader"},
        ]
    },
    resolve:{
      alias:{ //修改vue被导入时候的包的路径
        // "vue$":"vue/dist/vue.js"
      }
    }
}