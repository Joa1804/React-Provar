import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';

export default function Home({ route, navigation }: any) {
  const db = useSQLiteContext();
  const tarefaEdit = route.params?.tarefaParaEditar;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (tarefaEdit) {
      setTitulo(tarefaEdit.titulo);
      setDescricao(tarefaEdit.descricao);
    }
  }, [tarefaEdit]);

  async function SalvaTarefa() {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Informe o título da tarefa.');
      return;
    }

    try {
      if (tarefaEdit) {
        await db.runAsync(
          'UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?',
          titulo.trim(),
          descricao,
          tarefaEdit.id
        );
      } else {
        await db.runAsync(
          'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)',
          titulo.trim(),
          descricao
        );
      }

      setTitulo('');
      setDescricao('');
      navigation.navigate('ListarTarefas');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/pngtree-list-of-daily-to-do-tasks-png-image_3296470.jpg')} style={styles.headerImage} />
        <Text style={styles.headerText}>
          {tarefaEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Estudar para a prova"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Detalhes da tarefa (opcional)"
          placeholderTextColor="#999"
          multiline
        />

        <TouchableOpacity style={styles.botao} onPress={SalvaTarefa}>
          <Text style={styles.textoBotao}>
            {tarefaEdit ? 'Atualizar Tarefa' : 'Salvar Tarefa'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f7', padding: 20, alignItems: 'center' },
  header: { alignItems: 'center', marginTop: 10, marginBottom: 18 },
  headerImage: { width: 48, height: 48, marginBottom: 6 },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  label: { fontWeight: '600', marginTop: 10, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    fontSize: 14,
  },
  textArea: { height: 70, textAlignVertical: 'top' },
  botao: {
    backgroundColor: '#2e86de',
    padding: 13,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});