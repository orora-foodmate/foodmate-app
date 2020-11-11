import React, { useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import envConfig from '~/constants/envConfig';
import Button from '~/components/Button';
import ImagePicker from 'react-native-image-picker';
import TextInputField from '~/components/Inputs/TextInputField';

const {width} = Dimensions.get('window');

const handleUploadImage = (setUploadedImage) => {
  ImagePicker.launchImageLibrary(
    {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    },
    async (photo) => {
      let formData = new FormData();

      const uri = Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "");
      const fileName = uri.split('/').pop();
      const options = {
        name: fileName,
        type: photo.type,
        uri,
      };
      formData.append('image', options); //required

      try {
        const result = await fetch("https://api.imgur.com/3/upload", {
          method: "POST",
          headers: {
            Authorization: `Client-ID ${envConfig.imgUrClientId}`,
            'Content-Type':'application/x-www-form-urlencoded'
          },
          mimeType: 'multipart/form-data',
          body: formData
        }).then(resp => resp.json());
        setUploadedImage({
          url: result.data.link
        });
      } catch (error) {
        setUploadedImage(null);
      }
    },
  )
}
const CreateActivityScreen = props => {
  const [uploadedImage, setUploadedImage] = useState(null);
  console.log('uploadedImage', uploadedImage)

  return (
    <View>
      <Button title='bbb' onPress={() => handleUploadImage(setUploadedImage)}>aaa</Button>
      {!isEmpty(uploadedImage) && <Image source={{uri: uploadedImage.url}} style={{ width, height: 150}}/>}
      <TextInputField
          placeholder='请输入用户名'
          value=''
          containerStyle={{ width: 230 }}
          onChangeText={() => false}
        />
      <Text> CreateActivityScreen </Text>
    </View>
  )
}

export default CreateActivityScreen;