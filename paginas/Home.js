import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { auth, database } from '../FirebaseConfig';
import firebase from 'firebase';

export default function Home({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [localBusca, setLocalBusca] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [tiposDisponiveis, setTiposDisponiveis] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const snapshot = await database.collection('events').get();
        const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEventos(lista);

        // Extrair tipos únicos para o Picker
        const tipos = ['Todos', ...new Set(lista.map(e => e.type))];
        setTiposDisponiveis(tipos);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const eventosFiltrados = eventos.filter(evento => {
    const correspondeLocal = evento.location.toLowerCase().includes(localBusca.toLowerCase());
    const correspondeTipo = tipoSelecionado === 'Todos' || evento.type === tipoSelecionado;
    return correspondeLocal && correspondeTipo;
  });

  const renderEvento = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalhesEvento', { evento: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>
        {new Date(item.datetime.seconds * 1000).toLocaleString('pt-PT', {
          dateStyle: 'short',
          timeStyle: 'short',
        })}
      </Text>
      <Text style={styles.location}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={eventosFiltrados}
      keyExtractor={item => item.id}
      renderItem={renderEvento}
      ListHeaderComponent={
        <View style={styles.container}>
          <Image source={require('../assets/logoEB.png')} style={styles.logo} />

          <TextInput
            placeholder="Pesquisar por local..."
            style={styles.input}
            value={localBusca}
            onChangeText={setLocalBusca}
          />

          <Text style={styles.filtroLabel}>Filtrar por tipo:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipoSelecionado}
              onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
              style={styles.picker}
            >
              {tiposDisponiveis.map(tipo => (
                <Picker.Item label={tipo} value={tipo} key={tipo} />
              ))}
            </Picker>
          </View>

          {loading && <ActivityIndicator size="large" color="#FDAA48" style={styles.loading} />}
        </View>
      }
      contentContainerStyle={styles.scrollContent}
      ListEmptyComponent={
        !loading && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhum evento encontrado.
          </Text>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
    padding: 16,
  },
  logo: {
    width: 160,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  filtroLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  loading: {
    marginTop: 16,
  },
});
