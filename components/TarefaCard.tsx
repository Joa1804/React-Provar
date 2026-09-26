import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string;
  status: number;
};

type Props = {
  tarefa: Tarefa;
  onEditar: () => void;
  onExcluir: () => void;
};

export default function TarefaCard({ tarefa, onEditar, onExcluir }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTopo}>
        <Text style={styles.titulo}>{tarefa.titulo}</Text>
        <View style={[styles.badge, tarefa.status ? styles.badgeFeita : styles.badgePendente]}>
          <Text style={styles.badgeTexto}>{tarefa.status ? 'Feita' : 'Pendente'}</Text>
        </View>
      </View>

      {!!tarefa.descricao && <Text style={styles.descricao}>{tarefa.descricao}</Text>}

      <View style={styles.acoesContainer}>
        <Pressable style={styles.btnEditar} onPress={onEditar}>
          <Text style={styles.btnTexto}>Editar</Text>
        </Pressable>

        <Pressable style={styles.btnDeletar} onPress={onExcluir}>
          <Text style={styles.btnTexto}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  titulo: { fontWeight: 'bold', fontSize: 15, color: '#1a1a1a', flexShrink: 1, marginRight: 8 },
  descricao: { color: '#555', fontSize: 13, marginTop: 4 },

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
});