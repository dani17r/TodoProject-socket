import{d,h as t,k as i,f as p,m as a,y as n,l as r,a3 as u,a4 as c,z as m,F as _}from"./index-31de54ed.js";const $=["id"],w=["id"],k=d({__name:"MenuDropdown",props:{state:{type:Boolean,default:!1}},emits:["close"],setup(l){const s=l;return(e,o)=>(t(),i(_,null,[(t(),p(u,{to:"#area"},[a(r("div",{id:`dropdown_blur-${e.$attrs.id}`,class:"dropdown-blur",onClick:o[0]||(o[0]=f=>e.$emit("close"))},null,8,$),[[n,s.state]])])),a(r("div",{id:`dropdown_menu-${e.$attrs.id}`,class:m(`dropdown-menu ${e.$attrs.class}`)},[c(e.$slots,"default")],10,w),[[n,s.state]])],64))}});export{k as _};