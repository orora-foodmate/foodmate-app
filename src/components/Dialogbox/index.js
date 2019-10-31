import React from 'react';
import propTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Content from './Content';
import Footer from './Footer';
import Modal from 'react-native-modal';

const Dialogbox = props => {
  const { isVisible, descript, onConfirm, onCancel, type, confirmText } = props;
  return (
    <Modal
      isVisible={isVisible}
      animationIn='slideInUp'
      animationInTiming={500}
      animationOut='slideInDown'
      animationOutTiming={500}
      onBackButtonPress={onCancel}>
      <View style={styles.loadingBox}>
        <View style={styles.dialogWrap}>
          <Content descript={descript} />
          <Footer
            type={type}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmText={confirmText}
          />
        </View>
      </View>
    </Modal>
  );
};

Dialogbox.propTypes = {
  isVisible: propTypes.bool.isRequired,
  onConfirm: propTypes.func.isRequired,
  onCancel: propTypes.func.isRequired,
  type: propTypes.oneOf(['ask', 'confirm', 'update', 'logout']),
  descript: propTypes.string,
  confirmText: propTypes.string
};

Dialogbox.defaultProps = {
  descript: 'Alert',
  type: 'confirm',
  confirmText: '',
  onCancel: () => false
};

export default Dialogbox;

const styles = StyleSheet.create({
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  dialogWrap: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
