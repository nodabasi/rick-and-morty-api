import React, { useEffect, useState } from 'react';
import { Text, View, Image,StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Loading from './Loading';

export default Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)); /* false kısmını true yaparak yükleme ekranını görebilirsiniz, bu projede yükleme süresi kısa olacağı için ekran hiç gözükmeyebilir*/
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <Loading/> : 
      ( <View style={styles.main}>
          <View style={styles.logo}>
            <Image source={require('../assets/rick-and-morty-logo.png')} style={{height:50,width:180}}/>
          </View>
          <View style={{flex:1}}>
          <ScrollView>
            
            {data.results.map(({episode,name,id},key)=>{
              return(
                <View key={key}>
                <TouchableOpacity style={styles.items}>  
                <Text style={{fontSize:22,fontWeight:'bold'}}>{name+" " + id}</Text>
                <Text style={{fontSize:18}}>{episode}</Text>
                </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles= StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  main:{
    width:'100%',height:'100%', backgroundColor:'#EAEAEA'
  },
  logo:{
    alignItems:'center', height:75,
    backgroundColor:'black', justifyContent:'center',marginTop:'5%'
  },
  items:{
    backgroundColor:'#FAF76B',height:100,marginVertical:10, paddingLeft:20,
    paddingTop:10, marginHorizontal:'3%', borderRadius:10,borderColor:'black', borderWidth:3
  },

})