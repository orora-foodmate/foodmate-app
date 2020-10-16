import React, {Fragment, useEffect, useState} from 'react';
import {SectionList} from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import {ListItem, Avatar, Text} from 'react-native-elements';
import {
  useNavigationButtonPress,
  useNavigation,
} from 'react-native-navigation-hooks';
import { Header } from 'react-native/Libraries/NewAppScreen';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';
const DEFAULT_SETION_DATA = [
  {
    title: '審核中',
    data: [],
  },
  {
    title: '好友',
    data: [],
  },
];

const renderRowItem = ({item}) => {

  return (
    <ListItem bottomDivider>
      <Avatar source={{uri: item.avatar}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.account}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};
const FriendScreen = (props) => {
  const {push} = useNavigation();

  const [setionData, setSetionData] = useState(cloneDeep(DEFAULT_SETION_DATA));

  useNavigationButtonPress((e) => {
    if (
      props.componentId === e.componentId &&
      e.buttonId === TOP_BAR_RIGHT_BUTTON_ID
    ) {
      push('SearchFriend');
    }
  });

  useEffect(() => {
    const sub = props.friendQuery.$.subscribe((items) => {
      const result = items.reduce((rs, item) => {
        const index = item.status === 2 ? 1 : 0;
        const friend = item.users.find((u) => u._id !== props.userId);

        rs[index].data.push(friend);
        return rs;
      }, cloneDeep(DEFAULT_SETION_DATA));
      setSetionData(result);
    });
    props.handleGetFriends();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <SectionList
      sections={setionData}
      keyExtractor={(item) => item.id}
      renderItem={renderRowItem}
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
