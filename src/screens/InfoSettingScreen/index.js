import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import { Text, ThemeContext, Button } from "react-native-elements";
import {
  ListItemSwitch,
  ListItemLink,
  ListItemChat
} from "../../components/ListItem";
import { Actions } from "react-native-router-flux";

const InfoSettingScreen = ({ item }) => {
  const { theme } = useContext(ThemeContext);
  const [noticeDetail, setNoticeDetail] = useState(false);

  const toEditName = () => {
    Actions.editFriendName();
  };

  const setBlock = () => {
    Alert.alert(
      "加入黑名单",
      `好友 ${item.name} 加入黑名单后，无法发消息给你`,
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "黑单", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  const setDelete = () => {
    Alert.alert(
      "删除好友",
      `删除好友 ${item.name} 会同时删除聊天记录`,
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "删除", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  const handleNotice = () => {
    setNoticeDetail(prevNoticeDetail => !prevNoticeDetail);
  };

  const handleChat = () => {
    Actions.chat({ title: item.name, id: item.id });
  };

  const getOnlines = () => {
    switch (item.online) {
      case 1:
        return <Text style={{ color: theme.colors.success }}>在线</Text>;
      case 0:
        return <Text style={{ color: theme.colors.grey3 }}>离线</Text>;
      default:
        return null;
    }
  };

  return (
    <>
      <ListItemChat
        data={item}
        subtitle={"ID: " + item.id}
        rightElement={getOnlines()}
        bottomDivider
        onPress={toEditName}
      />
      <ListItemSwitch
        title='通知'
        value={noticeDetail}
        setValue={handleNotice}
      />
      <Text h4>其他</Text>
      <ListItemLink title='加入黑名单' small icon onPress={setBlock} />
      <ListItemLink title='删除' small color='danger' onPress={setDelete} />
      {item.isContact ? (
        <Button title='发消息' type='outline' onPress={handleChat} />
      ) : null}
    </>
  );
};

export default InfoSettingScreen;
