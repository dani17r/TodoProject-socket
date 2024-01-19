import{D as k,E as l,G as h,H as E,e as d,s as n,J as _,K as m,L as e,_ as i}from"./index-31de54ed.js";const u=k("task",{state:()=>({lifecicles:{mounted:!1},tasks:{data:[],trash:[]},query:l.task,project_id:"",loading:{val:!1,enable:()=>u().$state.loading.val=!0,disable:()=>u().$state.loading.val=!1}}),getters:{countTask:t=>t.tasks.data.length},actions:{clear(){this.tasks={data:[],trash:[]},this.lifecicles.mounted=!1,this.query=l.task},setProjectId(t){this.project_id!=t&&(this.project_id=t)},insert(t){h.isEmpty(t)||(this.tasks=t)},getAll(t=!1){this.countTask,E(this,()=>{this.loading.enable();const s=n("/task",this.project_id);_("all",s)({actions:r=>this.insert(r),finally:()=>this.loading.disable()})({query:this.query,_project:this.project_id})},t)},create(t,s){d.emit("task/create");const o=n("/task",this.project_id);_("create",o)(s,{actions:a=>this.insert(a)})({form:t,query:this.query})},update(t,s){d.emit("task/update");const o=n("/task",this.project_id);_("update",o)(s,{actions:a=>{const p=h.findIndex(this.tasks.data,{_id:t._id});a&&(this.tasks.data[p]=a)}})(t)},changePosition(t,s){d.emit("task/move");const o=n("/task",this.project_id);_("change-position",o)(s)(t)},trash(t,s){d.emit("task/trash");const o=n("/task",this.project_id);_("trash",o)(s,{actions:a=>this.insert(a)})({_project:this.project_id,query:this.query,_ids:t})},remove(t,s){d.emit("task/delete");const o=n("/task",this.project_id);_("delete",o)(s,{actions:a=>this.insert(a)})({_project:this.project_id,query:this.query,_id:t})},removeAll(t){d.emit("task/delete-all");const s=n("/task",this.project_id);_("delete-all",s)(t,{actions:r=>this.insert(r)})({_project:this.project_id,query:this.query})}}}),T=()=>{const t=u();return{...t,...m(t)}},j={ModalSelectUserForShare:e(()=>i(()=>import("./ModalSelectUserForShare-bb99099a.js"),["assets/ModalSelectUserForShare-bb99099a.js","assets/index-31de54ed.js","assets/index-d646d8bb.css","assets/InputSearch.vue_vue_type_style_index_0_lang-a3149bb5.js","assets/InputSearch-0bea0421.css"])),ModalPublicShare:e(()=>i(()=>import("./ModalPublicShare-196a0c62.js"),["assets/ModalPublicShare-196a0c62.js","assets/index-31de54ed.js","assets/index-d646d8bb.css","assets/InputToggle.vue_vue_type_script_setup_true_lang-4bcb2352.js"])),ModalPrivateShare:e(()=>i(()=>import("./ModalPrivateShare-e6693d39.js"),["assets/ModalPrivateShare-e6693d39.js","assets/index-31de54ed.js","assets/index-d646d8bb.css","assets/InputToggle.vue_vue_type_script_setup_true_lang-4bcb2352.js"])),TablePrivateShare:e(()=>i(()=>import("./TablePrivateShare-6c7b1d88.js"),["assets/TablePrivateShare-6c7b1d88.js","assets/index-31de54ed.js","assets/index-d646d8bb.css","assets/TablePrivateShare-d69e8f02.css"])),MenuShare:e(()=>i(()=>import("./MenuBtnForShare-5c860b56.js"),["assets/MenuBtnForShare-5c860b56.js","assets/MenuDropdown.vue_vue_type_style_index_0_lang-acaf554d.js","assets/index-31de54ed.js","assets/index-d646d8bb.css","assets/MenuDropdown-06fca914.css"])),Content:e(()=>i(()=>import("./ContentShare-d6100821.js"),["assets/ContentShare-d6100821.js","assets/index-31de54ed.js","assets/index-d646d8bb.css"])),UrlShare:e(()=>i(()=>import("./ShareUrl-4619e0a4.js"),["assets/ShareUrl-4619e0a4.js","assets/ShareUrl.vue_vue_type_script_setup_true_lang-56fce6ce.js","assets/index-31de54ed.js","assets/index-d646d8bb.css"])),ModalTrash:e(()=>i(()=>import("./ModalTrash-ae852a67.js"),["assets/ModalTrash-ae852a67.js","assets/index-31de54ed.js","assets/index-d646d8bb.css","assets/popper.esm-7032ec18.js","assets/ModalTrash-de0ed9a4.css"])),ModalEdit:e(()=>i(()=>import("./ModalEdit-26c0dce3.js"),["assets/ModalEdit-26c0dce3.js","assets/index-31de54ed.js","assets/index-d646d8bb.css","assets/ModalEdit-22752fbe.css"])),Options:e(()=>i(()=>import("./MenuOptions-49bdcd85.js"),["assets/MenuOptions-49bdcd85.js","assets/index-31de54ed.js","assets/index-d646d8bb.css","assets/SelectAscDesc.vue_vue_type_style_index_0_lang-8923e2b7.js","assets/SelectAscDesc-36b5e820.css","assets/task-9efadd08.js","assets/popper.esm-7032ec18.js"])),ModalView:e(()=>i(()=>import("./ModalView-1614aa3d.js"),["assets/ModalView-1614aa3d.js","assets/index-31de54ed.js","assets/index-d646d8bb.css"])),List:e(()=>i(()=>import("./ViewList-53d8be6e.js"),["assets/ViewList-53d8be6e.js","assets/index-31de54ed.js","assets/index-d646d8bb.css","assets/task-9efadd08.js","assets/popper.esm-7032ec18.js","assets/ViewList-97d3a981.css"]))};export{j as T,u as s,T as t};
