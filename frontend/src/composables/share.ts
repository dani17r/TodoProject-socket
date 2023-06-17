import userLocalStorageComposable from "@composables/userLocalStorage";
import type { PermissionsI, ProjectI } from "@interfaces/interfaces.project";
import type { UserI } from "@interfaces/interfaces.user";
import { projectStore } from "@stores/project";
import { userStore } from "@stores/user";
import { cloneDeep } from "lodash";
import { computed, ref } from "vue";

const { getUserId } = userLocalStorageComposable();

const defaultPermissions = <PermissionsI>{
  st: false,
  d: false,
  m: false,
  u: false,
  r: false,
  c: false,
  s: true,
};

const permissions = ref({ ...defaultPermissions });

const droupPrivateIds = ref<string[]>([]);

const share = ref<ProjectI["share"]>();

export default () => {
  const { project } = projectStore();
  const { user } = userStore();

  const getGroupPrivateIds = () => {
    droupPrivateIds.value = [];
    const sharePrivate = share.value?.private;
    droupPrivateIds.value.push(getUserId.value);
    sharePrivate?.group.forEach(({ _id }) => {
      droupPrivateIds.value.push(_id);
    });
  };

  const restarOrInitSharePrivate = () => {
    share.value = cloneDeep(project.value?.share);
    getGroupPrivateIds();
  };

  const restarOrInitSharePublic = () => {
    share.value = cloneDeep(project.value?.share);
  };

  const isOwner = computed(() => user.value?._id == project.value?._autor);
  const isGuest = computed(() => {
    const sharePrivate = share.value?.private;
    if (sharePrivate?.status) {
      return sharePrivate?.group.some(({ _id }) => _id == user.value?._id);
    } else return false;
  });

  const getPermissionsAutor = () => {
    for (const key in permissions.value) {
      permissions.value[key] = true;
    }
  };

  const getPermissionsPrivate = () => {
    const sharePrivate = share.value?.private;
    if (sharePrivate?.group.length) {
      for (const grp of sharePrivate.group) {
        if (grp._id == user.value?._id)
          return (permissions.value = grp.permissions);
      }
    }
  };

  const getPermissionsPublic = () => {
    const sharePublic = share.value?.public;
    permissions.value = sharePublic?.permissions as PermissionsI;
  };

  const initPermissions = () => {
    restarOrInitSharePrivate();

    if (isOwner.value) getPermissionsAutor();
    else if (isGuest.value) getPermissionsPrivate();
    else getPermissionsPublic();
  };

  const allowIfPermission = (val: keyof PermissionsI, func: () => void) => {
    permissions.value[val] && func();
  };

  const addNewUser = (user: UserI) => {
    droupPrivateIds.value.push(user._id);

    const sharePrivate = share.value?.private;
    sharePrivate?.group.push({
      permissions: defaultPermissions,
      email: user.email,
      _id: user._id,
    });
  };

  return {
    defaultPermissions,
    droupPrivateIds,
    permissions,
    isOwner,
    isGuest,
    share,

    restarOrInitSharePrivate,
    restarOrInitSharePublic,
    getGroupPrivateIds,
    allowIfPermission,
    initPermissions,
    addNewUser,
  };
};
