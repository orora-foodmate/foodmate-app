import { Navigation } from 'react-native-navigation';

const noAuthNavigator = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  visible: false
                }
              }
            },
          },
        ]
      }
    }
  });
};

export default noAuthNavigator;