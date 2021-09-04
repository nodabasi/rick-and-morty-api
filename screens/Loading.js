import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress';

const Loading = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/loading-rick.png')} style={{width:300,height:300,resizeMode:'contain'}}/>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Progress.CircleSnail color={'#00ff00'} size={100} thickness={15}/>
                <Image source={require('../assets/loading-text.png')} style={{height:100,width:200,resizeMode:'cover'}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})
export default Loading
