import{d as V,X as E,c as y,h as n,k as a,l as t,i as o,w as m,g as e,I as c,A as p,W as C,F as f,S as D,z as w,a0 as L,t as h,G as $,a1 as P,a2 as T,$ as A,T as M}from"./index-4d3304d5.js";import{_ as N}from"./MenuDropdown.vue_vue_type_style_index_0_lang-46cb514a.js";import{p as B}from"./project-5b3fca94.js";const S={key:0,class:"fixed left-0 top-0 z-50 w-full h-[100vh] flex justify-center items-center"},F={key:0,class:"content-list-project"},G={key:0,class:"list-project"},I=["onClick"],W={class:"text-2xl"},q={class:"text-md"},O={class:"card-now-time"},U=["onClick"],X={class:"flex flex-col gap-4 dark:bg-zinc-700 bg-zinc-200 dark:text-zinc-300 p-3 rounded-lg cursor-pointer"},H=["onClick"],J=t("span",null,"Edite",-1),K=["onClick"],Q=t("span",null,"Delete",-1),R={key:0,class:"flex flex-col justify-center items-center"},Y=t("h2",{class:"text-xl font-semibold"},"Nothing found",-1),Z=t("p",{class:"text-lg"},"Maybe you should look for something else",-1),ee=t("h1",{class:"mb-10 text-2xl"},"Welcome to To-Do-Projects",-1),ae=V({__name:"ViewList",setup(te){const{dropdown:r,deleted:j,select:g,modals:i,query:b,loading:_}=B(),{projects:k,getAll:z}=E();let x=y(()=>g.data),v=y(()=>k.value.data.length);return z(!0),(se,l)=>(n(),a(f,null,[t("div",{class:w([!e(v)&&!e(_).val&&"flex justify-center items-center","min-h-[48vh] w-full pt-[110px]"])},[o(C,{name:"fade"},{default:m(()=>[e(_).val?(n(),a("div",S,[o(e(c).Loading)])):p("",!0)]),_:1}),o(T,{name:"fade"},{default:m(()=>[e(_).val?p("",!0):(n(),a("div",F,[e(v)?(n(),a("div",G,[(n(!0),a(f,null,D(e(k).data,(s,d)=>(n(),a("div",{key:d,class:"relative"},[t("div",{class:w(["zoom",e(r).get(d)&&"cool-zoom"])},[t("div",{class:"card-project",onClick:u=>e(L)("project-one",{id:s._id})},[t("h2",W,h(e($.truncate)(s.title,{length:18})),1),t("p",q,h(e($.truncate)(s.description,{length:53})),1),t("span",O,h(e(P)(s.createdAt)),1)],8,I),t("button",{class:"btn-options btn-one",onClick:u=>e(r).toggle(d)},[o(e(c).MenuVertical)],8,U)],2),o(N,{id:s._id,state:e(r).get(d),onClose:u=>e(r).toggle(d)},{default:m(()=>[t("div",X,[t("div",{class:"flex justify-between items-center hover:text-white",onClick:u=>e(i).open.update(s,d)},[J,o(e(c).Edit,{class:"inline"})],8,H),t("div",{class:"flex justify-between items-center hover:text-white",onClick:u=>e(i).open.delete(s._id,d)},[Q,o(e(c).Delete,{class:"inline"})],8,K)])]),_:2},1032,["id","state","onClose"])]))),128))])):p("",!0)]))]),_:1}),o(C,{name:"fade"},{default:m(()=>[!e(v)&&!e(_).val?(n(),a("div",R,[e(b).search!=""?(n(),a(f,{key:0},[Y,Z],64)):(n(),a(f,{key:1},[ee,t("div",{class:"new-card-project zoom",onClick:l[0]||(l[0]=s=>e(i).open.create())},[o(e(c).Plus)])],64))])):p("",!0)]),_:1})],2),o(e(A).ModalAddOrEdit,{id:`modal_add_or_edit-${e(x)._id}`,modal:e(i).addEdit,updated:e(x),onClose:l[1]||(l[1]=s=>e(i).toggle("addEdit"))},null,8,["id","modal","updated"]),o(e(M).Confirm,{id:`modal_confirm-${e(g).id}`,modelValue:e(i).confirm,"onUpdate:modelValue":l[2]||(l[2]=s=>e(i).confirm=s),message:"Do you want to delete this project?",onClose:l[3]||(l[3]=s=>e(i).toggle("confirm")),onConfirm:l[4]||(l[4]=s=>e(j)())},null,8,["id","modelValue"])],64))}});export{ae as default};