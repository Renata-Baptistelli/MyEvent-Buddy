import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { auth, database } from '../FirebaseConfig';
import logoEB from '../assets/logoEB.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const login = async () => {
    if (!email || !pass) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, pass);
      const uid = userCredential.user.uid;

      const userDocRef = database.collection('users').doc(uid);
      const userSnapshot = await userDocRef.get();

      if (!userSnapshot.exists) {
        await userDocRef.set({
          favorites: [],
          participations: [],
        });
      }

      navigation.replace('Tabs'); // Redireciona após login bem-sucedido
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoEB} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => navigation.navigate('Recupera')}>
        <Text style={styles.linkText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>ACEDER</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <Text style={styles.labelText}>Ainda não tem conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registo')}>
          <Text style={styles.linkTextLaranja}> Registe-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const COR_LARANJA = '#FDAF4B';
const FUNDO_CLARO = '#FFF9F2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FUNDO_CLARO,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: COR_LARANJA,
    paddingVertical: 12,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  linkText: {
    fontWeight: '500',
    color: '#4A90E2',
    marginBottom: 16,
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  labelText: {
    color: '#666',
    fontWeight: '500',
  },
  linkTextLaranja: {
    fontWeight: '500',
    color: COR_LARANJA,
  },
});
