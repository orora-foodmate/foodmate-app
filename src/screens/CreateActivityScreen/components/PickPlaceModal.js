import React, { Fragment, useEffect, useState } from 'react';
import { Modal } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import envConfig from '~/constants/envConfig';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Header, Input, Icon, ListItem, Button } from 'react-native-elements';

const EmptyListItem = ({ onPress }) => (
  <ListItem onPress={onPress}>
    <Icon type='font-awesome' name='map-marker' />
    <ListItem.Content>
      <ListItem.Title>請選擇聚會地點</ListItem.Title>
    </ListItem.Content>
  </ListItem>
);

const PlaceItem = ({ place, onPress }) => (
  <ListItem onPress={onPress}>
    <Icon type='font-awesome' name='map-marker' />
    <ListItem.Content>
      <ListItem.Title>{place.structured_formatting.main_text}</ListItem.Title>
      <ListItem.Subtitle>{place.structured_formatting.secondary_text}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
)
const PickPlaceModal = ({ place, defaultVisible, onConfirm, onFail }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (defaultVisible) setVisible(defaultVisible);
  }, []);
  return (
    <Fragment>
      {
        isEmpty(place)
          ? <EmptyListItem onPress={() => setVisible(true)} />
          : <PlaceItem place={place} onPress={() => setVisible(true)} />
      }
      <Modal visible={visible} style={{ flex: 1, justifyContent: 'flex-end', margin: 0 }}>
        <Header rightComponent={() => <Button title='關閉' onPress={() => setVisible(false)} />} />
        <GooglePlacesAutocomplete
          debounce={2000}
          enablePoweredByContainer={false}
          renderRow={(descriptionProps) => {
            return (
              <ListItem key={descriptionProps.place_id}>
                <Icon type='font-awesome' name='map-marker' />
                <ListItem.Content>
                  <ListItem.Title>{descriptionProps.structured_formatting.main_text}</ListItem.Title>
                  <ListItem.Subtitle>{descriptionProps.structured_formatting.secondary_text}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          }}
          onFail={onFail}
          query={{
            key: envConfig.googleMapApiKey,
            language: 'zh-TW', // language of the results
          }}
          onPress={(data) => {
            const { description, place_id, terms, types } = data;
            const structured_formatting = pick(data.structured_formatting, ['main_text', 'secondary_text']);
            onConfirm({
              description,
              place_id,
              terms,
              types,
              structured_formatting,
            });
            setVisible(false);
          }}
          textInputProps={{
            InputComp: Input,
            placeholder: '活動地點',
            leftIcon: { type: 'font-awesome', name: 'map-marker' },
            errorStyle: { color: 'red' },
          }}
        />
      </Modal>
    </Fragment>

  );
};

PickPlaceModal.defaultProps = {
  defaultVisible: false,
  onFail: () => false
};
export default PickPlaceModal;