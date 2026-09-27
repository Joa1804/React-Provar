import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import React from 'react';
import TarefaCard from '../components/TarefaCard';

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
        contentContainerStyle={tarefas.length === 0 && styles.listaVazia}
        ListEmptyComponent={<Text style={styles.vazioTexto}>Nenhuma tarefa cadastrada ainda.</Text>}
        renderItem={({ item }) => (
          <TarefaCard
            tarefa={item}
            onEditar={() => editarTarefa(item)}
            onExcluir={() => deletarTarefa(item.id)}
          />
        )}
      />

      <Pressable style={styles.button} onPress={() => navigation.navigate('Home', { tarefaParaEditar: null })}>
        <Text style={styles.buttonText}>+ Nova Tarefa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f7', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#1a1a1a' },

  refreshButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  refreshButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },

  listaVazia: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  vazioTexto: { color: '#999', fontSize: 14 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitulo: { fontWeight: 'bold', fontSize: 15, color: '#1a1a1a', flexShrink: 1, marginRight: 8 },
  cardDescricao: { color: '#555', fontSize: 13, marginTop: 4 },

  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeFeita: { backgroundColor: '#e3f7e9' },
  badgePendente: { backgroundColor: '#fff3e0' },
  badgeTexto: { fontSize: 11, fontWeight: '600', color: '#333' },

  acoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 10,
    paddingTop: 10,
  },
  btnEditar: { backgroundColor: '#ffc107', padding: 8, borderRadius: 8, flex: 1, marginRight: 5, alignItems: 'center' },
  btnDeletar: { backgroundColor: '#dc3545', padding: 8, borderRadius: 8, flex: 1, marginLeft: 5, alignItems: 'center' },
  btnTexto: { fontWeight: 'bold', color: '#fff', fontSize: 13 },

  button: { backgroundColor: '#2e86de', padding: 14, borderRadius: 10, marginTop: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});