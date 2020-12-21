import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import {Button} from 'react-native-elements';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import colors from '~/theme/color';
import {getFullScreenSize} from '~/utils/imgUtil';

const {width: screenWidth} = Dimensions.get('window');

const ImagePlaceholder = (props) => {
  return <View style={styles.imagePlaceHolder}></View>;
};

const SelectedImage = ({uri, height, width}) => {
  if (isEmpty(uri)) return <ImagePlaceholder />;
  return <Image source={{uri}} style={[styles.image, { height, width }]} />;
};

const EventPhoto = ({uri, onEditClick, hideButton, btnText}) => {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(screenWidth);

  useEffect(() => {
    if (!isEmpty(uri)) {
      Image.getSize(uri, (width, height) => {
        const {width: newWidth, height: newHeight} = getFullScreenSize({
          width,
          height,
        });
        setWidth(newWidth);
        setHeight(newHeight);
      });
    }
  }, [uri]);

  return (
    <View style={styles.imageContainer}>
      <SelectedImage uri={uri} height={height} width={width} />
      {!hideButton && (
        <Button
          title={btnText}
          onPress={onEditClick}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
        />
      )}
    </View>
  );
};

EventPhoto.propTypes = {
  uri: propTypes.string,
  btnText: propTypes.string,
  hideButton: propTypes.bool,
  onEditClick: propTypes.func,
};

EventPhoto.defaultProps = {
  uri: '',
  btnText: '編輯活動照',
  hideButton: false,
  onEditClick: () => false,
};

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    resizeMode: 'contain',
    minHeight: 200,
    backgroundColor: '#eee',
  },
  imagePlaceHolder: {
    backgroundColor: '#eee',
    width: screenWidth,
    height: 200,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 5,
    flex: 1,
    position: 'absolute',
  },
  button: {
    borderWidth: 1.5,
    height: 30,
    width: 100,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  buttonTitle: {
    fontSize: 12,
    lineHeight: 10,
    color: colors.grey,
  },
});

export default EventPhoto;
