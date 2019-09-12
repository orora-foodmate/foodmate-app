import React from "react";
import { FlatList } from "react-native";
import { ListItemChat } from "../../components/ListItem";
import { Actions } from "react-native-router-flux";

const list = [
  {
    id: 123445345,
    name: "Linus",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle:
      "IM提供你完整的资安控管，给你最安心的聊天环境。IM提供你完整的资安控管，给你最安心的聊天环境。",
    time: "10:23",
    msg: 3,
    tag: false,
    official: false,
    private: false,
    mute: false
  },
  {
    id: 166334,
    name: "私聊群(3)",
    avatar_url: "",
    subtitle: "Max: Messages Text Messages Text Messages Text Messages Text",
    time: "昨天",
    msg: 12,
    tag: true,
    official: false,
    private: true,
    mute: false
  },
  {
    id: 10041,
    name: "公開群(1,000)",
    avatar_url: "",
    subtitle: "Jimmy: 嗨！",
    time: "周二",
    msg: 1500,
    tag: false,
    official: false,
    private: false,
    mute: true
  },
  {
    id: 10058,
    name: "官方群9",
    avatar_url: "",
    subtitle: "123456789012345678901234567890",
    time: "08/13",
    msg: 0,
    tag: false,
    official: true,
    private: true,
    mute: true
  },
  {
    id: 123168365,
    name: "Max",
    avatar_url: "",
    subtitle: "MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWMWM",
    time: "07/21",
    msg: 0,
    tag: false,
    official: false,
    private: false,
    mute: false
  },
  {
    id: 114915123,
    name: "JimmyJimmyLongLongNameJimmyJimmyLongLongName",
    avatar_url: "",
    subtitle:
      "111111111111111111111111111111111111111111111111111111111111111111111111",
    time: "07/11",
    msg: 9999,
    tag: true,
    official: false,
    private: false,
    mute: true
  },
  {
    id: 114168924,
    name: "Amber",
    avatar_url: "http://placekitten.com/50/50",
    subtitle: "😪",
    time: "07/10",
    msg: 0,
    tag: false,
    official: false,
    private: false,
    mute: false
  },
  {
    id: 114161667,
    name: "Ben",
    avatar_url: "",
    subtitle: "传送了一张图片",
    time: "07/09",
    msg: 0,
    tag: false,
    official: false,
    private: false,
    mute: false
  },
  {
    id: 112612004,
    name: "Eason",
    avatar_url: "",
    subtitle: "传送了一段语音",
    time: "06/21",
    msg: 0,
    tag: false,
    official: false,
    private: false,
    mute: false
  },
  {
    id: 114916674,
    name: "Jacky",
    avatar_url: "",
    subtitle: "🍮🍕🌭🍔🍪🍩🍡🍷🥐🍯🥜🍿🍫",
    time: "06/18",
    msg: 0,
    tag: false,
    official: false,
    private: false,
    mute: false
  },
  {
    id: 135748474,
    name: "Mom",
    avatar_url: "",
    subtitle: "Messages Text",
    time: "06/10",
    msg: 0,
    tag: false,
    official: false,
    private: false,
    mute: false
  }
];

const handleEnterChat = name => () => {
  Actions.chat({ title: name });
};

const renderItem = ({ item }) => {
  return <ListItemChat data={item} onPress={handleEnterChat(item.name)} />;
};

const AppScreen = () => {
  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={item => `HomeList${item.id}`}
    />
  );
};

export default AppScreen;
