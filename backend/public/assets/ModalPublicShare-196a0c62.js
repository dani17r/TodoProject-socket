import{d as x,c as U,X as y,u as S,a as _,h as r,f as C,w as g,g as t,k as B,i as m,l as e,m as i,a8 as a,A as M,T as w}from"./index-31de54ed.js";import{_ as T}from"./InputToggle.vue_vue_type_script_setup_true_lang-4bcb2352.js";import{T as j}from"./index-d74880fe.js";const N={key:0},$=e("h1",{class:"py-4 text-xl font-semibold"},"Permissions",-1),A={class:"grid grid-cols-2 gap-5 mt-2"},D=e("label",{for:"seed",class:"ml-3"},"Seed task",-1),P=e("label",{for:"created",class:"ml-3"},"Create task",-1),R=e("label",{for:"seed-trash",class:"ml-3"},"Seed trash",-1),E=e("label",{for:"updated",class:"ml-3"},"Update task",-1),I=e("label",{for:"move",class:"ml-3"},"Move task",-1),X=e("label",{for:"remove",class:"ml-3"},"Remove task to trash",-1),q=e("label",{for:"delete",class:"ml-3"},"Delete task in trash",-1),H=x({__name:"ModalPublicShare",props:{status:Boolean},emits:["close"],setup(c,{emit:b}){const d=b,v=c,u=U(()=>v.status),{update:f,changeShare:k}=y(),h=S(),{share:l}=_(),p=String(h.params.id),V=()=>{l.value&&(l.value.private.status=!1),f({_id:p,share:l.value},{actions:n=>{setTimeout(()=>d("close")),n&&k(n)}})};return(n,s)=>(r(),C(t(w).Main,{modelValue:u.value,"onUpdate:modelValue":s[9]||(s[9]=o=>u.value=o),width:"470px",onClose:s[10]||(s[10]=o=>d("close"))},{default:g(()=>[t(l)?(r(),B("div",N,[m(t(j).UrlShare,{"project-id":t(p)},null,8,["project-id"]),m(T,{modelValue:t(l).public.status,"onUpdate:modelValue":s[0]||(s[0]=o=>t(l).public.status=o),title:"Share public board"},null,8,["modelValue"]),$,e("div",A,[e("div",null,[i(e("input",{id:"seed","onUpdate:modelValue":s[1]||(s[1]=o=>t(l).public.permissions.s=o),type:"checkbox",disabled:!0},null,512),[[a,t(l).public.permissions.s]]),D]),e("div",null,[i(e("input",{id:"created","onUpdate:modelValue":s[2]||(s[2]=o=>t(l).public.permissions.c=o),type:"checkbox"},null,512),[[a,t(l).public.permissions.c]]),P]),e("div",null,[i(e("input",{id:"seed-trash","onUpdate:modelValue":s[3]||(s[3]=o=>t(l).public.permissions.st=o),type:"checkbox"},null,512),[[a,t(l).public.permissions.st]]),R]),e("div",null,[i(e("input",{id:"updated","onUpdate:modelValue":s[4]||(s[4]=o=>t(l).public.permissions.u=o),type:"checkbox"},null,512),[[a,t(l).public.permissions.u]]),E]),e("div",null,[i(e("input",{id:"move","onUpdate:modelValue":s[5]||(s[5]=o=>t(l).public.permissions.m=o),type:"checkbox"},null,512),[[a,t(l).public.permissions.m]]),I]),e("div",null,[i(e("input",{id:"remove","onUpdate:modelValue":s[6]||(s[6]=o=>t(l).public.permissions.r=o),type:"checkbox"},null,512),[[a,t(l).public.permissions.r]]),X]),e("div",null,[i(e("input",{id:"delete","onUpdate:modelValue":s[7]||(s[7]=o=>t(l).public.permissions.d=o),type:"checkbox"},null,512),[[a,t(l).public.permissions.d]]),q])]),e("button",{class:"btn-main mt-7",onClick:s[8]||(s[8]=o=>V())},"Accept")])):M("",!0)]),_:1},8,["modelValue"]))}});export{H as default};