// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Onboarding from '../screens/Onboarding';
import HomeScreen from '../screens/Home';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
