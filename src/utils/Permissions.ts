import { PermissionsAndroid, Permission } from 'react-native';
const requestPermission = async (permissions: Permission[]) => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    if (granted) {
      // console.log('permission gratend');
    } else {
      // console.log('permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
export const checkPermission = async (permissions: Permission[]) => {
  // console.log(permissions);
  const permissionsDenied: Permission[] = [];
  for (let i = 0; i < permissions.length; i++) {
    const grated = await PermissionsAndroid.check(permissions[i]);
    if (!grated) {
      // console.log('Permission denied: ', permissions[i]);
      permissionsDenied.push(permissions[i]);
    }
  }
  if (permissionsDenied.length > 0) {
    await requestPermission(permissionsDenied);
  }
};
