import{d as h,h as k,R as $,S,f as W,i as x,C as f,Q as g,k as n,g as a,w as z,b as o,I as i,T as m,U as N,N as B,V as L}from"./index-tSUvi4SZ.js";import{_ as R}from"./ModalConfirm.vue_vue_type_style_index_0_lang-27zBBvrw.js";import{a as U}from"./inputs-b2AQoK3y.js";import"./index-FPJAd0VN.js";const y={class:"absolute top-14 right-5 transition-all z-50"},T={class:"bg-zinc-700 w-[140px] py-1 rounded-md"},D=h({__name:"MenuOptions",props:{status:Boolean},emits:["close"],setup(c,{emit:v}){const{user:w,logout:C}=k(),r=v,u=c,d=L(),b=$(),t=U({confirm:!1,sharedWithMe:!1}),M=()=>{t.toggle("confirm"),C({actions:l=>{setTimeout(()=>b.push({name:"login"}),200),d.success(String(l==null?void 0:l.message))},error:l=>d.error(l.message)})};return(l,e)=>{var p;const V=S("RouterLink");return W(),x(B,null,[f(n("div",{class:"fixed top-0 left-0 w-full h-[100vh] z-30",onClick:e[0]||(e[0]=s=>r("close"))},null,512),[[g,u.status]]),f(n("div",y,[n("div",T,[a(V,{to:{name:"profile",params:{id:(p=o(w))==null?void 0:p._id}}},{default:z(()=>[n("button",{class:"btn-two w-full !capitalize my-2",onClick:e[1]||(e[1]=s=>r("close"))},[a(o(i).Profile),m(" Profile ")])]),_:1},8,["to"]),n("button",{class:"btn-two w-full !capitalize my-2",onClick:e[2]||(e[2]=s=>(o(t).toggle("sharedWithMe"),r("close")))},[a(o(i).SharedWithMe,{class:"mr-2 -ml-1"}),m(" Shared ")]),n("button",{class:"btn-two w-full !capitalize my-2",onClick:e[3]||(e[3]=s=>(o(t).toggle("confirm"),r("close")))},[a(o(i).Logout),m(" Logout ")])])],512),[[g,u.status]]),a(R,{modelValue:o(t).confirm,"onUpdate:modelValue":e[4]||(e[4]=s=>o(t).confirm=s),message:"Are you sure to close the session ?",onClose:e[5]||(e[5]=s=>o(t).toggle("confirm")),onConfirm:e[6]||(e[6]=s=>M())},null,8,["modelValue"]),a(o(N).ModalSharedWithMe,{modelValue:o(t).sharedWithMe,"onUpdate:modelValue":e[7]||(e[7]=s=>o(t).sharedWithMe=s),onClose:e[8]||(e[8]=s=>o(t).toggle("sharedWithMe"))},null,8,["modelValue"])],64)}}});export{D as default};
