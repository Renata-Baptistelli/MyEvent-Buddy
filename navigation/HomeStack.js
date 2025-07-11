// navigation/HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../paginas/Home';
import DetalhesEvento from '../paginas/DetalhesEvento';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="DetalhesEvento" component={DetalhesEvento} />
    </Stack.Navigator>
  );
}
