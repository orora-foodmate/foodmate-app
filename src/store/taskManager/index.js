import queueFactory from 'react-native-queue';

let taskClient = null;

export const initialQueueFactory = () => {
  return queueFactory()
    .then(client => {
      taskClient = client;
      return client;
    })
};
