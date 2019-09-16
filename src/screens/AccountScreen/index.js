import React, { useState } from "react";
import { Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, ListItem } from "react-native-elements";
import {
  ListItemSwitch,
  ListItemLink,
  ListItemChat
} from "../../components/ListItem";
import ViewBox from "../../components/ViewBox";

const userDetail = {
  id: 123132154,
  name: "Wendy",
  avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
  edit: true,
  msgNotice: true,
  noticeDetail: false
};

const AccountScreen = () => {
  const [msgNotice, setMsgNotice] = useState(userDetail.msgNotice);
  const [noticeDetail, setNoticeDetail] = useState(userDetail.noticeDetail);

  const toQRcode = () => {
    Actions.myCode();
  };

  const toEditName = () => {
    Actions.editName();
  };

  const toBlock = () => {
    Actions.block();
  };

  const handleLogout = () => {
    Alert.alert(
      "确定退出登录？",
      "",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "退出", onPress: () => Actions.replace("login", {}) }
      ],
      { cancelable: false }
    );
  };

  const handleMsgNotice = () => {
    setMsgNotice(prevMsgNotice => !prevMsgNotice);
  };

  const handleNotices = () => {
    setNoticeDetail(prevNoticeDetail => !prevNoticeDetail);
  };

  return (
    <ViewBox fill>
      <ListItemChat data={userDetail} onPress={toEditName} />
      <ListItem title='ID' rightTitle={String(userDetail.id)} bottomDivider />
      <ListItemLink title='我的二维码' icon onPress={toQRcode} />
      <ListItemSwitch
        title='新消息通知'
        value={msgNotice}
        setValue={handleMsgNotice}
      />
      <ListItemSwitch
        title='通知显示详情'
        value={noticeDetail}
        setValue={handleNotices}
      />
      <Text h4>其他</Text>
      <ListItemLink title='黑名单' small icon onPress={toBlock} />
      <ListItemLink
        title='退出登录'
        small
        color='danger'
        onPress={handleLogout}
      />
    </ViewBox>
  );
};

export default AccountScreen;
