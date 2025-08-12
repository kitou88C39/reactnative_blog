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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <FlatList
        data={feels}
        horizontal={true}
        style={styles.list}
        renderItem={({ item }) => (
          <Text style={styles.nameText}>{item.name}</Text>
        )}
      />
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <FlatList
        data={templates}
        horizontal={true}
        style={styles.list}
        renderItem={({ item }) => (
          <Text style={styles.nameText}>{item.name}</Text>
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
