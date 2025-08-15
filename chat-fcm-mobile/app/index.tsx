import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, KeyboardAvoidingView, Platform
} from "react-native";
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from "expo-av";

const getOrCreateSenderName = async () => {
  let name = await AsyncStorage.getItem("senderName");
  if (!name) {
    const randomNum = Math.floor(Math.random() * 10000);
    name = `Sai${randomNum}`;
    await AsyncStorage.setItem("senderName", name);
  }
  return name;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [senderName, setSenderName] = useState("");
  const [messageTimes, setMessageTimes] = useState([]); // For rate limiting

  useEffect(() => {
    // Get or create the sender name
    getOrCreateSenderName().then(setSenderName);

    // Subscribe to messages
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const now = Date.now();
    const recent = messageTimes.filter(t => now - t < 60000); // last 60 seconds

    if (recent.length >= 3) {
      alert("⏳ You can only send 3 messages per minute.");
      return;
    }

    await addDoc(collection(db, "messages"), {
      text,
      sender: senderName,
      createdAt: serverTimestamp(),
    });

    setMessageTimes([...recent, now]); // update recent messages
    setText("");
  };

  const renderItem = ({ item }) => {
    const isOwnMessage = item.sender === senderName;
    return (
      <View
        style={[
          styles.messageContainer,
          isOwnMessage ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
        {item.createdAt?.seconds && (
          <Text style={styles.time}>
            {new Date(item.createdAt.seconds * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECE5DD" },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: "75%",
  },
  myMessage: {
    backgroundColor: "#DCF8C6", // Green for own messages
    alignSelf: "flex-end",
  },
  theirMessage: {
    backgroundColor: "#FFFFFF", // White for others
    alignSelf: "flex-start",
  },
  sender: { fontWeight: "bold", marginBottom: 2 },
  messageText: { fontSize: 16 },
  time: { fontSize: 10, color: "#555", marginTop: 5, alignSelf: "flex-end" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: "#fff",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#075E54",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
