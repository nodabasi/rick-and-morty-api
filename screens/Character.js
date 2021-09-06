import React, {useState } from 'react';
import { Text, View, Image,StyleSheet,Dimensions} from 'react-native';
import Loading from './Loading';
import { useNavigation,useRoute } from '@react-navigation/native';
import axios from "react-native-axios";

const Character = () => {
  
    const navigation = useNavigation();
    const route = useRoute();

    let source= route.params.url;

    const [isLoading, setLoading] = useState(true);

    const windowWidth = Dimensions.get('window').width;

    const [name,setName]=useState('');
    const [gender,setGender]=useState('');
    const [species,setSpecies]=useState('');
    const [status,setStatus]=useState('');
    const [image,setImage]=useState('');

    const dataTaking = () =>{
        axios.get(source)
        .then(function (response) {
            setName(response.data.name)
            setGender(response.data.gender)
            setSpecies(response.data.species)
            setStatus(response.data.status)
            setImage(response.data.image)
        })
        .then(
            console.log(name)
        )
        .catch(function (error) {
            console.log(error);
        })
        .finally(()=>setLoading(false))
    }

    if(isLoading){
        dataTaking();
    }

  return (
    <View style={styles.container}>
      {isLoading ? <Loading/> : 
      ( <View style={styles.main}>
          <View style={styles.logo}>
            <Image source={require('../assets/rick-and-morty-logo.png')} style={{height:50,width:180}}/>
          </View>
          <View style={styles.content}>
              <Image style={{width:windowWidth*0.7,height:windowWidth*0.7}} source={{uri:image}}/>
                <View style={styles.information}> 
                    <View style={{backgroundColor:'#FAF76B',paddingHorizontal:30,paddingVertical:20, borderRadius:30,borderWidth:3}}>
                        <Text style={{fontSize:28, fontWeight:'bold'}}>{name}</Text>
                    </View>
                    <Text style={styles.texts}>{species}</Text>
                    <Text style={styles.texts}>{gender}</Text>
                    <Text style={styles.texts}>{status}</Text>
                </View>
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
    width:'100%',height:'100%', backgroundColor:'#c1f762'
  },
  logo:{
    alignItems:'center', height:75,
    backgroundColor:'black', justifyContent:'center'
  },
  content:{
    flex:1,
    alignItems:'center', marginTop:'20%'
  },
  information:{
      justifyContent:'center',alignItems:'center',
      marginTop:20
  },
  texts:{
      marginHorizontal:10, fontSize:20,color:'black'
  }

})
export default Character