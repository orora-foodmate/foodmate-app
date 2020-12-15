import messaging from '@react-native-firebase/messaging';

const messagingInstance = messaging();

messagingInstance.onMessage(payload => {

})

export const getFcmToken = async (isFirstLaunch) => {
  if (isFirstLaunch) {
    await messagingInstance.registerDeviceForRemoteMessages();
  }

  await messagingInstance.requestPermission();
  return await messagingInstance.getToken();
}