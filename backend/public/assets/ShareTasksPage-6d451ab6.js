import{r as v,a as k,C as T,u as g,e as o,c as A,s as d,d as S,o as _,b as $,f as h,w as b,g as r,h as p,A as C,i as f}from"./index-4d3304d5.js";import{s as w,T as l}from"./index-515a5c01.js";const e=v({changeShare:!0,deleteAll:!0,create:!0,update:!0,delete:!0,trash:!0,move:!0}),x=n=>{const t=`broadcast:${n}`,{initPermissions:u}=k(),c=T(),a=w(),i=g();o.on("project/change-share",()=>e.changeShare=!1),o.on("task/delete-all",()=>e.deleteAll=!1),o.on("task/update",()=>e.update=!1),o.on("task/create",()=>e.create=!1),o.on("task/delete",()=>e.delete=!1),o.on("task/trash",()=>e.trash=!1),o.on("task/move",()=>e.move=!1);const s=A(()=>d("/task",n));return s.value.on(`${t}/create`,()=>{setTimeout(()=>e.create=!0,300),e.create&&a.getAll()}),s.value.on(`${t}/update`,()=>{setTimeout(()=>e.update=!0,300),e.update&&a.getAll()}),s.value.on(`${t}/trash`,()=>{setTimeout(()=>e.trash=!0,300),e.trash&&a.getAll()}),s.value.on(`${t}/change-position`,()=>{setTimeout(()=>e.move=!0,300),e.move&&a.getAll()}),s.value.on(`${t}/delete`,()=>{setTimeout(()=>e.delete=!0,300),e.delete&&a.getAll()}),s.value.on(`${t}/delete-all`,()=>{setTimeout(()=>e.deleteAll=!0,300),e.deleteAll&&a.getAll()}),d("/project",n).on(`${t}/change-share`,m=>{setTimeout(()=>e.changeShare=!0,300),e.changeShare&&(c.project=m,u(),i.meta.type=m.share.public.status?"public":"private")}),s.value},M=S({__name:"ShareTasksPage",setup(n){const{initPermissions:t,isOwner:u}=k(),c=g(),a=x(String(c.params.id));return _(()=>a.close()),$(()=>{t(),a.open()}),(i,s)=>(p(),h(r(l).Content,null,{default:b(()=>[r(u)?(p(),h(r(l).MenuShare,{key:0})):C("",!0),f(r(l).Options),f(r(l).List)]),_:1}))}});export{M as default};