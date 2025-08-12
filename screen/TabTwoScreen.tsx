import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Button, Alert } from 'react-native';

import { Text, View } from '../components/Themed';

import { query, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../helpers/firebase';

export default function TabTwoScreen() {
  const [feels, setFeels] = useState([]);

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
          <View style={styles.itemContainer}>
            <Text style={styles.emojiText}>{item.emoji}</Text>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value='diary body'
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
    marginBottom: 20,
  },
});
