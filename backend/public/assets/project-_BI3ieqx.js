import{s as p,a as u}from"./inputs-b2AQoK3y.js";import{Y as v,r as c,v as f,V as m}from"./index-tSUvi4SZ.js";const j=()=>{const{getAll:t,remove:d,loading:g,query:a}=v(),n=m(),o=c({data:{},id:""}),s=c({values:{},get:e=>s.values[e],toggle:e=>{s.values[e]=!s.values[e]}}),l=p({input:"",find:()=>{a.value.search!=l.input&&(a.value.search=l.input,t())}}),r=u({addEdit:!1,confirm:!1,open:{create:()=>{r.toggle("addEdit"),o.data={}},update:(e,i)=>{o.data=f.pick(e,["_id","title","description"]),s.toggle(i),r.toggle("addEdit")},delete:(e,i)=>{o.id=e,s.toggle(i),r.toggle("confirm")}}});return{pagination:{next(e){e&&(a.value.pag=Number(a.value.pag)+1,t())},previe(e){e&&(a.value.pag=Number(a.value.pag)-1,t())},selectPag(e){e!=a.value.pag&&(a.value.pag=e,t())}},dropdown:s,refresh:()=>{a.value.pag>1&&(a.value.pag=1),t()},ascDesc:e=>{a.value.sort!=`createdAt:${e}`&&(a.value.sort=`createdAt:${e}`,t())},loading:g,select:o,deleted:()=>{d(o.id,{actions:()=>r.toggle("confirm"),error:e=>{r.toggle("confirm"),n.active({msg:e.message})}}),o.id=""},search:l,modals:r,query:a}};export{j as p};