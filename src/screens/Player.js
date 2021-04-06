import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions, Text, SafeAreaView, Image, Slider } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {Button} from '../components/Button';
import { Audio } from 'expo-av';

const { width, height} = Dimensions.get('screen');

function Player({navigation}) {
  const [sound, setSound] = React.useState();
  const [status, setStatus] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(true);



  async function playSound() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false
   });
    console.log('play');
    const { sound } = await Audio.Sound.createAsync(
       {uri: navigation.getParam('path_audio')},
       { 
         shouldPlay: true,
         isLooping: false,
       }
    );
    setSound(sound);

    console.log('Playing Sound');
      if(isLoad){
        await sound.playAsync();
        setIsLoad(false);
        setStatus(true);
        console.log('isload');
      }else{
        if (status) {
          await sound.pauseAsync();
          console.log('pasuse');
          setStatus(false);
        } else {
          await sound.playAsync();
          console.log('replaying');
          setStatus(true);
        }
      }
      
    
  }
  
  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <LinearGradient colors={["#444", "#222"]} style={styles.gradient}>
      <SafeAreaView style={styles.header}>
          <Text style={styles.headerText}>Now playing {navigation.getParam('title')}</Text>
      </SafeAreaView>
      <View style={styles.container}>
          <Image source={{uri: navigation.getParam('images')}} style={styles.image}></Image>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{navigation.getParam('title')}</Text>
            <Button background="rgba(250,80,180,0.9)" text={"heart"} color="white" radius={50} style={{width: 30, height: 30, marginLeft: 40, position: "absolute", right: 10 }}></Button>
          </View>
          <View style={styles.progessContainer}>
            <Slider></Slider>
            <View style={styles.durationContainer}>
                <Text style={[styles.durationText,{textAlign: 'left'}]}>0.0</Text>
                <Text style={[styles.durationText,{textAlign: 'right'}]}>0.0</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            {status ? <TouchableOpacity onPress={playSound}><Button text="pause" color="white" style={styles.mainButton} size={30} ></Button></TouchableOpacity > : <TouchableOpacity onPress={playSound}><Button text="play" color="white" style={styles.mainButton} size={30} ></Button></TouchableOpacity>}
              
          </View>
      </View>
      
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
  },
  header:{
      backgroundColor: "rgba(40,40,40,0.2)",
      height: 40,
  },
  headerText:{
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20
  },
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
  },
  image:{
    width: 250,
    height: 250,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#fff"
  },
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 20
    
  },
  title:{
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    alignItems: "center"
  },
  progessContainer: {
    backgroundColor: 'rgba(225,225,225,0.1)',
    width: width,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  durationContainer: {
    flexDirection: "row"
  },
  durationText: {
    flex: 0.5,
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',

  },
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 40,
  },
  mainButton: {
    marginHorizontal: 30,
  }
});

export default Player;
