import React, { Fragment, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from 'react-native-navigation-hooks';
import { useFriendRooms } from '~/models';
import RoomItem from './components/RoomItem';

const MessageScreen = (props) => {
  const friendRooms = useFriendRooms();
  const { push } = useNavigation();

  useEffect(() => {
    props.handleGetRooms();
  }, []);

  return (
      <FlatList
        keyExtractor={item => item.id}
        data={friendRooms}
        renderItem={({ item }) => {
          console.log("MessageScreen -> item", item)
          return (
            <RoomItem
              push={push}
              socket={props.socket}
              name={item.name}
              account={item.account}
              avatar={item.avatar}
              roomId={item.room}
              userId={props.userId}
              handleAddMessageByWebsocket={props.handleAddMessageByWebsocket}
            />
          );
        }}
      />
  );
};

MessageScreen.options = {
  topBar: {
    title: {
      text: 'Message',
    },
  },
  bottomTab: {
    text: 'Message',
  },
};

export default MessageScreen;
