import React from "react";
import { Text, Button, ListItem } from "react-native-elements";

const list = [
  {
    id: 156326559,
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
  },
  {
    id: 178948852,
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
  }
];

const BlockScreen = () => {
  return (
    <>
      <Text h4>列入黑名单者，无法加入群({list.length})</Text>
      {list.map((item, index) => (
        <ListItem
          key={`BlockList${index}`}
          leftAvatar={{ source: { uri: item.avatar_url } }}
          title={item.name}
          subtitle={item.subtitle}
          bottomDivider
        />
      ))}
    </>
  );
};

export default BlockScreen;
