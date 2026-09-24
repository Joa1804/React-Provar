import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';

export default function Home({ route, navigation }: any) {
  const db = useSQLiteContext();
  
  // Recebe os dados se vier da tela de listagem
  const tarefaEdit = route.params?.tarefaParaEditar;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  // Preenche os campos se for uma edição
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
        // UPDATE: Edita a tarefa existente
        await db.runAsync(
          'UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?',
          titulo.trim(),
          descricao,
          tarefaEdit.id
        );
      } else {
        // INSERT: Cria uma nova tarefa
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
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} multiline />

      <TouchableOpacity style={styles.botao} onPress={SalvaTarefa}>
        <Text style={styles.textoBotao}>
          {tarefaEdit ? 'Atualizar Tarefa' : 'Salvar Tarefa'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginTop: 4 },
  botao: { backgroundColor: '#2e86de', padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
});