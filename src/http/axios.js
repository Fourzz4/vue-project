import axios from "axios";
import { useUserStore } from "../store/user";
//创建axios实例
const instance=axios.create({
    baseURL:'http://mall.qzimp.cn/',
    timeout:6000
})
//请求拦截器
instance.interceptors.request.use((config)=>{
    const userStore=useUserStore();
    const {token}=userStore;
    // console.log(token);
    config.headers.token=token;
    return config
},(err)=>{
   return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use((res)=>{
    return res.data;
},(err)=>{
    return Promise.reject(err)
})

export default instance;