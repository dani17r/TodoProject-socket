import { computed, ref } from "vue";

const userId = ref(`${localStorage.getItem("userId")}`);
const projectId = ref(`${localStorage.getItem("projectId")}`);

export default () => {
  const getUserId = computed(() => userId.value);
  const getProjectId = computed(() => projectId.value);

  const setUserId = (val: string) => {
    localStorage.setItem("userId", val);
    userId.value = val;
  };

  const setProjectId = (val: string) => {
    localStorage.setItem("projectId", val);
    userId.value = val;
  };

  const removeUserId = () => {
    localStorage.removeItem("user");
    userId.value = "null";
  };

  return {
    getProjectId,
    setProjectId,
    removeUserId,
    getUserId,
    setUserId,
    userId,
  };
};
