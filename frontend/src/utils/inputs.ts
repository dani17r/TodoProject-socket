import { reactive, type UnwrapNestedRefs } from "vue";
import { cloneDeep } from "lodash";

export const superForm = <T extends object>(data: T) => {
  const formDefault = reactive(cloneDeep(data)) as never;

  const form = reactive({
    ...data,
    clear: () => {
      for (const key in form) {
        if (key != "clear") {
          form[key] = formDefault[key];
        }
      }
    },
  });
  return form;
};

export const superModals = <T extends object>(data: T) => {
  const modals = reactive({
    ...data,
    toggle: (name: keyof UnwrapNestedRefs<T>): boolean => {
      return (modals[name] = !modals[name] as never);
    },
  });
  return modals;
};
