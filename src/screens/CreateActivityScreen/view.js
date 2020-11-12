import React, { useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import envConfig from '~/constants/envConfig';
import Button from '~/components/Button';
import ImagePicker from 'react-native-image-picker';
import TextInputField from '~/components/Inputs/TextInputField';
import RNPickerSelect from 'react-native-picker-select';
import DatetimeModal from './components/DatetimeModal';

const { width } = Dimensions.get('window');

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
            'Content-Type': 'application/x-www-form-urlencoded'
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
  const [uploadedImage, setUploadedImage] = useState({url: "https://i.imgur.com/oJChFO4.jpg"});
  const [title, setTitle] = useState('');
  const [datingAt, setDatingAt] = useState(new Date());
  const [finalReviewAt, setFinalReviewAt] = useState(new Date());
  console.log('uploadedImage', uploadedImage)

  return (
    <View>
      <Button title='bbb' onPress={() => handleUploadImage(setUploadedImage)} />
      {!isEmpty(uploadedImage) && <Image source={{ uri: uploadedImage.url }} style={{ width, height: 150 }} />}
      <TextInputField
        placeholder='活動名稱'
        value={title}
        containerStyle={{ width: 230 }}
        onChangeText={(text) => setTitle(text)}
      />      
      <DatetimeModal title='活動日期' onConfirm={(date) => setDatingAt(date)} defaultDate={datingAt} />
      <DatetimeModal title='審核截止日期' onConfirm={(date) => setFinalReviewAt(date)} defaultDate={finalReviewAt} />
      <TextInputField
        placeholder='參與人數'
        value=''
        containerStyle={{ width: 230 }}
        onChangeText={() => false}
      />
      <TextInputField
        placeholder='每日預算'
        value=''
        containerStyle={{ width: 230 }}
        onChangeText={() => false}
      />
      <RNPickerSelect
        placeholder='活動類型'
        value={0}
        onValueChange={(value) => console.log(value)}
        items={[
          { label: '休閒', value: 0 },
          { label: '活動', value: 1 },
          { label: '商業', value: 2 },

        ]}
      />
      <RNPickerSelect
        placeholder='活動類型'
        value={0}
        onValueChange={(value) => console.log(value)}
        items={[
          { label: '各付各的', value: 0 },
          { label: '平均分攤', value: 1 },
          { label: '主揪請客', value: 2 },
          { label: '團友請客', value: 3 },
        ]}
      />
      <TextInputField
        multiline
        numberOfLines={4}
        placeholder='簡介'
        value=''
        containerStyle={{ width: 230 }}
        onChangeText={() => false}
      />
      <Button title='確認' />      
    </View>
  )
}

export default CreateActivityScreen;
