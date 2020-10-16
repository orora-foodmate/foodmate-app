import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatScreen = ({userId, roomId, messageQuery, handleAddMessage, handleGetMessages}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    handleGetMessages({roomId});
    const sub = messageQuery.$.subscribe((msgs) => {
    
      const updatedMsgs = msgs.map(msg => {
        const item = msg.toJSON();
        return {
          ...item,
          _id: msg.id,
          user: {
            ...item.user,
            _id: item.user.id
          }
        };
      })
      setMessages(updatedMsgs);
    });

    return () => {
      sub.unsubscribe();
    };
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
    <View style={{flex: 1}}>
      <GiftedChat
        style={{flex: 1}}
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
