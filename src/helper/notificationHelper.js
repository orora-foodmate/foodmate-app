import messaging from '@react-native-firebase/messaging';

const messagingInstance = messaging();

export const getFcmToken = async (isFirstLaunch) => {
  if(isFirstLaunch) {
    await messagingInstance.registerDeviceForRemoteMessages();
  }
  
  await messagingInstance.requestPermission();
  return await messagingInstance.getToken();
}