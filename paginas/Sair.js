import { useEffect } from 'react';
import { auth } from '../FirebaseConfig';

export default function Sair({ navigation }) {
  useEffect(() => {
    const logout = async () => {
      try {
        await auth.signOut();
        navigation.replace('Login');
      } catch (error) {
        console.error('Erro ao sair:', error);
      }
    };
    logout();
  }, []);

  return null;
}
