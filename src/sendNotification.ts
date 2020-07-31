import { Expo, ExpoPushMessage, ExpoPushTicket, ExpoPushSuccessTicket } from 'expo-server-sdk';


export default async function sendNotification(expoToken: string) {
  const expo = new Expo();
  let messages: ExpoPushMessage[] = [];

  if (!Expo.isExpoPushToken(expoToken)) {
    console.error(`Push token ${expoToken} is not a valid Expo push token`);
  }

  messages.push({
    to: expoToken,
    sound: 'default',
    body: 'This is a test notification',
    data: { withSome: 'data' }
  });
  const chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    await expo.sendPushNotificationsAsync(chunk);
  }
}

// let chunks = expo.chunkPushNotifications(messages);
// let tickets = [];
// (async () => {
//   for (let chunk of chunks) {
//     try {
//       let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//       console.log(ticketChunk);
//       tickets.push(...ticketChunk);
//     } catch (err) {
//       console.error(err);
//     }
//   }
// })();

// let receptIds = [];
// for (let ticket of tickets) {
//   if (ticket.id) {
//     receptIds.push(ticket.id);
//   }
// }

// let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receptIds);
// (async () => {
//   for (let chunk of receiptIdChunks) {
//     try {
//       let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
//       console.log(`Receipt: ${receipts}`);

//       for (let receiptId in receipts) {
//         let { status, message, details } = receipts[receiptId];
//         if (status === 'ok') {
//           continue;
//         } else if (status === 'error') {
//           console.error(`There is an error sending notification: ${message}`);
//           if (details && details.error) {
//             console.error(`The error code is ${details.error}`);
//           }
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }
// })();
