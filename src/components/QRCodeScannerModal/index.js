import React from 'react';
import propTypes from 'prop-types';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Modal } from "react-native";
import { RNCamera } from 'react-native-camera';
import Button from '~/components/Button';

const QRCodeScannerModal = ({ visible, onRead, onClose }) => {
  return (
    <Modal visible={visible}>
      <QRCodeScanner
        onRead={onRead}
        flashMode={RNCamera.Constants.FlashMode.torch}
        bottomContent={
          <Button title='關閉掃描' onPress={onClose}/>
        }
      />
    </Modal>
  );
};

QRCodeScannerModal.propTypes = {
  visible: propTypes.bool,
  onRead: propTypes.func,
  onClose: propTypes.func,
}

QRCodeScannerModal.defaultProps = {
  visible: false,
  onRead: () => false,
  onClose: () => false,
}

export default QRCodeScannerModal;
