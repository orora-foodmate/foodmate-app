import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from 'react-native-navigation-hooks';
import { useEventRooms, useFriendRooms } from '~/models';
import RoomItem from './components/RoomItem';

const RoomsScreen = (props) => {
  const friendRooms = useFriendRooms();
  const eventRooms = useEventRooms(props.authUserId);
  console.log('🚀 ~ file: view.js ~ line 10 ~ RoomsScreen ~ eventRooms', eventRooms)
  const { push } = useNavigation();

  return (
      <FlatList
        keyExtractor={item => item.roomId}
        data={[...friendRooms, ...eventRooms]}
        renderItem={({ item }) => {
          return (
            <RoomItem
              {...item}
              push={push}
              socket={props.socket}
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
