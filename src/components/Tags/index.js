import React, {Fragment} from 'react';
import propTypes from 'prop-types';
import {Text} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';

const Tag = ({content}) => {
  return (
    <View>
      <Text>{content}</Text>
    </View>
  );
};

const Tags = ({tags, ...props}) => {
  return (
    <Fragment>
      {tags.map((tag, index) => (
        <Tag key={`tag_${index}`} content={tag.content} />
      ))}
    </Fragment>
  );
};

Tags.propTypes = {
  tags: propTypes.arrayOf(propTypes.object)
}

Tags.defaultProps = {
  tags: []
}

const styles = StyleSheet.create({
  tag: {
    display: 'flex',
    flexWrap: 'wrap', 
    flexDirection: 'row',
  },
});

export default Tags;
