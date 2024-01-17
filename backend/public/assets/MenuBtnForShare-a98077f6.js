import{_ as h}from"./MenuDropdown.vue_vue_type_style_index_0_lang-e0508fb8.js";import{d as g,a as f,j as m,Y as v,h as b,k as x,l as o,g as e,i as a,I as l,w as P,F as w}from"./index-42a38fae.js";import{T as n}from"./index-c7657dd9.js";const S={class:"fixed top-[70px] right-7"},_={class:"flex flex-col gap-4 dark:bg-zinc-700 bg-zinc-200 dark:text-zinc-300 p-3 rounded-lg cursor-pointer"},k=o("h3",{class:"text-left text-sm"},"Share with:",-1),C=o("span",null,"Everyone",-1),$=o("span",null,"Some only",-1),z=g({__name:"MenuBtnForShare",setup(M){const{restarOrInitSharePrivate:i,restarOrInitSharePublic:d}=f(),{restartUsers:u}=m(),s=v({sharePrivate:!1,sharePublic:!1,dropdown:!1}),c=()=>{s.toggle("sharePrivate"),i(),u()},p=()=>{s.toggle("sharePublic"),d()};return(y,t)=>(b(),x(w,null,[o("div",S,[o("button",{class:"relative",onClick:t[0]||(t[0]=r=>e(s).toggle("dropdown"))},[a(e(l).Share,{class:"inline ml-1"})])]),a(h,{state:e(s).dropdown,class:"!min-w-[170px] !top-28 !right-8 shadow-xl",onClose:t[3]||(t[3]=r=>e(s).toggle("dropdown"))},{default:P(()=>[o("div",_,[k,o("button",{class:"flex justify-between items-center hover:text-white",onClick:t[1]||(t[1]=r=>[e(s).toggle("sharePublic"),e(s).toggle("dropdown")])},[C,a(e(l).SharePublic,{class:"inline"})]),o("button",{class:"flex justify-between items-center hover:text-white",onClick:t[2]||(t[2]=r=>[e(s).toggle("sharePrivate"),e(s).toggle("dropdown")])},[$,a(e(l).SharePrivate,{class:"inline"})])])]),_:1},8,["state"]),a(e(n).ModalPublicShare,{status:e(s).sharePublic,onClose:t[4]||(t[4]=r=>p())},null,8,["status"]),a(e(n).ModalPrivateShare,{status:e(s).sharePrivate,onClose:t[5]||(t[5]=r=>c())},null,8,["status"])],64))}});export{z as default};
