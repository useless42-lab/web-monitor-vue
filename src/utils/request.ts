import axios from 'axios';

const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 50000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
})

// 拦截请求
service.interceptors.request.use(function(config){
    config.headers={
        "Authorization":localStorage.getItem('token'),
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    return config;
},function(error){
    return Promise.reject(error);
})

// 拦截响应
service.interceptors.response.use(function(response){
    if(response['headers']['content-type']=="application/octet-stream"){
        return response['data'];
    }else{
        if(response['data']['code']==9999){
            window.location.href="/auth/login";
        }
        return response['data'];
    }
    
},error=>{
    // 服务器出错
    return Promise.reject(error)
})

export default service;