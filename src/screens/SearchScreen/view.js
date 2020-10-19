import React, { Fragment, useState } from "react";
import isEmpty from 'lodash/isEmpty';
import { View } from "react-native";
import { SearchBar, Header, Card, Icon } from 'react-native-elements';
import Button from '~/components/Button';
import Text from '~/components/Text';


const EmptyView = () => (
  <View style={{ flex: 1 }}>
    <Text>無資料</Text>
  </View>);

const ValidateButton = ({ authUserId, user, handleInviteFriend, handleRejectInviteFriend, handleApproveInviteFriend }) => {
  const status = user.get('status');
  const userId = user.get('id');
  const friendId = user.get('friendId');

  if(status === 0) {
    return (
      <Button
        title='邀請'
        onPress={() => handleInviteFriend({userId})}
      />
    );
  }
  if(status === 1) {
    return authUserId ===  user.get('friendCreatorId')
      ? (
        <Fragment>
          <Text>等待對方審核</Text>
          <Button title='拒絕' onPress={() => handleRejectInviteFriend({friendId})}/>
        </Fragment>
      )
      : (
        <Fragment>
          <Button title='同意' onPress={() => handleApproveInviteFriend({friendId})}/>
          <Button title='拒絕' onPress={() => handleRejectInviteFriend({friendId})}/>
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


const SearchScreen = ({ authUserId, user, handleGetUserById, handleInviteFriend, handleRejectInviteFriend, handleApproveInviteFriend }) => {
  const [value, setValue] = useState('5f743309d2048d1301677be4');

  return (
    <View style={{ flex: 1 }}>
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

export default SearchScreen;
