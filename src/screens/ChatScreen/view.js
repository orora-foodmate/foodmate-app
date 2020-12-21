import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useMessages } from '~/models';

const ChatScreen = ({ userId, roomId, handleAddMessage, handleGetMessages }) => {
  const messages = useMessages();

  useEffect(() => {
    handleGetMessages({ roomId });
  }, []);

  const onSend = useCallback((messages = []) => {
    const [message] = messages;
    const payload = {
      text: message.text,
      roomId,
    };
    handleAddMessage(payload);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        style={{ flex: 1 }}
        messages={messages}
        onQuickReply={(value) => console.log(`onQuickReply:`, value)}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
        }}
      />
    </View>
  );
};

export default ChatScreen;
