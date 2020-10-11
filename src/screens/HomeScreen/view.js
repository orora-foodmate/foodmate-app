import React, {Fragment, useEffect, useState} from 'react';
import {ListItem, Avatar} from 'react-native-elements';

const HomeScreen = (props) => {
  const [friends, setFriends] = useState([]);
  console.log("HomeScreen -> friends", friends)

  useEffect(() => {
    console.log('HomeScreen -> useEffect -> friendQuery', props.friendQuery);
    const sub = props.friendQuery.$.subscribe((f) => {
      setFriends(f);
    });
    setTimeout(() => {
      props.handleGetFriends();
    }, 1000);

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
            <Avatar source={{uri: friend.avatar}} />
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

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Homett',
    },
  },
  bottomTab: {
    text: 'Homebt',
  },
};

export default HomeScreen;
