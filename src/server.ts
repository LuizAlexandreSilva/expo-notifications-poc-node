import express from 'express';

import './sendNotification';

import sendNotification from './sendNotification';

// Docs: https://github.com/expo/expo-server-sdk-node
// Example: https://forums.expo.io/t/server-side-issues-implementing-push-notifications-with-exponent-server-sdk-node/7268


const app = express();

app.get('/notification', async (req, res) => {
  const { expoToken } = req.query;
  await sendNotification(expoToken as string);
  res.send('Notification sended');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});