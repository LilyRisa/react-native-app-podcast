import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderComponent from "../components/HeaderComponent";
import ListComponent from "../components/ListComponent";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function Untitled({ navigation }) {
  const [sound, setSound] = React.useState([]);
  const [more, setMore] = React.useState(0);
 

  function onLoad(){
    setMore(more + 1);
  }

  React.useEffect(() => {
    fetch('https://adonis-webapp.herokuapp.com/episodes_api').then(res => res.json())
    .then(response => {
      
      setSound(response);
    })
  .catch(err => console.log(err));
// LoadData()
}, [more]);


  return (
    <View style={styles.container}>
      <View style={styles.listComponentStack}>
        <ScrollView>
          { sound.map((v,i) => {
              return <TouchableOpacity key={v.id} onPress={()=> navigation.navigate('Music', {item: sound, index: i})}><ListComponent obj={v}></ListComponent></TouchableOpacity>
          }) }
        </ScrollView>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerComponent: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 66,
    width: viewportWidth,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    backgroundColor: "rgba(0,198,255,1)"
  },
  podcast: {
    position: "absolute",
    
    fontFamily: "roboto-700",
    color: "#121212",
    opacity: 0.53,
    lineHeight: 15,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerComponentStack: {
    // width: 375,
    height: 66,
    marginTop: 35
  },
  listComponent: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 588,
    // width: 375,
    backgroundColor: "rgba(255,255,255,1)"
  },
  materialCardWithImageAndTitle: {
    height: 104,
    width: 364,
    position: "absolute",
    left: 5,
    top: 0
  },
  listComponentStack: {
    // width: 375,
    height: 588,
    marginTop: 11
  }
});

export default Untitled;
