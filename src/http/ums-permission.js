//统一api管理
import instance from "./axios";
//data json
const resPage=(data)=>{
   return instance.request({
    url:'/mall/ums-resource/page',
    method:'post',
    data
   })
}
const resDelId=(params)=>{
    return instance.request({
        url:'/mall/ums-resource/del/' + params.id,
        params
    })
}
const resAdd=(data)=>{
    return instance.request({
        url:'/mall/ums-resource/add',
        method:'post',
        data
    })
}
const resEdit=(data)=>{
    return instance.request({
        url:'/mall/ums-resource/edit',
        method:'post',
        data
    })
}

const resOne = (params) => {
  return instance.request({
      url: 'mall/ums-resource/one/' + params.id,
      params
  })
}

export {
    resPage,
    resDelId,
    resAdd,
    resEdit,
    resOne
} 
