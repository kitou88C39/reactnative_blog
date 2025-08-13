import { useColorScheme } from 'react-native';

function ButtonTabNavigator() {
  const colorSheme = useColorScheme();
  return (
    <ButtonTabNavigator
      initialRouteName='TabOne'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorSheme].tint,
      }}
    ></ButtonTabNavigator>
  );
}
