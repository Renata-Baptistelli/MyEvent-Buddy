// components/EventCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function EventCard({ evento, navigation }) {
  if (!evento) return null;

  const handlePress = () => {
    navigation.navigate('DetalhesEvento', { evento });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {evento.imageUrl && (
        <Image source={{ uri: evento.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{evento.title || 'Sem título'}</Text>
        <Text style={styles.data}>{evento.datetime || 'Data não disponível'}</Text>
        <Text style={styles.local}>{evento.location || 'Local não definido'}</Text>
        <Text style={styles.desc}>{evento.description || 'Sem descrição'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  data: {
    fontSize: 14,
    color: '#888',
  },
  local: {
    fontSize: 14,
    color: '#888',
  },
  desc: {
    fontSize: 14,
    marginTop: 6,
    color: '#555',
  },
});
