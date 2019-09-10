import React from "react";
import { ListItemChat } from "../../components/ListItem";
import { Actions } from "react-native-router-flux";

const list = [
  {
    id: 123445345,
    name: "Linus",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "IM提供你完整的资安控管，给你最安心的聊天环境。",
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
    subtitle: "Messages Text",
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
    subtitle: "Messages Text",
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
    subtitle: "Messages Text",
    time: "08/13",
    msg: 0,
    tag: false,
    official: true,
    private: true,
    mute: true
  },
  {
    id: 1145915,
    name: "Max",
    avatar_url: "",
    subtitle: "Messages Text",
    time: "07/21",
    msg: 0,
    tag: false,
    official: false,
    private: false,
    mute: false
  }
];

const AppScreen = () => {
  const handleEnterChat = name => {
    Actions.chat({title: name})
  };
  return (
    <>
      {list.map((item, index) => (
        <ListItemChat
          key={`HomeList${index}`}
          data={item}
          onPress={()=>handleEnterChat(item.name)}
        />
      ))}
    </>
  );
};

export default AppScreen;
