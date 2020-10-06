import React from "react";
import { View, Text } from "react-native";
import { SearchBar, Header, Card } from 'react-native-elements';
import Button from '~/components/Button';

const SearchScreen = props => {
  return (
    <View>
      <Header
        centerComponent={() => (
          <SearchBar
            style={{ paddingTop: 0, marginTop: 0 }}
            placeholder="Type Here..."
            onChangeText={() => false}
            value={'search'}
          />
        )}
      />
      <Card containerStyle={{ borderWidth: 0 }}>
        <Card.Image wrapperStyle={{ borderWidth: 0 }} source={{ uri: "https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg" }} />
        <Card.Title style={{color: 'black'}}>name</Card.Title>
        <Button title='邀請' />
      </Card>
    </View>
  );
};

export default SearchScreen;
