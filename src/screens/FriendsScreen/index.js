import React, { useContext } from "react";
import { Text, ThemeContext } from "react-native-elements";
import { ScrollView } from "react-native";
import { ListItemChat } from "../../components/ListItem";
import { Actions } from "react-native-router-flux";
import { ButtonSmall } from "../../components/Button";

const applyList = [
  {
    id: 115197438,
    name: "Bella",
    subtitle: "2019/08/27",
    avatar_url: "",
    applyType: "ADD_FRIEND"
  },
  {
    id: 123168365,
    name: "Max",
    subtitle: "2019/08/21",
    avatar_url: "",
    applyType: "ADD_GROUP"
  },
  {
    id: 123329901,
    name: "LaLa",
    subtitle: "2019/08/12",
    avatar_url: "http://placekitten.com/52/52",
    applyType: "APPLY"
  },
  {
    id: 13572,
    name: "讨论群(99)",
    subtitle: "2019/08/12",
    avatar_url: "",
    applyType: "APPLY"
  }
];

const groupList = [
  {
    id: 166334,
    name: "私聊群(3)",
    avatar_url: "",
    edit: true
  },
  {
    id: 10041,
    name: "公開群(1,000)",
    avatar_url: ""
  },
  {
    id: 10058,
    name: "官方群9",
    avatar_url: ""
  }
];

const friendList = [
  {
    id: 178335648,
    name: "Alice",
    avatar_url: "",
    online: 1,
    edit: true
  },
  {
    id: 114168924,
    name: "Amber",
    avatar_url: "",
    online: 0,
    edit: true
  },
  {
    id: 114161667,
    name: "Ben",
    avatar_url: "",
    online: 1,
    edit: true
  },
  {
    id: 112612004,
    name: "Eason",
    avatar_url: "",
    online: 0,
    edit: true
  },
  {
    id: 114916674,
    name: "Jacky",
    avatar_url: "",
    online: 0,
    edit: true
  },
  {
    id: 114915123,
    name: "Jimmy",
    avatar_url: "",
    online: 0,
    edit: true
  },
  {
    id: 123445345,
    name: "Linus",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    online: 0,
    edit: true
  },
  {
    id: 135748474,
    name: "Mom",
    avatar_url: "",
    online: 0,
    edit: true
  },
  {
    id: 131899467,
    name: "Orora",
    avatar_url: "",
    online: 0,
    edit: true
  }
];

const getApplyType = type => {
  const { theme } = useContext(ThemeContext);
  const handleApplyConfirm = () => {};
  switch (type) {
    case "ADD_FRIEND":
      return (
        <ButtonSmall title='加好友' onPress={() => handleApplyConfirm()} />
      );
    case "ADD_GROUP":
      return (
        <ButtonSmall title='加群组' onPress={() => handleApplyConfirm()} />
      );
    case "APPLY":
      return (
        <Text style={{ fontSize: 14, color: theme.colors.grey3 }}>
          等待对方同意
        </Text>
      );

    default:
      return "";
  }
};

const FriendsScreen = () => {
  const handleEnterInfo = item => {
    Actions.infoSetting({ title: item.name, item });
  };
  return (
    <ScrollView>
      <Text h4>等待加入/审核({applyList.length})</Text>
      {applyList.map((item, index) => (
        <ListItemChat
          key={`ApplyList${index}`}
          data={{ ...item, edit: false }}
          rightElement={getApplyType(item.applyType)}
          onPress={() => handleEnterInfo({ ...item, isContact: false })}
        />
      ))}
      <Text h4>群({groupList.length})</Text>
      {groupList.map((item, index) => (
        <ListItemChat
          key={`GroupList${index}`}
          data={{ ...item, edit: false }}
          onPress={() => handleEnterInfo({ ...item, isContact: true })}
        />
      ))}
      <Text h4>好友({friendList.length})</Text>
      {friendList.map((item, index) => (
        <ListItemChat
          key={`FriendList${index}`}
          data={{ ...item, edit: false }}
          onPress={() => handleEnterInfo({ ...item, isContact: true })}
        />
      ))}
    </ScrollView>
  );
};

export default FriendsScreen;
