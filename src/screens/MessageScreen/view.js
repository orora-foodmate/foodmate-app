import React, { Fragment, useEffect, useState } from 'react';
import { useNavigation } from 'react-native-navigation-hooks';
import { ListItem, Avatar } from 'react-native-elements';

const MessageScreen = (props) => {
  const [rooms, setRooms] = useState([]);
  const {
    push,
  } = useNavigation();

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
      {rooms.map((item, index) => {
        const user = item.users.find(u => u.id !== props.userId);

        return (
          <ListItem key={`room-${index}`} bottomDivider onPress={() => push("Chat", { roomId: item.id })}>
            <Avatar source={{ uri: user.avatar }} />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.account}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
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
