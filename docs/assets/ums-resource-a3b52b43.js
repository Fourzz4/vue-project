import{j as h,_ as v,g as D,h as g,o as T,c as P,a as f,b as l,w as t,F as U,E as n,d as r,i as A}from"./index-6bee7998.js";import{c as L,E as $,a as z,b as R,d as W,e as q}from"./el-table-column-c982c5c9.js";import{E as S}from"./el-date-picker-5b98c2e8.js";import{b as N,E as M,a as j,c as O}from"./index-ac99b8f7.js";const G=e=>h.request({url:"/mall/ums-resource/page",method:"post",data:e}),H=e=>h.request({url:"/mall/ums-resource/del/"+e.id,params:e}),J=e=>h.request({url:"/mall/ums-resource/add",method:"post",data:e}),K=e=>h.request({url:"/mall/ums-resource/edit",method:"post",data:e}),Q=e=>h.request({url:"mall/ums-resource/one/"+e.id,params:e});const X=D({data(){return{searchText:"",coupons:[],adCates:[],page:{total:0,current:1,size:10},dialogFormVisible:!1,dialogFormVisibleById:!1,adCate:{categoryId:0,createTime:"",description:"",id:0,name:"",url:""},formLabelWidth:100}},mounted(){this.getAdCatesPage(1)},methods:{toEdit(e){console.log(e),this.dialogFormVisible=!0,this.adCate=L(e)},getAdCatesPage(e){G({current:e,size:10}).then(s=>{console.log(s);const m=s.data.page;this.adCates=m.records,this.page=m}).catch(s=>{console.log(s)})},currentchange(e){this.getAdCatesPage(e),this.page.current=e},refresh(){this.getAdCatesPage(this.page.current),n({message:"刷新成功",type:"success"})},clearSearchInput(){this.searchText="",n({message:"搜索框已清空",type:"success"})},del(e){$.confirm("确定要删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{const a={id:e};n({message:"删除成功",type:"success"}),H(a).then(s=>{if(s.success)this.getAdCatesPage(this.page.current);else return console.log(s.msg),!1}).catch(s=>{console.log(s)})}).catch(()=>{n({message:"取消删除",type:"warning"})})},toAdd(){this.adCate={categoryId:0,createTime:"",description:"",id:0,name:"",url:""},this.dialogFormVisible=!0},selectById(){this.dialogFormVisibleById=!0},getById(e){this.coupons=[],Q({id:e}).then(s=>{this.dialogFormVisibleById=!1,this.coupons.push(s.data.help);const m=this.coupons;this.adCates=m,n({message:"查询成功",type:"success"})}).catch(s=>{n({message:"查询的ID不存在",type:"warning"}),console.log(s)})},save(){const e=this.adCate;e.id==0?J(e).then(a=>{if(a.success)this.dialogFormVisible=!1,this.getAdCatesPage(this.page.current),n({message:"添加成功",type:"success"});else return n({message:"添加失败",type:"error"}),!1}).catch(a=>{n({message:"网络错误联系管理员",type:"error"})}):K(e).then(a=>{if(a.success)this.dialogFormVisible=!1,this.getAdCatesPage(this.page.current),n({message:"更新成功",type:"success"});else return n({message:"更新失败",type:"error"}),!1}).catch(a=>{n({message:"网络错误联系管理员",type:"error"})})}}}),Y={class:"adCates"},Z={class:"adcate-tools"},x={class:"dialog-footer"},ee={class:"search-input-wrapper"},le={class:"dialog-footer"};function ae(e,a,s,m,te,oe){const y=g("Refresh"),p=A,d=N,V=g("Plus"),i=q,_=g("Edit"),I=g("Delete"),k=z,w=R,c=M,u=j,E=S,b=O,F=g("Check"),C=W;return T(),P(U,null,[f("div",Y,[f("div",Z,[l(d,{type:"warning",color:"#006699",onClick:e.refresh},{default:t(()=>[l(p,null,{default:t(()=>[l(y)]),_:1}),r("刷新")]),_:1},8,["onClick"]),l(d,{type:"warning",color:"#006699",onClick:e.toAdd},{default:t(()=>[l(p,null,{default:t(()=>[l(V)]),_:1}),r("添加")]),_:1},8,["onClick"]),l(d,{type:"warning",onClick:e.selectById,icon:"Search"},{default:t(()=>[r("按ID查询")]),_:1},8,["onClick"])]),l(k,{data:e.adCates,style:{width:"100%"}},{default:t(()=>[l(i,{fixed:"",prop:"id",label:"id",width:"50"}),l(i,{prop:"name",label:"资源名称"}),l(i,{prop:"categoryId",label:"资源分类ID"}),l(i,{prop:"url",label:"资源URL"}),l(i,{prop:"description",label:"描述"}),l(i,{prop:"createTime",label:"创建时间"}),l(i,{fixed:"right",label:"操作",width:"120"},{default:t(o=>[l(d,{link:"",type:"primary",size:"small",onClick:B=>e.toEdit(o.row)},{default:t(()=>[l(p,null,{default:t(()=>[l(_)]),_:1}),r("更新")]),_:2},1032,["onClick"]),l(d,{link:"",type:"danger",size:"small",onClick:B=>e.del(o.row.id)},{default:t(()=>[l(p,null,{default:t(()=>[l(I)]),_:1}),r("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),l(w,{background:"",layout:"prev, pager, next","page-size":e.page.size,total:e.page.total,onCurrentChange:e.currentchange},null,8,["page-size","total","onCurrentChange"])]),l(C,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":a[6]||(a[6]=o=>e.dialogFormVisible=o),title:"资源编辑"},{footer:t(()=>[f("span",x,[l(d,{onClick:a[5]||(a[5]=o=>e.dialogFormVisible=!1)},{default:t(()=>[r("取消")]),_:1}),l(d,{type:"primary",onClick:e.save},{default:t(()=>[l(p,null,{default:t(()=>[l(F)]),_:1}),r("保存")]),_:1},8,["onClick"])])]),default:t(()=>[l(b,{model:e.adCate},{default:t(()=>[l(u,{label:"资源名称","label-width":e.formLabelWidth},{default:t(()=>[l(c,{modelValue:e.adCate.name,"onUpdate:modelValue":a[0]||(a[0]=o=>e.adCate.name=o),autocomplete:"off",placeholder:"请输入资源名称"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(u,{label:"资源分类ID","label-width":e.formLabelWidth},{default:t(()=>[l(c,{modelValue:e.adCate.categoryId,"onUpdate:modelValue":a[1]||(a[1]=o=>e.adCate.categoryId=o),autocomplete:"off",placeholder:"请输入资源分类ID"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(u,{label:"资源URL","label-width":e.formLabelWidth},{default:t(()=>[l(c,{modelValue:e.adCate.url,"onUpdate:modelValue":a[2]||(a[2]=o=>e.adCate.url=o),autocomplete:"off",placeholder:"请输入资源URL"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(u,{label:"描述","label-width":e.formLabelWidth},{default:t(()=>[l(c,{modelValue:e.adCate.description,"onUpdate:modelValue":a[3]||(a[3]=o=>e.adCate.description=o),autocomplete:"off",placeholder:"请输入描述"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(u,{label:"创建时间","label-width":e.formLabelWidth},{default:t(()=>[l(E,{modelValue:e.adCate.createTime,"onUpdate:modelValue":a[4]||(a[4]=o=>e.adCate.createTime=o),type:"date",autocomplete:"off",placeholder:"选择日期"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"]),l(C,{modelValue:e.dialogFormVisibleById,"onUpdate:modelValue":a[10]||(a[10]=o=>e.dialogFormVisibleById=o),title:"查询"},{footer:t(()=>[f("span",le,[l(d,{onClick:a[9]||(a[9]=o=>e.dialogFormVisibleById=!1)},{default:t(()=>[r("取消")]),_:1})])]),default:t(()=>[l(b,{model:e.adCate},{default:t(()=>[l(u,{label:"请输入ID","label-width":e.formLabelWidth},{default:t(()=>[f("div",ee,[l(c,{modelValue:e.searchText,"onUpdate:modelValue":a[7]||(a[7]=o=>e.searchText=o),placeholder:"按ID查询,请输入ID",autocomplete:"off",class:"search-input"},null,8,["modelValue"]),l(d,{type:"primary",icon:"Search",onClick:a[8]||(a[8]=o=>e.getById(e.searchText))}),l(d,{type:"danger",icon:"Delete",onClick:e.clearSearchInput,class:"search-clear-btn"},null,8,["onClick"])])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}const ie=v(X,[["render",ae],["__scopeId","data-v-46f27721"]]);export{ie as default};
