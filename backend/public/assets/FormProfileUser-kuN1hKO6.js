import{d as k,h as w,r as C,L as E,K as B,W as F,M as V,f as N,i as S,k as a,g as $,b as n,C as p,D as v,E as _,t as b,V as D}from"./index-tSUvi4SZ.js";import{_ as T}from"./UploadImgProfile.vue_vue_type_style_index_0_lang-TQlhQJXB.js";const z={class:"content-profile"},M=a("h1",{class:"font-bold text-xl mb-2"},"Change data user",-1),K={class:"box-field"},L={class:"box-field"},P=a("label",{for:"fullname"},"Full name",-1),W={class:"input-error"},j={class:"box-field"},q=a("label",{for:"email"},"Email",-1),A={class:"input-error"},G={class:"box-field mt-3"},H=["disabled"],Q=k({__name:"FormProfileUser",setup(I){const m=D(),{user:i,update:h}=w(),g="/upload/profile",l=C({...i.value,file:new Blob}),r=E(!1),x=B(()=>{var s,e;return!!(u()&&((s=l.fullname)!=null&&s.length)&&((e=l.email)!=null&&e.length))}),u=()=>{var s,e;return l.email!=((s=i.value)==null?void 0:s.email)||l.fullname!=((e=i.value)==null?void 0:e.fullname)||l.file.size},{check:y,errors:d,inputError:c}=F({fullname:["empty","min:4"],email:["empty","email"]}),U=()=>{const s=u(),e=y({fullname:String(l.fullname),email:String(l.email)});s&&e.value&&h(l,{actions:()=>{m.success("updated success"),r.value=!0,setTimeout(()=>r.value=!1,300)},error:t=>m.error(t.message)})};return V(()=>{var s,e,t;l.email=(s=i.value)==null?void 0:s.email,l.fullname=(e=i.value)==null?void 0:e.fullname,l.image=(t=i.value)==null?void 0:t.image}),(s,e)=>{var t,f;return N(),S("div",z,[M,a("div",K,[$(T,{clean:r.value,preview:`${n(g)}/${l.image}`,onUpdate:e[0]||(e[0]=o=>l.file=o)},null,8,["clean","preview"])]),a("div",L,[P,p(a("input",{id:"fullname","onUpdate:modelValue":e[1]||(e[1]=o=>l.fullname=o),class:_(["input",n(c)("fullname")])},null,2),[[v,l.fullname,void 0,{trim:!0}]]),a("p",W,b((t=n(d))==null?void 0:t.fullname),1)]),a("div",j,[q,p(a("input",{id:"email","onUpdate:modelValue":e[2]||(e[2]=o=>l.email=o),class:_(["input",n(c)("email")])},null,2),[[v,l.email,void 0,{trim:!0}]]),a("p",A,b((f=n(d))==null?void 0:f.email),1)]),a("div",G,[a("button",{class:"btn-main disabled-btn-main",disabled:!x.value,onClick:e[3]||(e[3]=o=>U())}," Update ",8,H)])])}}});export{Q as default};