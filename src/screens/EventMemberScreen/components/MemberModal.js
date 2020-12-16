import React, {Fragment, useEffect, useState} from 'react';
import isEmpty from 'lodash/isEmpty';
import {StyleSheet, View} from 'react-native';
import {Overlay, Avatar, Image} from 'react-native-elements';
import Text from '~/components/Text';
import Button from '~/components/Button';
import colors from '~/theme/color';
import confirmImage from '~/assets/images/image-join-request.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const handleApprove = ({
  userId,
  onClose,
  eventId,
  handleValidEventMember,
}) => () => {
  handleValidEventMember({eventId, userId});
  onClose();
};

const GoBackButton = ({show, onClose}) => {
  if (!show) return <Fragment />;

  return (
    <Fragment>
      <View style={styles.cancelZone}>
        <Button
          title='返回'
          type='outline'
          onPress={onClose}
          buttonStyle={{width: 200}}
        />
      </View>
    </Fragment>
  );
};

const VerifyButton = ({
  show,
  eventId,
  userId,
  onClose,
  handleValidEventMember,
  handleRejectEventMember,
}) => {
  if (!show) return <Fragment />;

  const onApprove = handleApprove({
    eventId,
    userId,
    onClose,
    handleValidEventMember,
  });

  return (
    <Fragment>
      <Button title='同意' onPress={onApprove} buttonStyle={{width: 200}} />
      <View style={styles.cancelZone}>
        <Button
          title='拒絕'
          onPress={() => handleRejectEventMember({eventId, userId})}
          buttonStyle={{backgroundColor: colors.error, width: 200}}
        />
        <Button
          title='返回'
          type='outline'
          onPress={onClose}
          buttonStyle={{width: 200}}
        />
      </View>
    </Fragment>
  );
};

const VerifyContent = ({
  show,
  eventId,
  isAdmin,
  member,
  handleValidEventMember,
  handleRejectEventMember,
  onClose,
}) => {
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
      <VerifyButton
        show={isAdmin}
        userId={member.info.id}
        eventId={eventId}
        onClose={onClose}
        member={member}
        handleValidEventMember={handleValidEventMember}
        handleRejectEventMember={handleRejectEventMember}
      />
      <GoBackButton show={!isAdmin} onClose={onClose} />
    </View>
  );
};

const SelectItem = ({title, show, onPress, bottomBorder}) => {
  if (!show) return <Fragment />;

  const borderBottomStyle = bottomBorder ? styles.borderBottom : {};
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.selectContainer, borderBottomStyle]}>
        <Text style={{textAlign: 'center'}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DetailContent = ({push, show, member, isAdmin, onClose}) => {
  if (!show) return <Fragment />;

  return (
    <View style={styles.content}>
      <Avatar rounded size='large' source={{uri: member.info.avatar}} />
      <Text h2>{member.info.name}</Text>
      <Button
        title='檢視個人資料'
        onPress={() => {
          onClose();
          push('MemberDetail', {userId: member.info.id});
        }}
      />
      <SelectItem
        show={isAdmin}
        bottomBorder
        title='踢除成員'
        onPress={console.log}
      />
      <SelectItem show title='取消' onPress={onClose} />
      <View style={styles.cancelZone}>
        <Button
          title='踢除成員'
          disabled={!isAdmin}
          onPress={console.log}
          buttonStyle={{backgroundColor: colors.error, width: 200}}
        />
        <Button
          title='返回'
          type='outline'
          onPress={onClose}
          buttonStyle={{width: 200}}
        />
      </View>
    </View>
  );
};

const MemberModal = ({
  push,
  users,
  visible,
  eventId,
  isAdmin,
  onClose,
  selectedId,
  handleValidEventMember,
  handleRejectEventMember,
}) => {
  const [member, setMember] = useState({info: {}});
  useEffect(() => {
    if (visible && !isEmpty(selectedId)) {
      const user = users.find((user) => user.id === selectedId);
      setMember(user);
    } else {
      setMember({info: {}});
    }
  }, [visible, selectedId]);

  const shouldVerify = member.status !== 1;

  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={visible}
      onBackdropPress={onClose}>
      <Fragment>
        <VerifyContent
          member={member}
          eventId={eventId}
          isAdmin={isAdmin}
          onClose={onClose}
          show={shouldVerify}
          handleValidEventMember={handleValidEventMember}
          handleRejectEventMember={handleRejectEventMember}
        />
        <DetailContent
          push={push}
          member={member}
          isAdmin={isAdmin}
          onClose={onClose}
          show={!shouldVerify}
        />
      </Fragment>
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
    alignItems: 'center',
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
  selectContainer: {
    padding: 12,
    width: 200,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: colors.greyLightest,
  },
});

export default MemberModal;
