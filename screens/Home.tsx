import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import {useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';


export default function Home({ navigation }: any) {
  const db = useSQLiteContext();
  const [titulos, setTitulos] = useState('');
  const [descricao, setDescricao] = useState('');

  async function SalvaTarefa() {
    if (!titulos.trim()) {
      Alert.alert('Atenção', 'Informe o título da tarefa.');
      return;
    }

    await db.runAsync(
      'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)',
      titulos.trim(),
      descricao
    );

    setTitulos('');
    setDescricao('');
    navigation.navigate('ListarTarefas');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulos} onChangeText={setTitulos} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <TouchableOpacity style={styles.botao} onPress={SalvaTarefa}>
        <Text style={styles.textoBotao}>Salvar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
},
  label: { 
    fontWeight: 'bold', 
    marginTop: 10 
},
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 6, 
    padding: 8, 
    marginTop: 4
 },
  botao: { 
    backgroundColor: '#2e86de', 
    padding: 14, 
    borderRadius: 8, 
    marginTop: 20, 
    alignItems: 'center' 
},
  textoBotao: { 
    color: '#fff', 
    fontWeight: 'bold' 
},
});