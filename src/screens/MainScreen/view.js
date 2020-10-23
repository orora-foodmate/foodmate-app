import React, { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import noAuthNavigator from '~/navigation/noAuthNavigator';
import rootNavigator from '~/navigation/rootNavigator';
import Text from '~/components/Text';

const MainScreen = ({
  isAuth,
  isInitialed,
  handleInitialApp,
}) => {
  useEffect(() => {
    handleInitialApp();
  }, []);

  useEffect(()=>{
    if(isInitialed) {
      isAuth ? rootNavigator() : noAuthNavigator();
    }
  }, [isInitialed]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => console.log('test')}>
        <Text style={{ color: '#222', fontWeight: 'bold' }}>
          Loading
        </Text>
      </TouchableOpacity>
      <ActivityIndicator size={30} color="#eee" />
    </SafeAreaView>
  )
};

export default MainScreen;

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a'
  },
  topBar: {
    title: {
      color: 'white'
    },
    backButton: {
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14
  }
});

const styles = StyleSheet.create({
  container: {
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
  }
});