import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { createTable, insert, select } from '../helpers/sqlite';

export default function TabOneScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  // データベースからタスクを読み込む関数
  const loadTodos = useCallback(async () => {
    try {
      const fetchedTodos = (await fetchTodos()) as Todo[];
      setTodos(fetchedTodos);
    } catch (err) {
      console.error('Failed to fetch todos', err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>タスク一覧</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='新しいタスクを入力'
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title='追加' onPress={handleAddTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
