import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux'; // Import your store
import AppNavigator from './src/navigation/AppNavigagtor';
import { SafeAreaView, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
