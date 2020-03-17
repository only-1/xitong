import axios from 'axios';
import { Message,Loading } from 'element-ui';
import router from './router';
let loading;
function startLoaing(){
    loading = Loading.service({
        lock:true,
        text:'拼命加载中',
        background:'rgba(0,0,0,.7)'
    });
}
function endLoading(){
    loading.close()
}
//请求拦截
axios.interceptors.request.use(config=>{
    //加载动画
    startLoaing();
    //请求成功后将token设置到请求头
    if(localStorage.eleToken){
        //设置统一的请求头
        config.headers.Authorization = localStorage.eleToken
    }
    return config;
},error=>{
    return Promise.reject(error)
})
//响应拦截
axios.interceptors.response.use(response=>{
    endLoading();
    return response;
},error=>{
    //错误提醒
    endLoading();
    Message.error(error.response.data);
    //获取错误状态码判断token是否失效过期 如果过期则重新登陆
    const {status} = error.response
    if(status==401){
        Message.error("token失效，请重新登陆")
        //清除失效的token
        localStorage.removeItem('eleToken');
        //重新跳转登录页面
        router.push('/login')
    }
    return Promise.reject(error)
})
export default axios;