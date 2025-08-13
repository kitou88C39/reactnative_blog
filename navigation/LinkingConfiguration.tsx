import { LinkingOptions } from '@react-navigation/native';
import * as React from 'expo-linking';

import { RootStackParamList } from '../types';
import TabOneScreen from '../screen/TabOneScreen';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};
export default linking;
