import TabOneScreen from '@/screen/TabOneScreen';
import { Pressable, useColorScheme } from 'react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

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


    </ButtonTabNavigator>
  );
}
