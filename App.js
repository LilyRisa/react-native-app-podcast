import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView  } from 'react-native';
import { Audio } from 'expo-av';
import List from './List'


export default function App() {
  const [sound, setSound] = React.useState([]);
  const [more, setMore] = React.useState(0);

  function onLoad(){
    setMore(more + 1);
  }
  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //     //  require('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
  //     {uri: 'https://storage.mangxahoi.club/public/api/getfile/VanMin-file--83be4ff32e909aeece1c9a9611406bff-mp3-1616470577'}
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync(); 
  // }

  React.useEffect(() => {
        fetch('https://adonis-webapp.herokuapp.com/episodes_api').then(res => res.json())
        .then(response => {
          
          setSound(response);
          console.log(sound);
        })
      .catch(err => console.log(err));
    // LoadData()
  }, [more]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Podcast</Text>
      { sound.length == 0 ?
        <Text>loading ... </Text>
      : <ScrollView>
      { sound.map((v) => {
          return <List id={v.id} obj={v}></List>
      }) }
    </ScrollView>
    }
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: '#04E1FB'
  }
}); 
