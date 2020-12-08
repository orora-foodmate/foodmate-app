import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';

const RowItem = ({authUserId, item, onPress}) => {
  return (
    <ListItem bottomDivider disabled={false} onPress={onPress}>
        <Avatar source={{uri: item.info.avatar}} />
        <ListItem.Content style={{marginLeft: 10}}>
          <ListItem.Title>{item.info.name}</ListItem.Title>
          <ListItem.Subtitle>{item.info.account}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  );
};

export default RowItem;
