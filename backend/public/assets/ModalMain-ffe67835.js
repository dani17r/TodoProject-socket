import{d as p,c as _,h as a,f as z,i as s,w as l,k as o,a6 as d,A as i,W as r,z as x,l as m,a7 as y,a4 as g,a3 as h}from"./index-31de54ed.js";const I=["id"],k={inheritAttrs:!1},C=p({...k,__name:"ModalMain",props:{zIndexImportant:{type:Boolean,default:!1},classContent:{default:"flex justify-center items-center"},modelValue:{type:Boolean,default:!0},transition:{default:"fade"},minHeight:{default:"250px"},zIndex:{default:120},width:{default:"400px"}},emits:["close"],setup(u){const e=u,c=_(()=>({minHeight:e.minHeight,width:e.width})),f=(t=6)=>Math.random().toString(36).substring(2,t+2);return(t,n)=>(a(),z(h,{to:"#area"},[s(r,{name:"fade"},{default:l(()=>[e.modelValue?(a(),o("div",{key:0,class:"bg-modal",style:d(`z-index:${Number(e.zIndex)+20}`)},null,4)):i("",!0)]),_:1}),s(r,{name:e.transition},{default:l(()=>[e.modelValue?(a(),o("div",{key:0,class:x(["content-modal-main",e.classContent]),style:d(e.zIndexImportant?`z-index:${Number(e.zIndex)+20} !important`:`z-index:${Number(e.zIndex)+20}`)},[m("div",{id:String(t.$attrs.id)&&f(10),class:"bg-click",onClickOnce:n[0]||(n[0]=v=>t.$emit("close"))},null,40,I),m("div",y({class:"content-modal-slot"},t.$attrs,{style:c.value}),[g(t.$slots,"default")],16)],6)):i("",!0)]),_:3},8,["name"])]))}});export{C as default};