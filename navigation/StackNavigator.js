// navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../paginas/Login';
import Registo from '../paginas/Registo';
import Recupera from '../paginas/Recupera';
import Tabs from './TabNavigator';

const Stack = createStackNavigator();

export default function StackNavigator({ initialRouteName }) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registo" component={Registo} />
      <Stack.Screen name="Recupera" component={Recupera} />
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
}
