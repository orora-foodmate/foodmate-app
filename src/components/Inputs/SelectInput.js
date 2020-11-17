import React, {Fragment} from 'react';
import propTypes from 'prop-types';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import RNPickerSelect from 'react-native-picker-select';
import {View, StyleSheet} from 'react-native';
import colors from '~/theme/color';

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
  return (
    <Fragment>
      <View style={[styles.container, containerStyle]}>
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
    </Fragment>
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
  container: {
    padding: 15,
    paddingBottom: 8,
    paddingLeft: 0,
    width: '100%',
    display: 'flex',
    borderBottomWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.greyLightest,
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
