import { reactive } from "vue";

const loading = reactive({
  val: false,
  enable: () => (loading.val = true),
  disable: () => (loading.val = false),
});

export default () => {
  return {
    loading,
  };
};
