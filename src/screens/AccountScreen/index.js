import React, { useState } from "react";
import { Text, ListItem } from "react-native-elements";
import { ListItemSwitch, ListItemLink } from "../../components/ListItem";
import { Actions } from "react-native-router-flux";
import ViewBox from "../../components/ViewBox";

const userDetail = {
  name: "Wendy",
  avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
  id: "1231321546"
};

const AccountScreen = () => {
  const [msgNotice, setMsgNotice] = useState(true);
  const [noticeDetail, setNoticeDetail] = useState(false);

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
    Actions.replace("login", {});
  };

  return (
    <ViewBox fill>
      <ListItem
        title={userDetail.name}
        leftAvatar={{ source: { uri: userDetail.avatar_url } }}
        bottomDivider
        onPress={toEditName}
      />
      <ListItem title='ID' rightTitle={userDetail.id} bottomDivider />
      <ListItemLink title='我的二维码' icon onPress={toQRcode} />
      <ListItemSwitch
        title='新消息通知'
        value={msgNotice}
        setValue={() => setMsgNotice(!msgNotice)}
      />
      <ListItemSwitch
        title='通知显示详情'
        value={noticeDetail}
        setValue={() => setNoticeDetail(!noticeDetail)}
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
