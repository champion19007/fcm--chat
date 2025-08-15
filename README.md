

---

# fcm--chat

A real-time chat application leveraging Firebase Cloud Messaging (FCM) for push notifications.

## 🚀 Features

* **Real-time Messaging**: Instant message delivery between users.
* **Push Notifications**: Receive notifications for new messages.
* **Cross-Platform Support**: Compatible with both mobile and web platforms.

## 📁 Project Structure

```
fcm--chat/
├── chat-fcm-mobile/   # Mobile application code
└── chat-fcm-web/      # Web application code
```

## 📦 Prerequisites

* **Node.js**: Ensure Node.js is installed. Verify with:

  ```bash
  node -v
  ```
* **Expo CLI**: For mobile development:

  ```bash
  npm install -g expo-cli
  ```
* **Firebase Project**: Set up a Firebase project and configure FCM.

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/champion19007/fcm--chat.git
cd fcm--chat
```

### 2. Install Dependencies

For mobile application:

```bash
cd chat-fcm-mobile
npm install
```

For web application:

```bash
cd chat-fcm-web
npm install
```

### 3. Configure Firebase

* Obtain your Firebase configuration details from the Firebase Console.
* For mobile, configure Firebase in your `app.json` or `app.config.js`.
* For web, initialize Firebase in your application's entry point.

### 4. Start the Development Server

For mobile:

```bash
cd chat-fcm-mobile
expo start -c
```

For web:

```bash
cd chat-fcm-web
npm start
```

## 🔧 Firebase Cloud Messaging Setup

1. **Obtain Server Key**: In the Firebase Console, navigate to **Project Settings** > **Cloud Messaging** and copy the **Server Key**.

2. **Configure Push Notifications**:

   * For mobile, utilize the `expo-notifications` library to handle push notifications.
   * For web, use Firebase's JavaScript SDK to manage push notifications.

3. **Send Test Notification**:

   * Use Firebase's Cloud Messaging console to send a test notification to your application.

## 🧪 Testing Push Notifications

* **Mobile**: Use Expo's push notification tool or Firebase's console to send test notifications.
* **Web**: Utilize Firebase's console or implement a custom backend to trigger notifications.

## 📄 License

This project is licensed under the MIT License.

---

Feel free to adjust the template to better fit your project's specifics. If you need further customization or additional sections, let me know!
