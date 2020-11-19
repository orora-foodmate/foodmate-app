import React, {Fragment} from 'react';
import propTypes from 'prop-types';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import RNPickerSelect from 'react-native-picker-select';
import {View, StyleSheet} from 'react-native';
import colors from '~/theme/color';
import ErrorMessage from './ErrorMessage';

const LeftIcon = ({leftIcon}) => {
  if (isEmpty(leftIcon)) return <Fragment />;
  return <View style={styles.icon}>{leftIcon}</View>;
};

const SelectInput = ({
  value,
  items,
  leftIcon,
  errorMessage,
  onValueChange,
  containerStyle,
  placeholderText,
  ...props
}) => {
  const isError = !isEmpty(errorMessage);
  const errorStyle = isError ? styles.errorStyle : {};
  const errorFormStyle = isError ? { height: 70 } : { height: 50 };

  return (
    <View style={[styles.formBox, errorFormStyle]}>
      <View style={[styles.container, containerStyle, errorStyle]}>
        <LeftIcon leftIcon={leftIcon} />
        <RNPickerSelect
          placeholder={{
            label: placeholderText,
            value: null,
          }}
          value={value}
          items={items}
          onValueChange={onValueChange}
          textInputProps={{
            style: [styles.select, isNull(value) ? styles.placeholder : {}],
          }}
          {...props}
        />
      </View>
      <ErrorMessage errorMessage={errorMessage}/>
    </View>
  );
};

SelectInput.propTypes = {
  placeholderText: propTypes.string,
  leftIcon: propTypes.node,
  value: propTypes.oneOfType(propTypes.string, propTypes.oneOf([null])),
  items: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      value: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
        propTypes.oneOf([null]),
      ]),
    })
  ),
};

SelectInput.defaultProps = {
  placeholderText: '',
  value: null,
  items: [],
};

const styles = StyleSheet.create({
  formBox: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  container: {
    padding: 15,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 8,
    borderBottomWidth: 2,
    paddingTop: 10,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.greyLightest,
  },
  errorStyle: {
    paddingTop: 6,
    borderColor: colors.error,
  },
  icon: {
    paddingRight: 10,
  },
  select: {
    height: 28,
    fontSize: 16,
    width: '100%',
    display: 'flex',
  },
  placeholder: {
    color: colors.greyLight,
  },
});

export default SelectInput;
