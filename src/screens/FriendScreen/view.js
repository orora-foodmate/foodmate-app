import React, {Fragment, useEffect} from 'react';
import {View, SectionList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {
  useNavigationButtonPress,
  useNavigation,
} from 'react-native-navigation-hooks';
import {useFriends} from '~/models';
import BasicSubscribe from './components/BasicSubscribe';
import RowItem from './components/RowIem';
import colors from '~/theme/color';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const renderRowItem = ({item}) => {
  return <RowItem item={item} />;
};

const SectionTitle = ({title}) => {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionText}>{title}</Text>
    </View>
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
    <Fragment>
      <BasicSubscribe
        socket={props.socket}
        userId={props.userId}
        handleInviteFriendByWebsocket={props.handleInviteFriendByWebsocket}
        handleRejectFriendByWebsocket={props.handleRejectFriendByWebsocket}
        handleApproveFriendByWebsocket={props.handleApproveFriendByWebsocket}
      />
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={renderRowItem}
        renderSectionHeader={({section: {title}}) => (
          <SectionTitle title={title} />
        )}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    padding: 15,
    borderColor: colors.greyLightest,
    borderBottomWidth: 1,
  },
  sectionText: {
    color: colors.grey
  }
});

FriendScreen.options = {
  topBar: {
    rightButtons: [
      {
        id: TOP_BAR_RIGHT_BUTTON_ID,
        icon: require('assets/icons/search.png'),
        color: colors.grey,
      },
    ],
  },
};

export default FriendScreen;
