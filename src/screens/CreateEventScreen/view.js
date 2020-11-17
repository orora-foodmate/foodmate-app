import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import Button from '~/components/Button';
import TextArea from '~/components/TextArea';
import TextInputField from '~/components/Inputs/TextInputField';
import DatetimeModal from './components/DatetimeModal';
import RNPickerSelect from 'react-native-picker-select';
import SelectInput from '~/components/Inputs/SelectInput';
import InputImage from '~/components/Inputs/InputImage';
import PickPlaceModal from './components/PickPlaceModal';
import EventPhotoBlock from '~/components/EventPhotoBlock';
import {PAYMENT_METHOD, EVENT_TYPES} from '~/constants/selectItems';
import {handleUploadImage} from '~/helper/imageUploadHelper';
import {DEFAULT_MAP_OBJECT} from './constant';
import {
  inputCalendar,
  inputCalendarError,
  inputCoin,
  inputCoinError,
  inputCredit,
  inputCreditError,
  inputDeadline,
  inputDeadlineError,
  iconLocate,
  iconLocateError,
  iconPerson,
  iconPersonError,
  iconTag,
  iconTagError,
  iconTicket,
  iconTicketError,
} from '~/assets/icons';

const onUploadSuccess = (setter) => (link) => {
  setter({url: link});
};

const onUploadError = (error) => {
  alert(error.message);
};

const onUploadImage = (setUploadedImage) => () => {
  handleUploadImage(onUploadSuccess(setUploadedImage), onUploadError);
};

const CreateActivityScreen = (props) => {
  const [type, setType] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [budget, setBudget] = useState('');
  const [uploadedImage, setUploadedImage] = useState({url: ''});
  const [title, setTitle] = useState('');
  const [userCountMax, setUserCountMax] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState(null);
  const [datingAt, setDatingAt] = useState(new Date());
  const [finalReviewAt, setFinalReviewAt] = useState(new Date());
  const [errors, setErrors] = useState({});

  const payload = {
    logo: uploadedImage.url,
    publicationPlace: '台北',
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
    <ScrollView contentContainerStyle={styles.scroll}>
      <EventPhotoBlock
        uri={uploadedImage.url}
        onEditClick={onUploadImage(setUploadedImage)}
      />
      <View style={styles.form}>
        <TextInputField
          name='title'
          placeholder='活動名稱'
          value={title}
          containerStyle={{width: 230}}
          onChangeText={(text) => setTitle(text)}
          leftIcon={
            <InputImage
              icon={iconTicket}
              errorIcon={iconTicketError}
              isError={!isEmpty(errors.title)}
            />
          }
        />
        <DatetimeModal
          placeholder='活動日期'
          onConfirm={(date) => setDatingAt(date)}
          defaultDate={datingAt}
          leftIcon={
            <InputImage
              icon={inputCalendar}
              errorIcon={inputCalendarError}
              isError={!isEmpty(errors.datingAt)}
            />
          }
        />
        <DatetimeModal
          placeholder='審核截止日期'
          onConfirm={(date) => setFinalReviewAt(date)}
          defaultDate={finalReviewAt}
          leftIcon={
            <InputImage
              icon={inputDeadline}
              errorIcon={inputDeadlineError}
              isError={!isEmpty(errors.userCountMax)}
            />
          }
        />
        <TextInputField
          name='userCountMax'
          placeholder='參與人數'
          value={userCountMax}
          containerStyle={{width: 230}}
          onChangeText={(text) => setUserCountMax(text)}
          leftIcon={
            <InputImage
              icon={iconPerson}
              errorIcon={iconPersonError}
              isError={!isEmpty(errors.userCountMax)}
            />
          }
        />
        <SelectInput
          value={type}
          items={EVENT_TYPES}
          placeholderText='請選擇活動類型'
          onValueChange={(value) => setType(value)}
          leftIcon={
            <InputImage
              icon={iconTag}
              errorIcon={iconTagError}
              isError={!isEmpty(errors.title)}
            />
          }
        />
        <TextInputField
          name='budget'
          placeholder='消費預算'
          value={budget}
          containerStyle={{width: 230}}
          onChangeText={(text) => setBudget(text)}
          leftIcon={
            <InputImage
              icon={inputCredit}
              errorIcon={inputCreditError}
              isError={!isEmpty(errors.budget)}
            />
          }
        />
        <SelectInput
          placeholderText='請選擇分攤方式'
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value)}
          items={PAYMENT_METHOD}
          leftIcon={
            <InputImage
              icon={inputCoin}
              errorIcon={inputCoinError}
              isError={!isEmpty(errors.paymentMethod)}
            />
          }
        />
        <PickPlaceModal
          place={place}
          onConfirm={(data) => setPlace(data)}
          leftIcon={
            <InputImage
              icon={iconLocate}
              errorIcon={iconLocateError}
              isError={!isEmpty(errors.place)}
            />
          }
        />
        <TextArea
          title='簡介'
          numberOfLines={4}
          placeholder='請輸入簡介'
          value={description}
          containerStyle={{width: 230, height: 200}}
          onChangeText={(text) => setDescription(text)}
        />
        <Button title='確認' onPress={handleCreateEvent} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
  },
});

export default CreateActivityScreen;
