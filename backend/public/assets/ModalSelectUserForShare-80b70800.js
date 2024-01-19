import{d as k,j as S,a as $,c as p,q as z,R as B,G as F,h as d,f as I,w as N,i as f,g as o,l as e,k as v,F as U,S as j,t as r,I as M,m as q,V as D,y as E,T as G}from"./index-6e886427.js";import{_ as L}from"./InputSearch.vue_vue_type_style_index_0_lang-097aa831.js";const P={class:"content"},T={class:"bg-zinc-700 p-3 mt-2 shadow rounded"},A={class:"flex items-center border-gray-700"},R=["src"],H={class:"flex items-center justify-between w-full"},J={class:"pl-3 w-full"},K={class:"font-medium text-zinc-400"},O={class:"text-sm text-zinc-300"},Q=["onClick"],W={class:"bg-zinc-700 p-3 mt-2 shadow rounded"},X={class:"flex items-center border-gray-700"},Y={class:"flex items-center justify-between w-full"},Z={class:"pl-3 w-full"},ee={class:"font-bold text-lg text-zinc-300"},se={class:"text-zinc-400"},ae=k({__name:"ModalSelectUserForShare",props:{status:Boolean},emits:["close"],setup(_,{emit:h}){const x=_,w=h,{query:i,getAll:c,users:u}=S(),{addNewUser:g,droupPrivateIds:b}=$(),y=n=>`/upload/profile/${n}`,m=p(()=>x.status),a=z(!1),l=B({input:"",find:F.debounce(()=>{i.value.search=l.input,c({actions:()=>{u.value.data.length<1&&l.input.length>=1?a.value=!0:a.value=!1}})},900),empty:()=>{a.value=!1,i.value.search="",c()}}),V=p(()=>u.value.data.filter(n=>{var s;return!((s=b.value)!=null&&s.includes(n._id))}));return(n,s)=>(d(),I(o(G).Main,{modelValue:m.value,"onUpdate:modelValue":s[3]||(s[3]=t=>m.value=t),"min-height":"70px",width:"640px",onClose:s[4]||(s[4]=t=>w("close"))},{default:N(()=>[f(L,{modelValue:o(l).input,"onUpdate:modelValue":s[0]||(s[0]=t=>o(l).input=t),"class-content":"w-full",placeholder:"Search name or email",onChange:s[1]||(s[1]=t=>o(l).find()),onClear:s[2]||(s[2]=t=>(o(l).clear(),o(l).empty()))},null,8,["modelValue"]),e("div",P,[(d(!0),v(U,null,j(V.value,(t,C)=>(d(),v("div",{key:C},[e("div",T,[e("div",A,[e("img",{src:y(t.image),class:"image-mini-profile"},null,8,R),e("div",H,[e("div",J,[e("p",K,r(t.fullname),1),e("p",O,r(t.email),1)]),e("div",null,[e("button",{class:"bg-blue-500 p-1 text-white rounded-full",onClick:te=>o(g)(t)},[f(o(M).Plus)],8,Q)])])])])]))),128)),q(e("div",W,[e("div",X,[e("div",Y,[e("div",Z,[e("p",ee,[D(" It Not found email or name: "),e("i",se,r(o(i).search),1)])])])])],512),[[E,a.value]])])]),_:1},8,["modelValue"]))}});export{ae as default};
