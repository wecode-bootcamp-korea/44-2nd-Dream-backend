const { createApp } = require('./app');
const appDataSource = require('./API/models/appDataSource.js');
const { job } = require('./API/utils/bidStatusScheduler');

const startSever = async () => {
  const app = createApp();

  await appDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
      appDataSource.destroy();
    });

  const PORT = process.env.PORT || 3000;

  job;

  app.listen(PORT, () => {
    console.log(`Listening to request on 127.0.0.1:${PORT}`);
  });
};

startSever();
