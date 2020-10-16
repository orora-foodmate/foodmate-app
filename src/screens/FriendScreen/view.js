import React, { Fragment, useEffect, useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigationButtonPress, useNavigation } from 'react-native-navigation-hooks';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const FriendScreen = props => {
console.log('props', props)
const { push } = useNavigation()

  const [friends, setFriends] = useState([]);

  useNavigationButtonPress((e) => {
    if(props.componentId === e.componentId && e.buttonId === TOP_BAR_RIGHT_BUTTON_ID) {
      push('SearchFriend');
    }
  })

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

FriendScreen.options = {
  topBar: {
    title: {
      text: 'hhh'
    },
    rightButtons: [
      {
        id: TOP_BAR_RIGHT_BUTTON_ID,
        icon: require('assets/icons/search.png'),
        color: 'white',
      }
    ]
  }
};
export default FriendScreen;
