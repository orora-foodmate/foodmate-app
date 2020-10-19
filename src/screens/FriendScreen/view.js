import React, {Fragment, useEffect, useState} from 'react';
import {SectionList} from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import {ListItem, Avatar, Text} from 'react-native-elements';
import {
  useNavigationButtonPress,
  useNavigation,
} from 'react-native-navigation-hooks';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useFriends } from '~/models';

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
