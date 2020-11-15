import React, { Fragment, useState } from "react";
import isEmpty from 'lodash/isEmpty';
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigationButtonPress } from 'react-native-navigation-hooks';
import { SearchBar, Card, Icon } from 'react-native-elements';
import Button from '~/components/Button';
import colors from '~/theme/color';
import Text from '~/components/Text';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const EmptyView = () => (
  <View style={{ flex: 1 }}>
    <Text>無資料</Text>
  </View>);

const ValidateButton = ({ authUserId, user, handleInviteFriend, handleRejectInviteFriend, handleApproveInviteFriend }) => {
  const status = user.get('status');
  const userId = user.get('id');
  const creatorId = user.getIn(['friendCreator', 'id']);
  const friendId = user.get('friendId');

  if (authUserId === userId) {
    return <Text>這是你自己</Text>
  }

  if (status === 0) {
    return (
      <Button
        title='邀請'
        onPress={() => handleInviteFriend({ userId })}
      />
    );
  }
  if (status === 1) {
    return authUserId === creatorId
      ? (
        <Fragment>
          <Text>等待對方審核</Text>
          <Button title='拒絕' onPress={() => handleRejectInviteFriend({ friendId })} />
        </Fragment>
      )
      : (
        <Fragment>
          <Button title='同意' onPress={() => handleApproveInviteFriend({ friendId })} />
          <Button title='拒絕' onPress={() => handleRejectInviteFriend({ friendId })} />
        </Fragment>
      );
  }
  return <Text>已經是好友</Text>
}

const Content = ({ authUserId, user, handleInviteFriend, handleRejectInviteFriend, handleApproveInviteFriend }) => {
  return (
    <Card containerStyle={{ borderWidth: 0 }}>
      <Card.Image wrapperStyle={{ borderWidth: 0 }} source={{ uri: user.get('avatar') }} />
      <Card.Title style={{ color: 'black' }}>{user.get('name')}</Card.Title>
      <ValidateButton
        user={user}
        authUserId={authUserId}
        handleInviteFriend={handleInviteFriend}
        handleRejectInviteFriend={handleRejectInviteFriend}
        handleApproveInviteFriend={handleApproveInviteFriend}
      />
    </Card>
  );
}


const SearchScreen = ({ componentId, authUserId, user, handleGetUserById, handleInviteFriend, handleRejectInviteFriend, handleApproveInviteFriend }) => {
  const [value, setValue] = useState('5f73038aa3858fb19533f113');
  const [showModal, setShowModal] = useState(false);

  useNavigationButtonPress((e) => {
    if (
      componentId === e.componentId &&
      e.buttonId === TOP_BAR_RIGHT_BUTTON_ID
    ) {
      setShowModal(true);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={showModal}>
        <QRCodeScanner
          onRead={({data}) => {
            setValue(data);
            setShowModal(false);
            handleGetUserById({ userId: data })
          }}
          flashMode={RNCamera.Constants.FlashMode.torch}
        />
      </Modal>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => setValue(text)}
        value={value}
        showCancel={false}
        rightIcon={<Icon name='search' />}
        onBlur={() => {
          if (!isEmpty(value)) {
            handleGetUserById({ userId: value })
          }
        }}
      />
      {
        user.isEmpty()
          ? <EmptyView />
          : <Content
            user={user}
            authUserId={authUserId}
            handleInviteFriend={handleInviteFriend}
            handleRejectInviteFriend={handleRejectInviteFriend}
            handleApproveInviteFriend={handleApproveInviteFriend}
          />
      }
    </View>
  );
};

SearchScreen.options = {
  topBar: {
    rightButtons: [
      {
        id: TOP_BAR_RIGHT_BUTTON_ID,
        icon: require('assets/icons/scan.png'),
        color: colors.grey,
      },
    ],
  },
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default SearchScreen;
