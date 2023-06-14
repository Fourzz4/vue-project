//统一api管理
import instance from "./axios";
// data json
const adminLogin=(data)=>{
    return instance.request({
     url:'/mall/ums-admin/login',
     method:'post',
     data
    })
}
const adminPage=(data)=>{
   return instance.request({
    url:'/mall/ums-admin/page',
    method:'post',
    data
   })
}
const adminDelId=(params)=>{
    return instance.request({
        url:'/mall/ums-admin/del/' + params.id,
        params
    })
}
const adminAdd=(data)=>{
    return instance.request({
        url:'/mall/ums-admin/add',
        method:'post',
        data
    })
}
const adminEdit=(data)=>{
    return instance.request({
        url:'/mall/ums-admin/edit',
        method:'post',
        data
    })
}

const adminOne = (params) => {
  return instance.request({
      url: 'mall/ums-admin/one/' + params.id,
      params
  })
}
const adminRoleOne=(params)=>{
    return instance.request({
        url: 'mall/ums-admin-role-relation/one/' + params.id,
        params
    })
}
const adminRoleEdit=(data)=>{
    return instance.request({
        url: 'mall/ums-admin-role-relation/edit',
        data,
        method:'post',

    })
}
const adminRoleAdd=(data)=>{
    return instance.request({
        url: 'mall/ums-admin-role-relation/add',
        method:'post',
       data
    })
}
export {
    adminLogin,
    adminPage,
    adminDelId,
    adminAdd,
    adminEdit,
    adminOne,
    adminRoleOne,
    adminRoleEdit,
    adminRoleAdd
} 
