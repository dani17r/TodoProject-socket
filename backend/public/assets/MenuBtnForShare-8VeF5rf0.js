import{_ as h}from"./MenuDropdown.vue_vue_type_style_index_0_lang-Mp_TZfuk.js";import{d as g,a as f,h as m,f as v,i as b,k as o,b as e,g as a,I as n,w as x,N as P}from"./index-tSUvi4SZ.js";import{a as w}from"./inputs-b2AQoK3y.js";import{T as l}from"./index-zB9U5U-R.js";const S={class:"fixed top-[70px] right-7"},_={class:"flex flex-col gap-4 dark:bg-zinc-700 bg-zinc-200 dark:text-zinc-300 p-3 rounded-lg cursor-pointer"},k=o("h3",{class:"text-left text-sm"},"Share with:",-1),C=o("span",null,"Everyone",-1),$=o("span",null,"Some only",-1),j=g({__name:"MenuBtnForShare",setup(M){const{restarOrInitSharePrivate:i,restarOrInitSharePublic:d}=f(),{restartUsers:u}=m(),s=w({sharePrivate:!1,sharePublic:!1,dropdown:!1}),c=()=>{s.toggle("sharePrivate"),i(),u()},p=()=>{s.toggle("sharePublic"),d()};return(y,t)=>(v(),b(P,null,[o("div",S,[o("button",{class:"relative",onClick:t[0]||(t[0]=r=>e(s).toggle("dropdown"))},[a(e(n).Share,{class:"inline ml-1"})])]),a(h,{state:e(s).dropdown,class:"!min-w-[170px] !top-28 !right-8 shadow-xl",onClose:t[3]||(t[3]=r=>e(s).toggle("dropdown"))},{default:x(()=>[o("div",_,[k,o("button",{class:"flex justify-between items-center hover:text-white",onClick:t[1]||(t[1]=r=>[e(s).toggle("sharePublic"),e(s).toggle("dropdown")])},[C,a(e(n).SharePublic,{class:"inline"})]),o("button",{class:"flex justify-between items-center hover:text-white",onClick:t[2]||(t[2]=r=>[e(s).toggle("sharePrivate"),e(s).toggle("dropdown")])},[$,a(e(n).SharePrivate,{class:"inline"})])])]),_:1},8,["state"]),a(e(l).ModalPublicShare,{status:e(s).sharePublic,onClose:t[4]||(t[4]=r=>p())},null,8,["status"]),a(e(l).ModalPrivateShare,{status:e(s).sharePrivate,onClose:t[5]||(t[5]=r=>c())},null,8,["status"])],64))}});export{j as default};
