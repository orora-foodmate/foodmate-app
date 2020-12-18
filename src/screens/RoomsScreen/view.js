import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from 'react-native-navigation-hooks';
import { useFriendRooms } from '~/models';
import RoomItem from './components/RoomItem';

const RoomsScreen = (props) => {
  const friendRooms = useFriendRooms();
  const { push } = useNavigation();

  return (
      <FlatList
        keyExtractor={item => item.id}
        data={friendRooms}
        renderItem={({ item }) => {
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

RoomsScreen.options = {
  topBar: {
    title: {
      text: '聊天室',
    },
  },
};

export default RoomsScreen;
