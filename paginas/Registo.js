import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { auth, database } from '../FirebaseConfig';
import logoEB from '../assets/logoEB.png';

export default function Registo({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
      const uid = userCredential.user.uid;

      await database.collection('users').doc(uid).set({
        email: email,
        favorites: [],
        participations: [],
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao registar:', error);
      Alert.alert('Erro ao registar', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoEB} style={styles.logo} />
      <Text style={styles.titulo}>Criar nova conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Palavra-passe"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleRegister}>
        <Text style={styles.botaoTexto}>Registar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginTexto}>Já tem conta? Aceda aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const COR_LARANJA = '#FDAA48';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: COR_LARANJA,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginTexto: {
    textAlign: 'center',
    color: '#555',
    marginTop: 8,
  },
});
