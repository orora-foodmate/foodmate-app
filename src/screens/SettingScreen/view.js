import React, { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '~/components/Button';
import { Avatar } from 'react-native-elements';
import QRCode from 'react-native-qrcode-generator';
import colors from '../../theme/color';
import shadow from '../../theme/shadow';
import Text from '~/components/Text';

const SettingScreen = ({
  auth,
  handleLogout,
}) => {

  return (
    <Fragment>
      <View style={styles.infoBox}>
        <Avatar rounded style={styles.avatar} source={{ uri: auth.get('avatar') }}/>
        <View>
          <Text style={styles.nickname}>{auth.get('name')}</Text>
          <Text h3>初級食伴</Text>
        </View>
      </View>
      <View style={styles.title}>
        <Text h3>QR Code</Text>
      </View>
      <View style={styles.qrcodePanel}>
      <QRCode
        value={auth.get("_id")}
        size={200}
        bgColor='black'
        fgColor='white' />
        </View>
      <View style={styles.title}>
        <Text h5>帳號登出</Text>
      </View>
      <View style={styles.buttonZone}>
        <Button title='登出' onPress={handleLogout} />
      </View>
    
    </Fragment>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    marginBottom: 32,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: colors.greyLightest,
  },
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 5,
    marginRight: 15,
    borderRadius: 80,
    borderColor: '#fff',
    backgroundColor: '#fff',
    ...shadow.black
  },
  qrcodePanel: {
    padding: 30,
    alignItems: 'center',
  },
  buttonZone: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    paddingLeft: 20,
  },
  nickname: {
    fontSize: 36,
    color: colors.grey
  },
})

export default SettingScreen;
