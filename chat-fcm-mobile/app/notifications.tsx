import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Foreground notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Android-specific notification channel
if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

export function registerBackgroundNotifications() {
  Notifications.addNotificationReceivedListener(notification => {
    console.log('📩 Foreground notification received:', notification);
  });

  Notifications.addNotificationResponseReceivedListener(response => {
    console.log('📩 Background notification tapped:', response);
    // You can navigate to the chat here if needed
  });
}
