
import React, { Component } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import {Button} from '../components/Button';
import { Audio } from 'expo-av';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Dimensions, Text, SafeAreaView, Image, Slider } from "react-native";



export default class PlayerMediaTest extends React.Component {

    state = {
      isPlaying: false,
      playbackInstance: null,
      currentIndex: this.props.navigation.getParam('index'),
      volume: 1.0,
      isBuffering: false,
      listAudio: this.props.navigation.getParam('item')
    }
    // 

    async componentDidMount() {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true
        })
  
        this.loadAudio()
      } catch (e) {
        console.log(e)
      }
    }
    async componentWillUnmount() {
      const {playbackInstance } = this.state
      await playbackInstance.unloadAsync()
      this.setState = (state,callback)=>{
          return;
      };
    }
    async loadAudio() {
      const {currentIndex, isPlaying, volume} = this.state
    
      try {
        const playbackInstance = new Audio.Sound()
        const source = {
          uri: this.state.listAudio[currentIndex].path_audio
        }
    
        const status = {
          shouldPlay: isPlaying,
          volume
        }
    
        playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)     
        await playbackInstance.loadAsync(source, status, false)
        this.setState({playbackInstance})
        } catch (e) {
          console.log(e)
        }
    }
    
    onPlaybackStatusUpdate = status => {
      this.setState({
        isBuffering: status.isBuffering
      })
    }
    handlePlayPause = async () => {
      const { isPlaying, playbackInstance } = this.state
      isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
  
      this.setState({
        isPlaying: !isPlaying
      })
    }
  
      handlePreviousTrack = async () => {
      let { playbackInstance, currentIndex } = this.state
      if (playbackInstance) {
        await playbackInstance.unloadAsync()
        currentIndex < this.state.listAudio.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
        this.setState({
          currentIndex
        })
        this.loadAudio()
      }
    }
  
    handleNextTrack = async () => {
      let { playbackInstance, currentIndex } = this.state
      if (playbackInstance) {
        await playbackInstance.unloadAsync()
        console.log('unload')
        currentIndex < this.state.listAudio.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
        this.setState({
          currentIndex
        })
        this.loadAudio()
      }
    }
    renderFileInfo() {
      const { playbackInstance, currentIndex } = this.state
      return playbackInstance ? (
        <View style={[styles.trackInfo, {marginLeft: 10, marginRight: 10}]}>
          <Text style={[styles.trackInfoText, styles.largeText, {color: '#fff', fontSize: 20}]}>
            {this.state.listAudio[currentIndex].title}
          </Text>
          <Text style={[styles.trackInfoText, styles.smallText, {color: 'violet', fontSize: 15, fontStyle: 'italic', textAlign: 'center'}]}>
            {this.state.listAudio[currentIndex].category.name}
          </Text>
          <Text style={[styles.trackInfoText, styles.smallText, {color: '#D8D8D8'}]}>
            {this.state.listAudio[currentIndex].descriptions.substring(0, 200)}
          </Text>
        </View>
      ) : null
    }

    makeImage(){
      const { listAudio, currentIndex } = this.state
      return (<Image style={styles.image} source={{ uri: listAudio[currentIndex].images }} />)
      
  }


    render() {
        const { navigation } = this.props;
      return (

        <LinearGradient colors={["#fff", "#222"]} style={styles.container}>
          <SafeAreaView style={styles.header}>
            <Text style={styles.headerText}>Now playing</Text>
          </SafeAreaView>

          {this.makeImage(navigation.getParam('item'), navigation.getParam('index'))}
            <View style={styles.controls}>
                <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
                {/* <Ionicons name='ios-skip-backward' size={48} color='#fff' /> */}
                <AntDesign name="stepbackward" size={48} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
                {this.state.isPlaying ? (
                    // <Ionicons name='ios-pause' size={48} color='#fff' />
                    <AntDesign name="pausecircle" size={48} color="#fff" />
                    ) : (
                    <AntDesign name='play' size={48} color='#fff' />
                )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
                  {/* <Ionicons name='ios-skip-forward' size={48} color='#fff' /> */}
                  <AntDesign name="stepforward" size={48} color="#fff" />
                  
                </TouchableOpacity>
            </View>
            {this.renderFileInfo()}
        </LinearGradient>

      )
    }
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
        // backgroundColor: "rgba(40,40,40,0.2)",
        height: 40,
    },
    headerText:{
        textAlign: "center",
        color: "#444",
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
      width: "100%",
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
    },
    albumCover: {
      width: 250,
      height: 250
    },
    controls: {
      flexDirection: 'row'
    },
    control: {
      margin: 20,
      color: '#fff'
    }
  });