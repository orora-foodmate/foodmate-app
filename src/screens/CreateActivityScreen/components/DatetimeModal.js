import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button as BaseButton } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import Text from '~/components/Text';
import Modal from 'react-native-modal';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isEmpty from 'lodash/isEmpty';
import Button from '~/components/Button';

const DatetimeModal = ({title, onConfirm, onCancel, defaultDate}) => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
    if(!isEmpty(defaultDate)) {
      setDate(parseISO(defaultStr));
    }    
  }, []);
  return (
    <View>
      <View>
        <Text>{title}</Text>
      </View>
      <Button type='clear' onPress={() => setShowModal(true)} title={format(date, 'yyyy-MM-dd HH:mm:ss')} />
      <Modal isVisible={showModal} style={styles.container}>
        <View style={styles.content} >
          <View style={styles.header}>
            <View style={styles.headerColumn}>
              <BaseButton
                onPress={() => {
                  setShowModal(false);
                  onConfirm(date);
                }}
                titleStyle={styles.titleStyle}
                title="Confirm"
                type="clear"
              />
            </View>
            <View style={styles.headerColumn}>
              <Text>title</Text>
            </View>
            <View style={styles.headerColumn}>
              <BaseButton
                onPress={() => {
                  setShowModal(false);
                  onCancel();
                }}
                titleStyle={styles.titleStyle}
                title="Cancel"
                type="clear"
              />
            </View>
          </View>
          <DatePicker
            mode='datetime'
            date={date}
            onDateChange={setDate}
          />
        </View>
      </Modal>
    </View>
  );
};

DatetimeModal.defaultProps = {
  onConfirm: () => false,
  onCancel: () => false,
  defaultDate: '',
  title: ''
};
const styles = StyleSheet.create({
  container: { justifyContent: 'flex-end', margin: 0 },
  content: { flex: 1, backgroundColor: 'white', maxHeight: 250, justifyContent: 'flex-end', alignItems: 'center' },
  header: { flex: 1, flexDirection: 'row', backgroundColor: '#e4e4e4', maxHeight: 50 },
  headerColumn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titleStyle: { color: 'black' },
});

export default DatetimeModal;
