import TabOneScreen from '@/screen/TabOneScreen';
import { useColorScheme } from 'react-native';

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
    
)

    </ButtonTabNavigator>
  );
}
