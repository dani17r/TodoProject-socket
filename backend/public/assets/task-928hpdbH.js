import{s as x,a as b}from"./inputs-b2AQoK3y.js";import{t as w}from"./index-zB9U5U-R.js";import{Y as j,r as T,v as B}from"./index-tSUvi4SZ.js";const C={componentData:{type:"transition-group",name:"list"},preventOnFilter:!1,group:"description",ghostClass:"ghost",dragClass:"drag",disabled:!1,animation:200,itemKey:"_id"},a=T({button:{value:!1,toggle:()=>{a.button.value=!a.button.value}},all:{value:[],status:!1,selectOne:l=>{a.all.value=l.filter(s=>s.select),a.all.status=!1},selectAll:l=>{l.map(s=>s.select=a.all.status),a.all.value=l.filter(s=>s.select)}}}),E=()=>{const{create:l,update:s,trash:m,changePosition:y,getAll:S,countTask:g,loading:k,query:c,tasks:r}=w(),{project:f}=j(),u=T({data:{}}),n=x({_author:"",_project:"",position:0,name:""}),p=b({edite:!1,view:!1,trash:!1,open:{update:e=>{p.toggle("edite"),u.data=e},view:e=>{p.toggle("view"),u.data=e}}});return{moveSelectToRecycleBin:()=>{const e=a.all.value.map(o=>o._id);m(e)},changePositionTask:e=>{const o=e.moved.newIndex,d=e.moved.oldIndex,h=o<d?o:d,_=o>d?o:d,v=[];if(c.value.sort.includes("desc")){const t=g.value-1;for(let i=t-h;i>=t-_;i--)r.value.data[t-i].position=i,v.push({_id:r.value.data[t-i]._id,position:i})}else for(let t=h;t<=_;t++)r.value.data[t].position=t,v.push({_id:r.value.data[t]._id,position:t});y(v)},moveToRecycleBin:e=>m([e]),ascDesc:e=>{c.value.sort!=`position:${e}`&&(c.value.sort=`position:${e}`,S())},create:()=>{var e,o;n._project=String((e=f.value)==null?void 0:e._id),n._author=String((o=f.value)==null?void 0:o._author),n.position=g.value+1,l(B.omit(n,["clear"]),{actions:()=>n.clear()})},done:e=>{e.done=!e.done,s(e)},optionsDragg:C,multiSelect:a,loading:k,select:u,modals:p,query:c,form:n}};export{E as t};
