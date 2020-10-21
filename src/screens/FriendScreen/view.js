import React, {useEffect} from 'react';
import {SectionList} from 'react-native';
import {Text} from 'react-native-elements';
import {
  useNavigationButtonPress,
  useNavigation,
} from 'react-native-navigation-hooks';
import { useFriends } from '~/models';
import RowItem from './components/RowItem';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const renderRowItem = ({item}, userId, socket) => {
  return (
    <RowItem item={item} userId={userId} socket={socket}/>
  );
};
const FriendScreen = (props) => {
  const {push} = useNavigation();
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
    <SectionList
      sections={data}
      keyExtractor={(item) => item.id}
      renderItem={(itemProps) => renderRowItem(itemProps, props.userId, props.socket)}
      renderSectionHeader={({section: {title}}) => (
        <Text h5>{title}</Text>
      )}
    />
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
