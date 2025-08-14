import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from "react";
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import ModalScreen from "../screen/ModalScreen";
import NotFoundScreen from '../screen/NotFoundScreen';
import HomeScreen from '../screen/HomeScreen';
import TabTwoScreen from '../screen/CreateScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../type';
import LinkingConfigOption from './LinkingConfigOption';


export default function Navigation({colorSheme}: {colorSheme: ColorSchemeName}){
    return (
        <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorSheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}


const Stack = createStackNavigator<RootStackParamList>();

function ButtonTabNavigator() {
  const colorSheme = useColorScheme();
  return (
    <ButtonTabNavigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
<ButtonTabScreen
name="Home"
component={TabOneScreen}
options={({navigation}: RootTabScreenProps<'Home'>) => ({
title:'Home',
HeaderShown:false,
tabBarIcon: ({color}) => <TabBarIcon name='code' color={color} />
haederRight: () => (
  <Pressable
    onPress={() => navigation.navigate('Modal')}
    style={({pressed}) => ({
        opacity: pressed ? 0.5 : 1,
    })}>
<FontAwesome
    name="info-circle"
    color={Color[colorScheme].text}
    style={{marginRight: 15}}
/>
</Pressable>
  ),
})}
/>
<ButtonTabScreen
name="CreateScreen"
component={CreateScreen}
options={{
    title: 'Tab Two',
    HeaderShown:false,
    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
}}
/>
</ButtonTabNavigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
