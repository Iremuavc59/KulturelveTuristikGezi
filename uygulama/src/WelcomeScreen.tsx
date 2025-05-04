import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kültürel Keşif</Text>
      <Text style={styles.subtitle}>Yakınındaki tarihi ve kültürel yerleri keşfet!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonOutlineText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 40 },
  button: {
    backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, width: '100%', marginBottom: 10,
  },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  buttonOutline: {
    borderWidth: 1, borderColor: '#4CAF50', padding: 15, borderRadius: 10, width: '100%',
  },
  buttonOutlineText: { color: '#4CAF50', fontWeight: 'bold', textAlign: 'center' },
});
