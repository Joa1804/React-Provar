import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string;
  status: number;
};

export default function ListarTarefas({ navigation }: any) {
  const db = useSQLiteContext();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {carregarTarefas();}, []);

  async function carregarTarefas() {
    const resultado = await db.getAllAsync(`
      SELECT * FROM tarefas ORDER BY id DESC
    `) as Tarefa[];

    setTarefas(resultado);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text>{item.status ? 'Feita' : 'Pendente'}</Text>
          </View>
        )}
      />

      <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>+ Nova Tarefa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
},
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16 
},
  card: { 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    marginBottom: 10 
},
  cardTitulo: { 
    fontWeight: 'bold', 
    fontSize: 16 
},
  button: { 
    backgroundColor: '#2e86de', 
    padding: 14, 
    borderRadius: 8, 
    marginTop: 16, 
    alignItems: 'center' 
},
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
},
});