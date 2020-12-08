import React, {Fragment, useEffect, useState} from 'react';
import isEmpty from 'lodash/isEmpty';
import {StyleSheet, View} from 'react-native';
import {Overlay, Avatar, Image} from 'react-native-elements';
import Text from '~/components/Text';
import Button from '~/components/Button';
import colors from '~/theme/color';
import confirmImage from '~/assets/images/image-take-part.png';

const VerifyContent = ({show, member, onClose}) => {
  if (!show) return <Fragment />;

  const {info} = member;

  return (
    <View style={styles.content}>
      <Image source={confirmImage} style={styles.headerImg} />
      <Text h3 style={styles.text}>
        {`${info.name} 想參與活動！`}
      </Text>
      <View style={styles.note}>
        <Text h6>希望可以參加這個優質的好活動！</Text>
      </View>
      <Button title='同意' onPress={console.log} />
      <View style={styles.cancelZone}>
        <Button
          title='拒絕'
          onPress={console.log}
          buttonStyle={{backgroundColor: colors.error}}
        />
        <Button title='返回' type='outline' onPress={onClose} />
      </View>
    </View>
  );
};

const DetailContent = ({show, member, onClose}) => {
  if (!show) return <Fragment />;

  const {info} = member;

  return (
    <View style={styles.content}>
      <Avatar rounded size='large' source={{uri: member.info.avatar}} />
      <Text h2>{member.info.name}</Text>
      <Button title='檢視個人資料' onPress={console.log} />
      <View style={styles.cancelZone}>
        <Button
          title='踢除成員'
          onPress={console.log}
          buttonStyle={{backgroundColor: colors.error}}
        />
        <Button title='返回' type='outline' onPress={onClose} />
      </View>
    </View>
  );
};

const MemberModal = ({visible, users, selectedId, onClose}) => {
  const [member, setMember] = useState({info: {}});
  useEffect(() => {
    if (visible && !isEmpty(selectedId)) {
      const user = users.find((user) => user.id === selectedId);
      setMember(user);
    } else {
      setMember({ info: {}})
    }
  }, [visible, selectedId]);

  const shouldVerify = member.status !== 1;

  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={visible}
      onBackdropPress={onClose}>
      <VerifyContent member={member} show={shouldVerify} onClose={onClose}/>
      <DetailContent member={member} show={!shouldVerify} onClose={onClose}/>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelZone: {
    marginTop: 60,
  },
  headerImg: {
    width: 200,
    height: 80,
    margin: 15,
    resizeMode: 'contain',
  },
  text: {
    paddingBottom: 10,
  },
  note: {
    width: '70%',
    padding: 15,
  },
});

export default MemberModal;
