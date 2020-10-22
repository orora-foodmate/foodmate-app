import React, { Fragment, useEffect } from 'react';
import { SectionList } from 'react-native';
import { Text } from 'react-native-elements';
import {
  useNavigationButtonPress,
  useNavigation,
} from 'react-native-navigation-hooks';
import { useFriends } from '~/models';
import BasicSubscribe from './components/BasicSubscribe';
import RowItem from './components/RowIem';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const renderRowItem = ({ item }) => {
  return (
    <RowItem
      item={item}
    />
  );
};
const FriendScreen = (props) => {
  const { push } = useNavigation();
  const data = useFriends();

  useNavigationButtonPress((e) => {
    if (
      props.componentId === e.componentId &&
      e.buttonId === TOP_BAR_RIGHT_BUTTON_ID
    ) {
      push('SearchFriend');
    }
  });

  useEffect(() => {
    props.handleGetFriends();
  }, []);

  return (
    <Fragment>
      <BasicSubscribe
        socket={props.socket}
        userId={props.userId}
        handleInviteFriendByWebsocket={props.handleInviteFriendByWebsocket}
      />
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={renderRowItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text h5>{title}</Text>
        )}
      />
    </Fragment>
  );
};

FriendScreen.options = {
  topBar: {
    rightButtons: [
      {
        id: TOP_BAR_RIGHT_BUTTON_ID,
        icon: require('assets/icons/search.png'),
        color: 'white',
      },
    ],
  },
};

export default FriendScreen;
