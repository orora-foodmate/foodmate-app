import React, { useState } from 'react';
import { View, Image, Dimensions, Modal, ScrollView } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import envConfig from '~/constants/envConfig';
import Button from '~/components/Button';
import ImagePicker from 'react-native-image-picker';
import TextInputField from '~/components/Inputs/TextInputField';
import RNPickerSelect from 'react-native-picker-select';
import DatetimeModal from './components/DatetimeModal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Header, Input, Icon, ListItem } from 'react-native-elements';
import PickPlaceModal from './components/PickPlaceModal';

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
  const [type, setType] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [budget, setBudget] = useState('100');
  const [uploadedImage, setUploadedImage] = useState({ url: "https://i.imgur.com/oJChFO4.jpg" });
  const [title, setTitle] = useState('test title');
  const [userCountMax, setUserCountMax] = useState('10');
  const [description, setDescription] = useState('test');
  const [place, setPlace] = useState();
  const [datingAt, setDatingAt] = useState(new Date());
  const [finalReviewAt, setFinalReviewAt] = useState(new Date());

  const payload = {
    logo: uploadedImage.url,
    publicationPlace: "台北",
    type,
    paymentMethod,
    budget,
    title,
    datingAt,
    finalReviewAt,
    userCountMax,
    description,
    place,
  };

  const handleCreateEvent = () => {
    props.handleCreateEvent(payload);
  };

  return (
    <ScrollView>
      <Button title='編輯活動照' onPress={() => handleUploadImage(setUploadedImage)} />
      {!isEmpty(uploadedImage) && <Image source={{ uri: uploadedImage.url }} style={{ width, height: 150 }} />}
      
      <TextInputField
        placeholder='活動名稱'
        value={title}
        containerStyle={{ width: 230 }}
        onChangeText={(text) => setTitle(text)}
      />
      
      <TextInputField
        placeholder='參與人數'
        value={userCountMax}
        containerStyle={{ width: 230 }}
        onChangeText={(text) => setUserCountMax(text)}
      />
      <TextInputField
        placeholder='消費預算'
        value={budget}
        containerStyle={{ width: 230 }}
        onChangeText={(text) => setBudget(text)}
      />

      <RNPickerSelect
        placeholder={{
          label: '活動類型',
          value: null
        }}
        value={type}
        onValueChange={(value) => setType(value)}
        items={[
          { label: '休閒', value: 0 },
          { label: '活動', value: 1 },
          { label: '商業', value: 2 },
        ]}
      />
      <RNPickerSelect
        placeholder={{
          label: '費用分攤',
          value: null
        }}
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value)}
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
        value={description}
        containerStyle={{ width: 230 }}
        onChangeText={(text) => setDescription(text)}
      />
      <PickPlaceModal place={place} onConfirm={data => setPlace(data)} />
      <DatetimeModal title='活動日期' onConfirm={(date) => setDatingAt(date)} defaultDate={datingAt} />
      <DatetimeModal title='審核截止日期' onConfirm={(date) => setFinalReviewAt(date)} defaultDate={finalReviewAt} />
      <Button title='確認' onPress={handleCreateEvent} />
    </ScrollView>
  )
}

export default CreateActivityScreen;
