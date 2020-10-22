import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const FriendRowItem = ({item}) => (
  <ListItem bottomDivider onPress={() => console.log('item')}>
    <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} >
      <Avatar source={{ uri: item.avatar }} />
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.account}</ListItem.Subtitle>
      </ListItem.Content>
    </TouchableOpacity>
    <ListItem.Chevron type='font-awesome' name='angle-right' onPress={() => console.log('footer')} />
  </ListItem>
);

const VerifyFriendRowItem = ({item}) => (
  <ListItem bottomDivider>
    <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => console.log('content')}>
      <Avatar source={{ uri: item.avatar }} />
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.account}</ListItem.Subtitle>
      </ListItem.Content>
    </TouchableOpacity>
    <ListItem.Chevron type='font-awesome' name='pencil' onPress={() => console.log('footer')} />
  </ListItem>
);

const RowItem = ({ item }) => item.status === 1
  ? <VerifyFriendRowItem item={item} />
  : <FriendRowItem item={item} />

export default RowItem;
