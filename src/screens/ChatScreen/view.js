import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = ({ userId, roomId, addMessage }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
        createdAt: new Date(),
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          onPressActionButton: (value) => console.log('hello value: ' + value),
          onPress: (value) => console.log('hello onPress value: ' + value),
          onChange: (value) => console.log('hello onChange value: ' + value),
          values: [
            {
              title: '😋 Yes',
              value: 'yes',
            },
            {
              title: '📷 Yes, let me show you with a picture!',
              value: 'yes_picture',
            },
            {
              title: '😞 Nope. What?',
              value: 'no',
            },
          ],
        },
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 4,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    const [message] = messages;
    const payload = {
      text: message.text,
      roomId,
    };
    addMessage(payload);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        style={{ flex: 1 }}
        messages={messages}
        onQuickReply={value => console.log(`onQuickReply:`, value)}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
        }}
      />
    </View>
  );
};

export default ChatScreen;
