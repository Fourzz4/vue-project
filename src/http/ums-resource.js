//统一api管理
import instance from "./axios";
// data json
const perPage=(data)=>{
   return instance.request({
    url:'/mall/ums-permission/page',
    method:'post',
    data
   })
}
const perDelId=(params)=>{
    return instance.request({
        url:'/mall/ums-permission/del/' + params.id,
        params
    })
}
const perAdd=(data)=>{
    return instance.request({
        url:'/mall/ums-permission/add',
        method:'post',
        data
    })
}
const perEdit=(data)=>{
    return instance.request({
        url:'/mall/ums-permission/edit',
        method:'post',
        data
    })
}

const perOne = (params) => {
  return instance.request({
      url: '/mall/ums-permission/one/' + params.id,
      params
  })
}

export {
    perPage,
    perDelId,
    perAdd,
    perEdit,
    perOne
} 
