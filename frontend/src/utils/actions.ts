import type { CallbacksI } from "@interfaces/interfaces.generals";
type PromiseT = typeof Promise;

const awaitCallback = async (callback?: CallbacksI<PromiseT>["actions"]) => {
    callback && (await new Promise<void>((resolve, reject) => {
        callback(<PromiseT>{ resolve, reject });
    }));
};

export const onceMounted = async (
    $this = { lifecicles: { mounted: false } }, 
    callback: CallbacksI<PromiseT>["actions"], 
    verifyMounted = true
) => {
  if (verifyMounted) {
    if (!$this.lifecicles.mounted) {
      $this.lifecicles.mounted = true;
      await awaitCallback(callback);
    }
  } else await awaitCallback(callback);
};