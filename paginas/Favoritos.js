// paginas/Favoritos.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { auth, database } from '../FirebaseConfig';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import logoEB from '../assets/logoEB.png';

export default function Favoritos() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!uid) return;

      try {
        const userDoc = await database.collection('users').doc(uid).get();
        const favoritos = userDoc.data()?.favorites || [];
        const participacoes = userDoc.data()?.participations || [];

        if (favoritos.length === 0) {
          setEventos([]);
          return;
        }

        const eventosSnapshot = await database
          .collection('events')
          .where(firebase.firestore.FieldPath.documentId(), 'in', favoritos)
          .get();

        const eventosFormatados = eventosSnapshot.docs.map(doc => {
          const dados = doc.data();
          return {
            id: doc.id,
            ...dados,
            favorito: true,
            participa: participacoes.includes(doc.id),
          };
        });

        setEventos(eventosFormatados);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      } finally {
        setCarregando(false);
      }
    };

    fetchFavoritos();
  }, []);

  const toggleParticipacao = async (eventoId) => {
    try {
      const eventoRef = database.collection('events').doc(eventoId);
      const userRef = database.collection('users').doc(uid);

      const evento = eventos.find(e => e.id === eventoId);
      const novoStatus = !evento.participa;

      if (novoStatus) {
        await eventoRef.update({
          participants: firebase.firestore.FieldValue.arrayUnion(uid),
        });
        await userRef.update({
          participations: firebase.firestore.FieldValue.arrayUnion(eventoId),
        });
      } else {
        await eventoRef.update({
          participants: firebase.firestore.FieldValue.arrayRemove(uid),
        });
        await userRef.update({
          participations: firebase.firestore.FieldValue.arrayRemove(eventoId),
        });
      }

      setEventos(prev => prev.map(e => e.id === eventoId ? { ...e, participa: novoStatus } : e));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar participação.');
      console.error(error);
    }
  };

  const toggleFavorito = async (eventoId) => {
    try {
      const userRef = database.collection('users').doc(uid);
      const userDoc = await userRef.get();
      const userData = userDoc.data() || {};

      const novoStatus = !(userData.favorites || []).includes(eventoId);
      const novaLista = novoStatus
        ? [...(userData.favorites || []), eventoId]
        : (userData.favorites || []).filter(id => id !== eventoId);

      await userRef.update({ favorites: novaLista });

      setEventos(prev => prev.filter(e => e.id !== eventoId || novoStatus));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar favoritos.');
      console.error(error);
    }
  };

  if (carregando) {
    return <Text style={styles.carregando}>A carregar favoritos...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topo}>
        <Image source={logoEB} style={styles.logo} />
        <Text style={styles.titulo}>Veja os Eventos escolhidos</Text>
      </View>

      {eventos.length === 0 ? (
        <Text style={styles.semEventos}>Ainda não tem favoritos.</Text>
      ) : (
        eventos.map(evento => {
          const dataFormatada = new Date(evento.datetime.seconds * 1000).toLocaleString('pt-PT', {
            dateStyle: 'short',
            timeStyle: 'short',
          });

          return (
            <View key={evento.id} style={styles.card}>
              <Image source={{ uri: evento.imageUrl }} style={styles.image} />
              <Text style={styles.title}>{evento.title}</Text>
              <Text style={styles.date}>{dataFormatada}</Text>
              <Text style={styles.location}>{evento.location}</Text>
              <Text style={styles.description}>{evento.description}</Text>

              <View style={styles.rowButtons}>
                <TouchableOpacity
                  style={styles.buttonGoSmall}
                  onPress={() => toggleParticipacao(evento.id)}
                >
                  <Text style={styles.buttonText}>
                    {evento.participa ? 'Cancelar' : 'Participar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => toggleFavorito(evento.id)}
                  style={styles.favButtonSmall}
                >
                  <Ionicons
                    name={evento.favorito ? 'heart' : 'heart-outline'}
                    size={22}
                    color={evento.favorito ? '#FDAA48' : '#aaa'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const COR_LARANJA = '#FDAA48';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF9F2',
    padding: 16,
  },
  topo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  rowButtons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  buttonGoSmall: {
    backgroundColor: COR_LARANJA,
    paddingVertical: 6,
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
  carregando: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 16,
  },
  semEventos: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
});
