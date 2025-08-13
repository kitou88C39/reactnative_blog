import { Pressable, useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen'; // TabTwoScreenのコンポーネントをインポート
import { RootTabScreenProps } from '../types';

function ButtonTabNavigator() {
  const colorSheme = useColorScheme();
  return (
    <ButtonTabNavigator
      initialRouteName='TabOne'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorSheme].tint,
      }}
    >
<ButtonTabScreen
name="TabOne"
component={TabOneScreen}
options={({navigation}: RootTabScreenProps<'TabOne'>) => ({
title:'Tab One',
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