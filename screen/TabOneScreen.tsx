import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  View,
  Text,
} from 'react-native';
import { initDatabase, addTodo, fetchTodos } from '../helpers/sqlite';

// タスクの型定義
interface Todo {
  id: number;
  text: string;
}

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

  // コンポーネントがマウントされたときにデータベースを初期化し、タスクを読み込む
  useEffect(() => {
    const setupDatabaseAndLoadTodos = async () => {
      try {
        await initDatabase();
        await loadTodos();
      } catch (err) {
        console.error('Failed to initialize database', err);
      }
    };
    setupDatabaseAndLoadTodos();
  }, [loadTodos]);

  // 新しいタスクを追加する関数
  const handleAddTodo = async () => {
    if (inputText.trim() === '') return;
    try {
      await addTodo(inputText);
      setInputText('');
      await loadTodos(); // タスク一覧を再読み込み
    } catch (err) {
      console.error('Failed to add todo', err);
    }
  };

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
