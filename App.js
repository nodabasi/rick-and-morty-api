import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Character from './screens/Character';
import Episode from './screens/Episode';
import Home from './screens/Home';

const Stack = createStackNavigator();

export default App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{title:"Rick and Morty"}} name="Home" component={Home} />
        <Stack.Screen name="Episode" component={Episode}/>
        <Stack.Screen name="Character" component={Character}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles= StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

})