import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import ListarTarefas from './screens/List';
import { DatabaseConnection } from './db/database';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
 

  return (
    <SQLiteProvider databaseName="tarefas.db" onInit={DatabaseConnection}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Nova Tarefa' }}
          />
          <Stack.Screen
            name="ListarTarefas"
            component={ListarTarefas}
            options={{ title: 'Minhas Tarefas' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
