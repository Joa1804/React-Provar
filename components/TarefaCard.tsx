import { View, Text, StyleSheet, Pressable, FlatList, } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState, } from 'react';
import React from 'react';

type Tarefa = {
    id: number,
    titulo: String,
    descricao: String,
    status: number
}

export default function TarefaCard() {

    const db = useSQLiteContext();
    const [tarefa, setTarefas] = useState<Tarefa[]>([]);

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
        <View>
            <Text>Lista de Tarefas</Text>
        </View>
    );
}
