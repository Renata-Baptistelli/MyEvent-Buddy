import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { auth, database } from '../FirebaseConfig';
import logoEB from '../assets/logoEB.png';
import firebase from 'firebase';

export default function Perfil() {
  const user = auth.currentUser;
  const [eventosFuturos, setEventosFuturos] = useState([]);
  const [eventosPassados, setEventosPassados] = useState([]);

  useEffect(() => {
    const carregarEventos = async () => {
      if (!user) return;

      try {
        const eventosSnapshot = await database.collection('events').get();
        const agora = new Date();

        const futuros = [];
        const passados = [];

        eventosSnapshot.forEach(doc => {
          const evento = doc.data();
          const participantes = evento.participants || [];
          const inscrito = participantes.includes(user.uid);

          if (inscrito && evento.datetime?.seconds) {
            const dataEvento = new Date(evento.datetime.seconds * 1000);
            const eventoFormatado = {
              id: doc.id,
              title: evento.title,
              location: evento.location,
              description: evento.description,
              imageUrl: evento.imageUrl,
              datetime: dataEvento,
            };

            if (dataEvento >= agora) {
              futuros.push(eventoFormatado);
            } else {
              passados.push(eventoFormatado);
            }
          }
        });

        futuros.sort((a, b) => a.datetime - b.datetime);
        passados.sort((a, b) => b.datetime - a.datetime);

        setEventosFuturos(futuros);
        setEventosPassados(passados);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    carregarEventos();
  }, []);

  const handleTrocarSenha = () => {
    auth.sendPasswordResetEmail(user.email)
      .then(() => alert('E-mail de redefinição de senha enviado!'))
      .catch(() => alert('Erro ao enviar e-mail.'));
  };

  const renderEvento = (evento) => {
    const dataFormatada = evento.datetime.toLocaleString('pt-PT', {
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
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={logoEB} style={styles.logo} />
      <Text style={styles.ola}>Olá, <Text style={styles.email}>{user.email}</Text></Text>

      <TouchableOpacity style={styles.botao} onPress={handleTrocarSenha}>
        <Text style={styles.textoBotao}>Trocar palavra-passe</Text>
      </TouchableOpacity>

      <Text style={styles.tituloAzul}>Próximos Eventos a participar</Text>
      {eventosFuturos.length > 0 ? eventosFuturos.map(renderEvento) : (
        <Text style={styles.semEventos}>Nenhum evento futuro.</Text>
      )}

      <Text style={styles.tituloLaranja}>Histórico de Participações</Text>
      {eventosPassados.length > 0 ? eventosPassados.map(renderEvento) : (
        <Text style={styles.semEventos}>Nenhum evento passado.</Text>
      )}
    </ScrollView>
  );
}

const COR_LARANJA = '#FDAA48';
const COR_AZUL = '#4A90E2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
    padding: 16,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  ola: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  email: {
    fontWeight: 'bold',
    color: '#222',
  },
  botao: {
    backgroundColor: COR_LARANJA,
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 30,
  },
  textoBotao: {
    color: 'white',
    fontWeight: '600',
  },
  tituloAzul: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COR_AZUL,
    marginBottom: 10,
  },
  tituloLaranja: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COR_LARANJA,
    marginTop: 30,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
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
    fontSize: 13,
    color: '#555',
  },
  semEventos: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
});
