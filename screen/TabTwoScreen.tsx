import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Button, Alert } from 'react-native';

import { Text, View } from '../components/Themed';

import { query, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../helpers/firebase';

export default function TabTwoScreen() {
  const [feels, setFeels] = useState([]);
  const [body, setBody] = useState('');
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    getEmojies();
  }, []);

  const getEmojies = async () => {
    const q = query(collection(firestore, 'feels'));
    let tmpFeels: string[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let array: string[] = doc.data();
      array['id'] = doc.id;
      tmpFeels.push(array);
    });
    setFeels(tmpFeels);
  };

  const emojiPress = (name: string) => {
    const selectedEmoji: string[] = feels.find((v) => v.name === name);
    setTemplates(selectedEmoji.templates);
  };

  const emojiPress = (name: string) => {
    const selectedEmoji: string[] = feels.find((v) => v.name === name);
    setTemplates(selectedEmoji.templates);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <FlatList
        data={feels}
        horizontal={true}
        renderItem={({ item }) => (
          <Text onPress={() => emojiPress(item.name)}>
            {item.emoji + '\n' + item.name}
          </Text>
        )}
      />
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <FlatList
        data={templates}
        renderItem={({ item }) => (
          <Text onPress={() => templatePress(item.name)}>
            {item.emoji + '\n' + item.name}
          </Text>
        )}
      />
      <TextInput
        //style={styles.input}
        onChangeText={setBody}
        value={body}
        placeholder='diary content'
      />
      <Button
        title='Write Diary'
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
