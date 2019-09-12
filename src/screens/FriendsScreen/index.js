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
    avatar_url: "",
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
    avatar_url: ""
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
    avatar_url: ""
  },
  {
    id: 114168924,
    name: "Amber",
    avatar_url: ""
  },
  {
    id: 114161667,
    name: "Ben",
    avatar_url: ""
  },
  {
    id: 112612004,
    name: "Eason",
    avatar_url: ""
  },
  {
    id: 114916674,
    name: "Jacky",
    avatar_url: ""
  },
  {
    id: 114915123,
    name: "Jimmy",
    avatar_url: ""
  },
  {
    id: 123445345,
    name: "Linus",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
  },
  {
    id: 135748474,
    name: "Mom",
    avatar_url: ""
  },
  {
    id: 131899467,
    name: "Orora",
    avatar_url: ""
  }
];

const getApplyType = type => {
  const { theme } = useContext(ThemeContext);
  switch (type) {
    case "ADD_FRIEND":
      return <ButtonSmall title='加好友' />;
    case "ADD_GROUP":
      return <ButtonSmall title='加群组' />;
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
  const handleEnterInfo = name => {
    Actions.infoSetting({ title: name });
  };
  return (
    <ScrollView>
      <Text h4>等待加入/审核({applyList.length})</Text>
      {applyList.map((item, index) => (
        <ListItemChat
          key={`ApplyList${index}`}
          data={item}
          rightElement={getApplyType(item.applyType)}
          onPress={() => handleEnterInfo(item.name)}
        />
      ))}
      <Text h4>群({groupList.length})</Text>
      {groupList.map((item, index) => (
        <ListItemChat
          key={`GroupList${index}`}
          data={item}
          onPress={() => handleEnterInfo(item.name)}
        />
      ))}
      <Text h4>好友({friendList.length})</Text>
      {friendList.map((item, index) => (
        <ListItemChat
          key={`FriendList${index}`}
          data={item}
          onPress={() => handleEnterInfo(item.name)}
        />
      ))}
    </ScrollView>
  );
};

export default FriendsScreen;
