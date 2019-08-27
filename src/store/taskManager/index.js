import queueFactory from 'react-native-queue';

let taskClient = null;

export const initialQueueFactory = () => {
  return queueFactory()
    .then(client => {
      taskClient = client;
      return client;
    })
    .then(client => {
      client.addWorker('example-job', async (id, payload) => {
        console.log('EXECUTING "example-job" with id: ' + id);
        console.log(payload, 'payload');

        await new Promise(resolve => {
          setTimeout(() => {
            console.log('"example-job" has completed!');
            resolve();
          }, 5000);
        });
      });

      client.createJob(
        'example-job',
        {
          emailAddress: 'foo@bar.com',
          randomData: {
            random: 'object',
            of: 'arbitrary data'
          }
        },
        {},
        false
      );

      client.createJob(
        'example-job',
        {
          emailAddress: 'example@gmail.com',
          randomData: {
            random: 'object',
            of: 'arbitrary data'
          }
        },
        {
          timeout: 1000 // This job will timeout in 1000 ms and be marked failed (since worker takes 5000 ms to complete).
        },
        false
      );

      client.createJob('example-job', {
        emailAddress: 'another@gmail.com',
        randomData: {
          random: 'object',
          of: 'arbitrary data'
        }
      });

      return client;
    });
};

console.log('The above jobs are processing in the background of app now.');
