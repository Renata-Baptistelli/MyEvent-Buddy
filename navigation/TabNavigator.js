// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import Favoritos from '../paginas/Favoritos';
import Perfil from '../paginas/Perfil';
import Sair from '../paginas/Sair';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 80,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 6,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Favoritos') iconName = 'heart-outline';
          if (route.name === 'Perfil') iconName = 'person-outline';
          if (route.name === 'Sair') iconName = 'log-out-outline';
          return <Ionicons name={iconName} size={size} color={focused ? '#000' : '#FDAA48'} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favoritos" component={Favoritos} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Sair" component={Sair} />
    </Tab.Navigator>
  );
}
