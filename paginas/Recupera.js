import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { auth } from '../FirebaseConfig';
import logoEB from '../assets/logoEB.png';

export default function Recupera({ navigation }) {
  const [email, setEmail] = useState('');

  const handleRecupera = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Verifique seu e-mail',
          'Enviamos um link para redefinir sua senha.'
        );
        navigation.navigate('Login');
      })
      .catch(() => {
        Alert.alert('Erro', 'Não conseguimos enviar o e-mail.');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={logoEB} style={styles.logo} />
      <Text style={styles.title}>Recuperar senha</Text>
      <Text style={styles.subtitle}>
        Enviaremos um link de redefinição para seu e-mail
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleRecupera}>
        <Text style={styles.buttonText}>ENVIAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}

const COR_LARANJA = '#FFAD4D';
const FUNDO_CLARO = '#FFF9F2';
const COR_LINK = '#4A90E2';

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
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: COR_LARANJA,
    paddingVertical: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: COR_LINK,
    fontSize: 14,
    fontWeight: '500',
  },
});
