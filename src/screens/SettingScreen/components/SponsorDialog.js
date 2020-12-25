import React, {Fragment, useState} from 'react';
import isEmpty from 'lodash/isEmpty';
import {View, StyleSheet, Linking} from 'react-native';
import {Overlay, Image, Icon} from 'react-native-elements';
import {ethers} from 'ethers';
import Text from '~/components/Text';
import Button from '~/components/Button';
import confirmImage from '~/assets/images/image-take-part.png';
import SelectInput from '~/components/Inputs/SelectInput';
import InputImage from '~/components/Inputs/InputImage';
import TextInputField from '~/components/Inputs/TextInputField';
import {iconTag, iconTagError} from '~/assets/icons';
import Config from 'react-native-config';

export const ICON_TYPES = [
  {label: 'USDT', value: 'usdt'},
  {label: 'ETH', value: 'eth'},
];

const SponsorDialog = ({visible, setVisible}) => {
  const [amount, setAmount] = useState('0');
  const [type, setType] = useState('eth');

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      overlayStyle={styles.container}>
      <Fragment>
        <Image source={confirmImage} style={styles.headerImg} />
        <Text h3 style={styles.text}>
          謝謝您的資助
        </Text>
        <View style={styles.note}>
          <SelectInput
            value={type}
            items={ICON_TYPES}
            placeholderText='請選擇資助幣值'
            onValueChange={(value) => setType(value)}
            leftIcon={<InputImage icon={iconTag} errorIcon={iconTagError} />}
          />
        </View>
        <View style={styles.note}>
          <TextInputField
            placeholder='資助金額'
            value={amount}
            containerStyle={{width: 230}}
            onChangeText={(text) => setAmount(text)}
            leftIcon={<Icon type='font-awesome' name='money' />}
          />
        </View>
        <View style={styles.buttonZone}>
          <Button
            title='確認資助'
            onPress={() => {
              if(isEmpty(amount)) {
                return;
              };
              const amountValue = parseFloat(amount, 10);
              if(isNaN(amountValue) || amountValue < 0) {
                return;
              }

              const weiValue = ethers.utils
                .parseEther(amount, 'ether')
                .toString();
              const transferValue = amountValue.toExponential().replace('+', '');
              console.log('🚀 ~ file: SponsorDialog.js ~ line 68 ~ SponsorDialog ~ transferValue', transferValue)
              const uri =
                type === 'eth'
                  ? `https://metamask.app.link/send/${Config.TARGET_ADDRESS}?value=${weiValue}`
                  : `https://metamask.app.link/send/${Config.TARGET_ADDRESS}/transfer?address=0xFb1D709cb959aC0EA14cAD0927EABC7832e65058&uint256=${transferValue}`;
              Linking.openURL(uri);
              setVisible(false);
            }}
          />
          <Button
            title='下次好了'
            type='outline'
            onPress={() => {
              setVisible(false);
            }}
          />
        </View>
      </Fragment>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
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
  textBold: {
    fontWeight: '600',
  },
});

export default SponsorDialog;
