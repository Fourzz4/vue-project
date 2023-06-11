//统一api管理
import instance from "./axios";
// data json
const rolePage=(data)=>{
   return instance.request({
    url:'/mall/ums-role/page',
    method:'post',
    data
   })
}
const roleDelId=(params)=>{
    return instance.request({
        url:'/mall/ums-role/del/' + params.id,
        params
    })
}
const roleAdd=(data)=>{
    return instance.request({
        url:'/mall/ums-role/add',
        method:'post',
        data
    })
}
const roleEdit=(data)=>{
    return instance.request({
        url:'/mall/ums-role/edit',
        method:'post',
        data
    })
}

const roleOne = (params) => {
  return instance.request({
      url: 'mall/ums-role/one/' + params.id,
      params
  })
}

export {
    rolePage,
    roleDelId,
    roleAdd,
    roleEdit,
    roleOne
} 
