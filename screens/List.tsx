import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import React from 'react';

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string;
  status: number;
};

export default function ListarTarefas({ navigation }: any) {
  const db = useSQLiteContext();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    const resultado = await db.getAllAsync(`
      SELECT * FROM tarefas ORDER BY id DESC
    `) as Tarefa[];

    setTarefas(resultado);
  }

  function deletarTarefa(id: number) {
    Alert.alert('Atenção', 'Deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await db.runAsync('DELETE FROM tarefas WHERE id = ?', id);
          carregarTarefas(); 
        }
      }
    ]);
  }

  function editarTarefa(item: Tarefa) {
    navigation.navigate('Home', { tarefaParaEditar: item });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <Pressable style={styles.refreshButton} onPress={carregarTarefas}>
        <Text style={styles.refreshButtonText}>↻ Atualizar Lista</Text>
      </Pressable>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text>{item.descricao}</Text>
              <Text style={styles.statusText}>{item.status ? 'Feita' : 'Pendente'}</Text>
            </View>

            <View style={styles.acoesContainer}>
              <Pressable style={styles.btnEditar} onPress={() => editarTarefa(item)}>
                <Text style={styles.btnTexto}>Editar</Text>
              </Pressable>
              
              <Pressable style={styles.btnDeletar} onPress={() => deletarTarefa(item.id)}>
                <Text style={styles.btnTexto}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <Pressable style={styles.button} onPress={() => navigation.navigate('Home', { tarefaParaEditar: null })}>
        <Text style={styles.buttonText}>+ Nova Tarefa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  refreshButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 8, marginBottom: 16, alignItems: 'center' },
  refreshButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  
  card: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 },
  cardInfo: { marginBottom: 10 },
  cardTitulo: { fontWeight: 'bold', fontSize: 16 },
  statusText: { color: '#666', fontStyle: 'italic', marginTop: 4 },
  
  acoesContainer: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  btnEditar: { backgroundColor: '#ffc107', padding: 8, borderRadius: 6, flex: 1, marginRight: 5, alignItems: 'center' },
  btnDeletar: { backgroundColor: '#dc3545', padding: 8, borderRadius: 6, flex: 1, marginLeft: 5, alignItems: 'center' },
  btnTexto: { fontWeight: 'bold', color: '#fff' },

  button: { backgroundColor: '#2e86de', padding: 14, borderRadius: 8, marginTop: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});