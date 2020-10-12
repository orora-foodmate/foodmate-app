import React, { Fragment, useEffect, useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';

const MessageScreen = (props) => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const sub = props.friendQuery.$.subscribe((f) => {
      setFriends(f);
    });
    props.handleGetFriends();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <Fragment>
      {friends.map((item, index) => {
        const friend = item.users.find(u => u._id !== props.userId);
        return (
          <ListItem key={`friend-${index}`} bottomDivider>
            <Avatar source={{ uri: friend.avatar }} />
            <ListItem.Content>
              <ListItem.Title>{friend.name}</ListItem.Title>
              <ListItem.Subtitle>{friend.account}</ListItem.Subtitle>
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
