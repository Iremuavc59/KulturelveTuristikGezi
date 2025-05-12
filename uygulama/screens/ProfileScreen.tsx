import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, User as FirebaseUser } from "firebase/auth";
import { auth } from '../config/firebase';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [surname, setSurname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editSurname, setEditSurname] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, []);

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && (!displayName || !surname))) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    setIsLoading(true);
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: displayName + ' ' + surname });
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email,
          firstName: displayName,
          lastName: surname
        });
        setCurrentUser({ ...userCredential.user, displayName: displayName + ' ' + surname });
      }
      Alert.alert('Başarılı', isLogin ? 'Giriş başarılı!' : 'Kayıt başarılı!');
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      Alert.alert('Başarılı', 'Çıkış yapıldı');
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    }
  };

  const openEditModal = () => {
    const [ad, soyad] = (currentUser?.displayName || '').split(' ');
    setEditName(ad || '');
    setEditSurname(soyad || '');
    setEditEmail(currentUser?.email || '');
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editName || !editSurname) {
      Alert.alert('Hata', 'İsim ve soyisim boş olamaz');
      return;
    }
    setIsLoading(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: editName + ' ' + editSurname });
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          firstName: editName,
          lastName: editSurname
        });
        setCurrentUser({ ...auth.currentUser, displayName: editName + ' ' + editSurname });
        setEditModalVisible(false);
        Alert.alert('Başarılı', 'Profil güncellendi!');
      }
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) {
    const [ad, soyad] = (currentUser.displayName || '').split(' ');
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Ionicons name="person-circle" size={90} color="#007AFF" style={styles.avatar} />
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>İsim</Text>
          <Text style={styles.value}>{ad || '-'}</Text>
          <Text style={styles.label}>Soyisim</Text>
          <Text style={styles.value}>{soyad || '-'}</Text>
          <Text style={styles.label}>E-posta</Text>
          <Text style={styles.value}>{currentUser.email}</Text>
          <Text style={styles.label}>Kayıt Tarihi</Text>
          <Text style={styles.value}>
            {currentUser.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : '-'}
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
            <Ionicons name="create-outline" size={18} color="#007AFF" />
            <Text style={styles.editButtonText}>Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={18} color="#fff" />
            <Text style={styles.logoutButtonText}>Çıkış</Text>
          </TouchableOpacity>
        </View>
        {/* Profil Düzenleme Modalı */}
        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Profili Düzenle</Text>
              <TextInput
                style={styles.input}
                placeholder="İsim"
                value={editName}
                onChangeText={setEditName}
              />
              <TextInput
                style={styles.input}
                placeholder="Soyisim"
                value={editSurname}
                onChangeText={setEditSurname}
              />
              <TextInput
                style={[styles.input, { backgroundColor: '#eee' }]}
                placeholder="Email"
                value={editEmail}
                editable={false}
              />
              <TouchableOpacity
                style={styles.authButton}
                onPress={handleSaveEdit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.authButtonText}>Kaydet</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={90} color="#007AFF" style={styles.avatar} />
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.formTitle}>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</Text>
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="İsim"
              value={displayName}
              onChangeText={setDisplayName}
            />
            <TextInput
              style={styles.input}
              placeholder="Soyisim"
              value={surname}
              onChangeText={setSurname}
            />
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.authButton}
          onPress={handleAuth}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.authButtonText}>
              {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchButtonText}>
            {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 115,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 0,
    paddingTop: 30,
  },
  avatar: {
    marginTop: 0,
    marginBottom: 0,
    zIndex: 2,
    alignSelf: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 18,
    padding: 24,
    marginTop: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  label: {
    fontSize: 13,
    color: '#888',
    marginTop: 8,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  value: {
    fontSize: 17,
    color: '#222',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 18,
    marginBottom: 8,
    alignSelf: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginRight: 10,
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5A5F',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginLeft: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 13,
    borderRadius: 8,
    marginBottom: 14,
    fontSize: 15,
    backgroundColor: '#f7f7f7',
    width: 250,
  },
  authButton: {
    backgroundColor: '#007AFF',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    width: 250,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF5A5F',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;