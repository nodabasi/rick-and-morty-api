import React , { useEffect, useState } from 'react'
import { View,StyleSheet,Text,Image } from 'react-native'
import Loading from './Loading';
import { useNavigation,useRoute } from '@react-navigation/native';

const Episode = ()=> {
    const navigation = useNavigation();
    const route = useRoute();
    let episodeNumber= route.params.epNum;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let source ='https://rickandmortyapi.com/api/episode/' + episodeNumber; 

    const dataTaking =() => {
      fetch(source)
        .then((response) => response.json())
        .then((json) => setData(json))
        .then(console.log(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false)) /* false kısmını true yaparak yükleme ekranını görebilirsiniz, bu projede yükleme süresi kısa olacağı için ekran hiç gözükmeyebilir*/
    }
    if(isLoading) {
        dataTaking();
    }

    return (
        <View style={styles.container}>
            {isLoading ? <Loading/> :
            (<View style={styles.main}>
                <View style={styles.logo}>
                <Image source={require('../assets/rick-and-morty-logo.png')} style={{height:50,width:180}}/>
            </View>
            
            <Text style={{fontSize:30,alignSelf:'center',marginTop:30, fontWeight:'700'}}>{data.name}</Text>
            <View style={styles.info}>
                <View style={styles.left}>
                    <Text style={styles.hitText}>Air Date:  </Text>
                    <Text style={styles.hitText}>Episode:  </Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.text}>{data.air_date}</Text>
                    <Text style={styles.text}>{data.episode}</Text>
                </View>
                
            </View>
            <Text style={{fontSize:30,marginTop:30,marginLeft:20}}>Characters:</Text>
            <View style={{backgroundColor:'red',height:'100%', marginTop:30}}>
                    <Text>Buraya karakterler listelenecek</Text>
            </View>
            </View>)
            }
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
      alignItems:'center',
      justifyContent:'center',flex:1
    },
    main:{
      width:'100%',height:'100%', backgroundColor:'#c1f762'
    },
    logo:{
      alignItems:'center', height:75,
      backgroundColor:'black', justifyContent:'center'
    },
    info:{
        alignItems:'center', paddingLeft:30, backgroundColor:'#7cbc6c',
        flexDirection:'row', marginTop:20
    },
    left:{
        alignItems:'flex-end'
    },
    right:{
        alignItems:'flex-start'
    },
    hitText:{
        fontSize:20, fontWeight:'bold'
    },
    text:{
        fontSize:18
    },

  })

export default Episode
