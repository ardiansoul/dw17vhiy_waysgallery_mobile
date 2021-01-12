import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FollowHome, Home} from '../screens';

const HomeTab = createMaterialTopTabNavigator();
export default function HomeNavigation() {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen name={'today'} component={Home} />
      <HomeTab.Screen name={'follow'} component={FollowHome} />
    </HomeTab.Navigator>
  );
}
