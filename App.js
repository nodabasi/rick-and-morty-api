import React from 'react';
import {View,StyleSheet} from 'react-native';
import Home from './screens/Home';

export default App = () => {

  return (
    <View style={styles.container}>
     <Home/>
    </View>
  );
};

const styles= StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

})