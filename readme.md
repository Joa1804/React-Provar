# COMPONENTES CORE DO REACT NATIVE 📱

> Guia prático de referência para os principais componentes nativos de interface do **React Native**.

---

## 📌 ÍNDICE

1. [VIEW](#1-view-)
2. [TEXT](#2-text-)
3. [IMAGE](#3-image-)
4. [TEXTINPUT](#4-textinput-)
5. [PRESSABLE](#5-pressable-)
6. [SCROLLVIEW](#6-scrollview-)
7. [FLATLIST](#7-flatlist-)
8. [TABELA COMPARATIVA](#-tabela-comparativa-scrollview-vs-flatlist)

---

## 1. VIEW 📦

O `<View>` é o bloco de construção fundamental de qualquer interface em React Native. É equivalente à tag `<div>` da Web, servindo como contêiner para aplicar estilos, posicionamentos com **Flexbox** e gerenciar layout.

* **Quando usar:** Para estruturar a tela, agrupar outros componentes ou criar caixas/layouts.

```javascript
import { View, StyleSheet } from 'react-native';

export default function ExemploView() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
});
```

---

## 2. TEXT 📝

O `<Text>` é o único componente nativo destinado à exibição de textos. Diferente da Web, **qualquer texto solto DEVE obrigatoriamente estar envelopado por uma tag `<Text>`**, sob pena de erro de renderização.

* **Quando usar:** Para exibir títulos, parágrafos, rótulos de botões e qualquer informação textual.

```javascript
import { Text, StyleSheet } from 'react-native';

export default function ExemploText() {
  return (
    <Text style={styles.titulo}>
      Olá, <Text style={styles.destaque}>Mundo React Native!</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    color: '#333333',
  },
  destaque: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
```

> 💡 **DICA:** Você pode aninhar componentes `<Text>` para aplicar estilos diferenciados em partes específicas de uma frase.

---

## 3. IMAGE 🖼️

O componente `<Image>` exibe imagens estáticas locais (do projeto), dinâmicas (URL) ou recursos do próprio sistema.

* **Quando usar:** Avatares de usuário, imagens de fundo, ícones e logotipos.

```javascript
import { Image, StyleSheet, View } from 'react-native';

export default function ExemploImage() {
  return (
    <View style={styles.container}>
      {/* Imagem Remota (Requer largura e altura no style) */}
      <Image 
        style={styles.logo}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
      />

      {/* Imagem Local (Sintaxe de require) */}
      {/* <Image source={require('./assets/logo.png')} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
});
```

---

## 4. TEXTINPUT ⌨️

O `<TextInput>` é a caixa de entrada de texto via teclado físico ou virtual do dispositivo. Oferece controle completo sobre tipos de teclado (e-mail, numérico, senha), autocorreção e placeholders.

* **Quando usar:** Formulários, campos de busca, login e cadastro.

```javascript
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

export default function ExemploTextInput() {
  const [nome, setNome] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome..."
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.saida}>Nome digitado: {nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 45,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  saida: {
    marginTop: 10,
    fontSize: 16,
  },
});
```

---

## 5. PRESSABLE 👆

O `<Pressable>` é o componente recomendado atualmente para capturar eventos de toque. Ele substitui os antigos `TouchableOpacity` e `TouchableHighlight`, fornecendo feedback em tempo real para os diferentes estágios do clique (`onPress`, `onLongPress`, etc.).

* **Quando usar:** Para criar botões customizados, cards clicáveis e ações na tela.

```javascript
import { Pressable, Text, StyleSheet } from 'react-native';

export default function ExemploPressable() {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.botao,
        pressed && styles.botaoPressionado
      ]}
      onPress={() => alert('Botão pressionado!')}
    >
      <Text style={styles.textoBotao}>Clique Aqui</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botaoPressionado: {
    opacity: 0.7,
    backgroundColor: '#0056b3',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
```

---

## 6. SCROLLVIEW 📜

O `<ScrollView>` é um contêiner genérico de rolagem. Ele renderiza **TODOS** os seus elementos filhos de uma única vez ao carregar a tela.

* **Quando usar:** Telas com conteúdo de tamanho fixo ou limitado que excedem o tamanho da tela (ex: formulários, artigos, configurações).

```javascript
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function ExemploScrollView() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.texto}>Início do Conteúdo</Text>
      {/* Vários elementos aqui */}
      <Text style={styles.texto}>Fim do Conteúdo</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  texto: {
    fontSize: 18,
    marginVertical: 40,
  },
});
```

> ⚠️ **ATENÇÃO:** Evite usar `<ScrollView>` em listas longas ou de tamanho dinâmico para não comprometer a memória do dispositivo.

---

## 7. FLATLIST 📋

O `<FlatList>` é um componente otimizado para exibição de listas longas ou infinitas. Ele utiliza **lazy loading** (carregamento sob demanda), rendrizando apenas os elementos atualmente visíveis na tela.

* **Quando usar:** Feeds de redes sociais, catálogos de produtos, histórico de transações e listas vindas de APIs.

```javascript
import { FlatList, Text, View, StyleSheet } from 'react-native';

const DADOS = [
  { id: '1', titulo: 'Primeiro Item' },
  { id: '2', titulo: 'Segundo Item' },
  { id: '3', titulo: 'Terceiro Item' },
];

export default function ExemploFlatList() {
  return (
    <FlatList
      data={DADOS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.titulo}>{item.titulo}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  titulo: {
    fontSize: 16,
  },
});
```

---

## ⚡ TABELA COMPARATIVA: SCROLLVIEW vs FLATLIST

| Recurso | `ScrollView` | `FlatList` |
| :--- | :--- | :--- |
| **Renderização** | Renderiza tudo de uma vez | Renderiza sob demanda (Lazy) |
| **Desempenho** | Baixo para muitos itens | Alto para muitos itens |
| **Caso de Uso** | Conteúdos estáticos e curtos | Listas longas e dados de API |
| **Estrutura** | Aninhamento livre de tags | Requer `data` e `renderItem` |