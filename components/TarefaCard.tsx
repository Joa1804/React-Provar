import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import React from 'react';

type Tarefa = {
    id: number,
    titulo: string, 
    descricao: string,
    status: number
}

export default function TarefaCard() {
    const db = useSQLiteContext();
    const [tarefas, setTarefas] = useState<Tarefa[]>([]); 

    useEffect(() => {
        carregarTarefas();
    }, []);

    async function carregarTarefas() {
        const resultado = await db.getAllAsync(`
            SELECT *
            FROM tarefas
            ORDER BY id DESC
        `) as Tarefa[]; 
        setTarefas(resultado);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lista de Tarefas</Text>
            
            <FlatList
                data={tarefas}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.titulo}>{item.titulo}</Text>
                            <Text style={styles.descricao}>{item.descricao}</Text>
                            <Text style={[
                                styles.status, 
                                { color: item.status === 1 ? '#28a745' : '#dc3545' }
                            ]}>
                                {item.status === 1 ? 'Concluída' : 'Pendente'}
                            </Text>
                        </View>

                        <Pressable 
                            style={styles.botaoAcao}
                            onPress={() => console.log('Clicou na tarefa:', item.id)}
                        >
                            <Text style={styles.textoBotao}>Ação</Text>
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa encontrada.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        paddingRight: 12,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212529',
    },
    descricao: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 8,
    },
    botaoAcao: {
        backgroundColor: '#0d6efd',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    textoBotao: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    vazio: {
        textAlign: 'center',
        marginTop: 20,
        color: '#6c757d',
        fontSize: 16,
    }
});