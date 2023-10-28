import type { NotifyOptionsI } from "@components/BaseNotify.vue";
import Notify from "@components/BaseNotify.vue";
import { createVNode, render } from "vue";
import { cloneDeep } from "lodash";



export default () => {
  const active = (options: Omit<NotifyOptionsI, "state">) => {
    const el = document.querySelector("#area") as HTMLElement;
    const app = createVNode(Notify, { ...options, state: true });
    render(cloneDeep(app), el);
  };
  const success = (msg: string) =>
    active({
      classContent: "bg-green-600",
      msg,
    });

  const error = (msg: string) =>
    active({
      classContent: "bg-red-600",
      icon: "Danger",
      msg,
    });

  return { active, success, error };
};
