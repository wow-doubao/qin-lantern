import{g as x,b as L,v as N}from"./chunks/theme.BU0kRCE5.js";import"./chunks/el-loading.l0sNRNKZ.js";import{d as P}from"./chunks/index.BHRI5DtF.js";import{k as G,L as V,r as z,l as g,T as A,S as a,af as d,Q as k,W as l,u as i,a0 as I,A as r,X as p,p as y,m as U,aT as D}from"./chunks/framework.Cphjm3J-.js";const M=y("div",null,"tableLabel数据:",-1),O=y("div",null,"selectData数据:",-1),$=G({__name:"table",setup(m){const F=P(),o=[{date:"2016-05-03",name:"Tom",address:"No. 189, Grove St, Los Angeles",slot:"1",id:"1"},{date:"2016-05-02",name:"Tom",address:"No. 189, Grove St, Los Angeles",slot:"2",id:"2"},{date:"2016-05-04",name:"Tom",address:"No. 189, Grove St, Los Angeles",slot:"3",id:"3"},{date:"2016-05-01",name:"Tom",address:"No. 189, Grove St, Los Angeles",slot:"4",id:"4"}],c=V([{label:"折叠显示",prop:"expand",type:"expand",width:"100",slot:!0,show:!1},{label:"名字",prop:"name",width:""},{label:"时间",prop:"date",width:""},{label:"地址",prop:"address",width:"",showOverflowTooltip:!0},{label:"插槽",prop:"slot",slot:!0},{label:"操作",prop:"handle",fixed:"right",slot:!0}]),t=z([]),[C,B,u,e,E,_]=x(async()=>{B.value=await F(o),u.value=Math.ceil(Math.random()*100)}),q=h=>{console.log(h)},v=h=>{console.log(h)};return(h,n)=>{const b=L,f=d("ql-table"),T=d("ql-pagination"),w=d("ql-card"),S=N;return g(),A(w,null,{header:a(()=>[k(b,{onClick:i(_)},{default:a(()=>[l(" submit ")]),_:1},8,["onClick"])]),default:a(()=>[I((g(),A(f,{selectData:i(t),"onUpdate:selectData":n[0]||(n[0]=s=>r(t)?t.value=s:null),label:i(c),data:i(B),select:"",onSelectionChange:v},{expand:a(s=>[l(p(s.row),1)]),slot:a(s=>[l(p(s.row.slot),1)]),handle:a(s=>[k(b,{bg:"",type:"primary",onClick:Q=>q(s)},{default:a(()=>[l(" 编辑 ")]),_:2},1032,["onClick"])]),_:1},8,["selectData","label","data"])),[[S,i(C)]]),k(T,{"current-page":i(e),"onUpdate:currentPage":n[1]||(n[1]=s=>r(e)?e.value=s:null),"page-size":i(E),"onUpdate:pageSize":n[2]||(n[2]=s=>r(E)?E.value=s:null),total:i(u),disabled:i(C)},null,8,["current-page","page-size","total","disabled"]),M,l(" "+p(i(c))+" ",1),O,l(" "+p(i(t)),1)]),_:1})}}}),R=D("",3),j={class:"vp-raw"},H=D("",7),Z=JSON.parse('{"title":"Table 表格","description":"","frontmatter":{},"headers":[],"relativePath":"template/Table 表格.md","filePath":"template/Table 表格.md"}'),J={name:"template/Table 表格.md"},ss=Object.assign(J,{setup(m){return(F,o)=>(g(),U("div",null,[R,y("div",j,[k($)]),H]))}});export{Z as __pageData,ss as default};
