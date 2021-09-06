import React , { useState,useCallback } from 'react'
import { View,StyleSheet,Text,Image,ScrollView, RefreshControl, Alert} from 'react-native'
import Loading from './Loading';
import {useRoute,useNavigation} from '@react-navigation/native';
import axios from "react-native-axios";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Episode = ()=> {

    const navigation = useNavigation();
    const route = useRoute();
    let episodeNumber= route.params.epNum;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [charList,setCharList] = useState([]);
    const [charData,setCharData] = useState([]);
    const [refreshing, setRefreshing] =useState(false);
    const [isRefreshed,setIsRefreshed]= useState(true);


    let source ='https://rickandmortyapi.com/api/episode/' + episodeNumber;

    const dataTaking =() =>{
        axios.get(source)
        .then(function (response) {
            setCharList(response.data.characters)
            setData(response.data)
        })
        .then(()=>{
            charDataTaking();
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(()=>setLoading(false))
    }
    const charDataTaking =() =>{
        
        const arr= true;
        const charArray=[];

        charList.map((char)=>{
            axios.get(char)
            .then( function(response){
                const person =(response.data)
                console.log("------------------------")
                console.log(person)
                charArray.push(person)
                console.log(charArray.length)
            })
        })
        if(arr){
            setCharData(charArray)
        }
    }
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setIsRefreshed(false);
        wait(1500).then(() => setRefreshing(false));
      }, []);
    

    if(isLoading){
        dataTaking();
    }

    return (
        <View style={styles.container}>
            {isLoading ? <Loading/> :
            (<View style={styles.main} >
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
             <ScrollView style={{backgroundColor:'#FAF76B',height:'100%', marginTop:30}} refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}>
                  {isRefreshed?  <Text >Api yüklenmesi uzun sürebiliyor ve can sıkabiliyordu sarı alana refresh atarak daha hızlı erişim sağlayabiliyorum bu yüzden bu şekilde bıraktım</Text>
                :<View></View>}
                {charData.map(({image,name,species,url},key)=>{
                    return(
                        <TouchableOpacity key={key} style={styles.charCard} onPress={()=>navigation.navigate("Character",{url:url})}>
                            <Image source={{uri:image}} style={{width:100,height:95,borderTopLeftRadius:20,borderBottomLeftRadius:20}}/>
                            <View style={{justifyContent:'center',marginLeft:20}}>
                            <Text style={{fontSize:24, fontWeight:'700'}}>{name}</Text>
                            <Text style={{fontSize:20}}>{species}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            
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
        flexDirection:'row', marginTop:20, paddingVertical:10
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
    charCard:{
        backgroundColor:'#e4a788',
        marginHorizontal:20,height:100,
        marginVertical:10, flexDirection:'row', borderWidth:3,borderRadius:30
    }

  })

export default Episode