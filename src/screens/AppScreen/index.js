import React, { Fragment } from "react";
import { Text, Button, ListItem } from "react-native-elements";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
    time: '10:23',
    event: '＠'
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
    time: '周二',
    event: '＠'
  }
];

const AppScreen = () => {
  return (
    <Fragment>
      {list.map((item, index) => (
        <ListItem
          key={`HomeList${index}`}
          leftAvatar={{ source: { uri: item.avatar_url } }}
          title={item.name}
          subtitle={item.subtitle}
          rightTitle={item.time}
          rightSubtitle={item.event}
          bottomDivider
        />
      ))}
    </Fragment>
  );
};

export default AppScreen;
