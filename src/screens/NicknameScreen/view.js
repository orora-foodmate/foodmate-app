import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import Button from '~/components/Button';
import InputImage from '~/components/Inputs/InputImage';
import TextInputField from '~/components/Inputs/TextInputField';
import registerBackground from '~/assets/images/register_bg.png';
import {inputDonut} from '~/assets/icons';

const MESSAGES = [
  '完成了 ! 開始尋找好食伴囉 !',
  '該怎麼稱呼您呢？',
  '歡迎加入，記得更新個人檔案，讓我們提供更好的服務喔！',
];

const NicknameScreen = (props) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={registerBackground} style={styles.image}>
      <View style={styles.offsetTop}></View>
        <View style={styles.section}>
          <TextInputField
            name='name'
            value={name}
            placeholder='请输入暱稱'
            containerStyle={{width: 230}}
            leftIcon={<InputImage icon={inputDonut} />}
          />
          <View style={styles.buttonZone}>
            <Button title='填好了！' />
          </View>
        </View>
        <View style={styles.sectionImage}>
          <Text style={styles.typography}>{MESSAGES[step]}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

NicknameScreen.options = {
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offsetTop: {
    flex: 1,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionImage: {
    flex: 1,
    alignItems: 'center',
  },
  typography: {
    color: '#707070',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonZone: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default NicknameScreen;