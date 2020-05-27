import * as admin from "firebase-admin";
import { Expo } from "expo-server-sdk";
let expo = new Expo();

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hath-milao.firebaseio.com"
});

const messaging = admin.messaging();

export const SendNotifications = (notification, receivers) => {
  const messages = [];
  receivers.map(fcmArray => {
    fcmArray.map(token => {
      messages.push({
        notification: {
          title: notification.title,
          body: notification.content
        },
        data: notification.dareceiversta,
        token
      });
    });
  });
  if (messages.length > 0) {
    messaging.sendAll(messages);
  }
};

export const SendMobileNotification = (notification, receivers) => {
  const body = notification.content;
  const title = notification.title;
  const messages = [];
  receivers.map(tokkenArray => {
    tokkenArray.map(token => {
      if (!Expo.isExpoPushToken(token)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
      }

      messages.push({
        to: token,
        sound: "default",
        body,
        title,
        data: {
          title,
          body
        }
      });
    });
  });

  if (messages.length > 0) {
    expo.sendPushNotificationsAsync(messages);
  }
};
