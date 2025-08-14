import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from "react";

import Colors from '../constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import ModalScreen from "../screen/ModalScreen";
import NotFoundScreen from '../screen/NotFoundScreen';
import TabOneScreen from '../screen/TabOneScreen';
import TabTwoScreen from '../screen/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { LinkingConfigOptions } from 'expo-router/build/getLinkingConfig';
import { ColorSchemeName } from 'react-native';

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
        tabBarActiveTintColor: Colors[colorSheme].tint,
      }}
    >
<ButtonTabScreen
name="Home"
component={TabOneScreen}
options={({navigation}: RootTabScreenProps<'Home'>) => ({
title:'Home',
tabBarIcon: ({color}) => <TabBarIcon name='code' color={color} />
haederRight: () => (
    <Pressable
    onPress={() => navigation.navigate('Modal')}
    style={({pressed}) => ({
        opacity: pressed ? 0.5 : 1,
    })}>
<FontAwesome
    name="info-circle"
    color={Color[colorSheme].text}
    style={{marginRight:15}}
/>
</Pressable>
  ),
})}
/>
<ButtonTabScreen
name="TabTwo"
component={TabOneScreen}
options={{
    title: 'Tab Two',
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
    
    return
        <FontAwesome size={30} style={{marginBottom: -3}} {...props}}/>;
}