const path = require('path')
const webpack = require('webpack');
module.exports = {
    productionSourceMap:false,
    devServer:{
        open:true,
        host:'localhost',
        port:'8081',
        https:false,
        hotOnly:false,
        proxy:{
            '/api':{
                target:'http://localhost:8080',
                ws: true,  //代理websockets
                changeOrigin:true,//是否跨域
                pathRewrite:{
                    '/api':''
                }

            }
        }
    }
}