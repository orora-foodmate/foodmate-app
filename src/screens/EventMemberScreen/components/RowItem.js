import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const RowItem = ({ item, onPress }) => (
  <ListItem bottomDivider>
    <TouchableOpacity
      style={{ flex: 1, flexDirection: 'row' }}
      onPress={onPress}>
      <Avatar rounded source={{ uri: item.info.avatar }} />
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>{item.info.name}</ListItem.Title>
        <ListItem.Subtitle>{item.info.account}</ListItem.Subtitle>
      </ListItem.Content>
    </TouchableOpacity>
  </ListItem>
);

export default RowItem;
