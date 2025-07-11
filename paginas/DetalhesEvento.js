import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { auth, database } from '../FirebaseConfig';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

export default function DetalhesEvento({ route }) {
  const { evento } = route.params || {};
  const uid = auth.currentUser?.uid;

  const [participa, setParticipa] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [qtdParticipantes, setQtdParticipantes] = useState(evento?.participants?.length || 0);

  useEffect(() => {
    const verificarStatus = async () => {
      try {
        const userRef = database.collection('users').doc(uid);
        const userDoc = await userRef.get();
        const userData = userDoc.data() || {};

        setParticipa(userData.participations?.includes(evento.id) || false);
        setFavorito(userData.favorites?.includes(evento.id) || false);
      } catch (error) {
        console.error('Erro ao verificar status:', error);
      }
    };

    if (uid && evento?.id) {
      verificarStatus();
    }
  }, [evento.id, uid]);

  useEffect(() => {
    const atualizarEvento = async () => {
      if (!evento?.id) return;

      try {
        const eventoAtual = await database.collection('events').doc(evento.id).get();
        const dadosAtualizados = eventoAtual.data();
        setQtdParticipantes(dadosAtualizados?.participants?.length || 0);
      } catch (error) {
        console.error('Erro ao atualizar evento:', error);
      }
    };

    atualizarEvento();
  }, [participa]);

  const toggleParticipacao = async () => {
    try {
      const eventoRef = database.collection('events').doc(evento.id);
      const userRef = database.collection('users').doc(uid);

      if (participa) {
        await eventoRef.update({
          participants: firebase.firestore.FieldValue.arrayRemove(uid),
        });
        await userRef.update({
          participations: firebase.firestore.FieldValue.arrayRemove(evento.id),
        });
        setParticipa(false);
      } else {
        await eventoRef.update({
          participants: firebase.firestore.FieldValue.arrayUnion(uid),
        });
        await userRef.update({
          participations: firebase.firestore.FieldValue.arrayUnion(evento.id),
        });
        setParticipa(true);
      }
    } catch (error) {
      console.error('Erro ao participar:', error);
      Alert.alert('Erro', 'Não foi possível atualizar participação.');
    }
  };

  const toggleFavorito = async () => {
    try {
      const userRef = database.collection('users').doc(uid);
      const userDoc = await userRef.get();
      const userData = userDoc.data() || {};

      const novoStatus = !favorito;
      const novaLista = novoStatus
        ? [...(userData.favorites || []), evento.id]
        : (userData.favorites || []).filter(id => id !== evento.id);

      await userRef.update({ favorites: novaLista });
      setFavorito(novoStatus);
    } catch (error) {
      console.error('Erro toggleFavorito:', error);
      Alert.alert('Erro', 'Não foi possível atualizar favoritos.');
    }
  };

  if (!evento || !evento.id) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando evento...</Text>
      </View>
    );
  }

  const dataFormatada = new Date(evento.datetime.seconds * 1000).toLocaleString('pt-PT', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: evento.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{evento.title}</Text>
      <Text style={styles.date}>{dataFormatada}</Text>
      <Text style={styles.location}>{evento.location}</Text>
      <Text style={styles.description}>{evento.description}</Text>

      <View style={styles.rowButtons}>
        <TouchableOpacity style={styles.buttonGoSmall} onPress={toggleParticipacao}>
          <Text style={styles.buttonText}>{participa ? 'Cancelar' : 'Participar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleFavorito} style={styles.favButtonSmall}>
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
            size={22}
            color={favorito ? '#FDAA48' : '#aaa'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.participants}>Participantes: {qtdParticipantes}</Text>
    </View>
  );
}

const COR_LARANJA = '#FDAA48';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  location: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  rowButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  buttonGoSmall: {
    backgroundColor: COR_LARANJA,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  favButtonSmall: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  participants: {
    marginTop: 16,
    color: '#666',
    textAlign: 'center',
  },
});
