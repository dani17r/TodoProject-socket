import { computed, ref } from "vue";

const userId = ref(`${localStorage.getItem("user")}`);

export default () => {
  const getUserId = computed(() => userId.value);

  const setUserId = (val: string) => {
    localStorage.setItem("user", val);
    userId.value = val;
  };
  const removeUserId = () => {
    localStorage.removeItem("user");
    userId.value = "null";
  };

  return {
    removeUserId,
    getUserId,
    setUserId,
    userId,
  };
};
