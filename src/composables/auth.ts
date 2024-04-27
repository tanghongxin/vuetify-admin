import { useAccountStore } from '@/store/modules/account';

export const usePermissions = () => {
  const { permissions } = storeToRefs(useAccountStore());
  return { permissions };
};

export const hasPermissions = (permission: string | string[]) => {
  const { permissions } = usePermissions();

  if (!permission.length) return true;

  if (!permissions.value.length) return false;

  if (Array.isArray(permission)) {
    return permission.every((p) => permissions.value.includes(p));
  } else {
    return permissions.value.includes(permission);
  }
};
