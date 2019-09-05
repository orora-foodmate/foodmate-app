import React, { Fragment } from "react";
import { Text, Button, ListItem } from "react-native-elements";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  }
];

const FriendsScreen = () => {
  return (
    <Fragment>
      <Text h4>等待加入/审核({list.length})</Text>
      {list.map((item, index) => (
        <ListItem
          key={`HomeList${index}`}
          leftAvatar={{ source: { uri: item.avatar_url } }}
          title={item.name}
          subtitle={item.subtitle}
          bottomDivider
        />
      ))}
      <Text h4>群({list.length})</Text>
      {list.map((item, index) => (
        <ListItem
          key={`HomeList${index}`}
          leftAvatar={{ source: { uri: item.avatar_url } }}
          title={item.name}
          subtitle={item.subtitle}
          bottomDivider
        />
      ))}
      <Text h4>好友({list.length})</Text>
      {list.map((item, index) => (
        <ListItem
          key={`HomeList${index}`}
          leftAvatar={{ source: { uri: item.avatar_url } }}
          title={item.name}
          subtitle={item.subtitle}
          bottomDivider
        />
      ))}
    </Fragment>
  );
};

export default FriendsScreen;
