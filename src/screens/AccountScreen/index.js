import React from "react";
import { Text, ListItem } from "react-native-elements";
import { ListItemSwitch, ListItemLink } from "../../components/ListItem";

const AccountScreen = () => {
  const toQRcode = () => {
    console.log("TCL: toQRcode -> toQRcode");
  };

  const toBlock = () => {
    console.log("TCL: toBlock -> toBlock");
  };

  const handleLogout = () => {
    console.log("TCL: handleLogout -> handleLogout");
  };

  return (
    <>
      <ListItem title='ID' rightTitle='12341234' bottomDivider />
      <ListItemLink title='我的二维码' icon onClick={toQRcode} />
      <ListItemSwitch title='新消息通知' value={true} />
      <ListItemSwitch title='通知显示详情' value={false} />
      <Text h4>其他</Text>
      <ListItemLink title='黑名单' small icon onClick={toBlock} />
      <ListItemLink
        title='退出登录'
        small
        color='danger'
        onClick={handleLogout}
      />
    </>
  );
};

export default AccountScreen;
