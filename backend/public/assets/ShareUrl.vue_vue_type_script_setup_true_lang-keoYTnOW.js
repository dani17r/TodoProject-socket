import{d as r,f as c,i,k as t,g as l,b as p,I as d}from"./index-tSUvi4SZ.js";const m={class:"flex items-center mb-4"},k=r({__name:"ShareUrl",props:{projectId:{default:""}},setup(s){const a=s,e=`${window.location.origin}/share/project/${a.projectId}`,n=()=>navigator.clipboard.writeText(e);return(f,o)=>(c(),i("div",m,[t("div",{class:"w-full",onClick:o[0]||(o[0]=_=>n())},[t("input",{type:"text",class:"input",disabled:"",value:e})]),t("a",{href:e,target:"_blank",class:"pl-2"},[l(p(d).OpenIn)])]))}});export{k as _};