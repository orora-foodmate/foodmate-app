import React, { Fragment, useEffect, useState } from 'react';
import { useNavigation } from 'react-native-navigation-hooks';
import RoomItem from './components/RoomItem';

const MessageScreen = (props) => {
  const [rooms, setRooms] = useState([]);
  const { push } = useNavigation();

  useEffect(() => {
    const sub = props.roomQuery.$.subscribe((r, items) => {
      setRooms(r);
    });
    props.handleGetRooms();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <Fragment>
      {rooms.map((item) => {
        const user = item.users.find(u => u.id !== props.userId);

        return (
          <RoomItem
            key={`room-${item.id}`}
            push={push}
            socket={props.socket}
            name={user.name}
            account={user.account}
            avatar={user.avatar}
            roomId={item.id}
          />
        );
      })}
    </Fragment>
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
