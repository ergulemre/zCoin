import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Onboarding from '../screens/Onboarding';
import CoinListScreen from '../screens/CoinListScreen';
import CoinDetailScreen from '../screens/CoinDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="CoinListScreen" component={CoinListScreen} />
      <Stack.Screen
        name="CoinDetailScreen"
        component={CoinDetailScreen}
        options={{ headerShown: true, headerTitle: '' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
