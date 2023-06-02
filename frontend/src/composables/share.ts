import type { PermissionsI } from "@interfaces/interfaces.project";
import { projectStore } from "@stores/project";
import { userStore } from "@stores/user";
import { computed, ref } from "vue";

const permissions = ref({
  st: false,
  d: false,
  m: false,
  u: false,
  r: false,
  c: false,
  s: true,
});

export default () => {
  const { project } = projectStore();
  const { user } = userStore();

  const isOwner = computed(() => user.value?._id == project.value?._autor);
  const isGuest = computed(() => {
    const sharePrivate = project.value?.share.private;
    if (sharePrivate?.status) {
      return sharePrivate?.group.some(({ _user }) => _user == user.value?._id);
    } else return false;
  });

  const getPermissionsAutor = () => {
    for (const key in permissions.value) {
      permissions.value[key] = true;
    }
  };

  const getPermissionsPrivate = () => {
    const sharePrivate = project.value?.share.private;
    if (sharePrivate?.group.length) {
      for (const grp of sharePrivate.group) {
        if (grp._user == user.value?._id)
          return (permissions.value = grp.permissions);
      }
    }
  };

  const getPermissionsPublic = () => {
    const sharePublic = project.value?.share.public;
    permissions.value = sharePublic?.permissions as PermissionsI;
  };

  const initPermissions = () => {
    if (isOwner.value) getPermissionsAutor();
    else if (isGuest.value) getPermissionsPrivate();
    else getPermissionsPublic();
  };

  const allowIfPermission = (val: keyof PermissionsI, func: () => void) => {
    permissions.value[val] && func();
  };

  return { isOwner, isGuest, permissions, initPermissions, allowIfPermission };
};
