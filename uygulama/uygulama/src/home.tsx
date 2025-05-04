import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const featuredPlaces = [
  {
    title: 'Ayasofya Camii',
    location: 'İstanbul',
    image: 'https://via.placeholder.com/200x150',
    badge: 'Popüler',
  },
  {
    title: 'Efes Antik Kenti',
    location: 'İzmir',
    image: 'https://via.placeholder.com/200x150',
    badge: 'UNESCO',
  },
  {
    title: 'Topkapı Sarayı',
    location: 'İstanbul',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Kapadokya',
    location: 'Nevşehir',
    image: 'https://via.placeholder.com/200x150',
    badge: 'Popüler',
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Kültürel Miras Rehberi</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBox}
            placeholder="Kültürel miras ara..."
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => alert(`${search} için arama sonuçları gösterilecek!`)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Öne Çıkan Yerler</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredPlaces.map((place, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featuredItem}
                onPress={() => alert(`${place.title} detayları gösterilecek!`)}
              >
                <ImageBackground
                  source={{ uri: place.image }}
                  style={styles.featuredImage}
                  imageStyle={{ borderRadius: 10 }}
                >
                  {place.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{place.badge}</Text>
                    </View>
                  )}
                </ImageBackground>
                <Text style={styles.featuredTitle}>{place.title}</Text>
                <Text style={styles.featuredLocation}>{place.location}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1e3a8a', padding: 15 },
  appTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  searchContainer: { backgroundColor: '#f0f4f8', padding: 15, position: 'relative' },
  searchBox: { backgroundColor: 'white', borderRadius: 25, padding: 12, paddingLeft: 40, fontSize: 16 },
  searchIcon: { position: 'absolute', left: 30, top: 27 },
  section: { padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  featuredItem: { width: 200, marginRight: 15 },
  featuredImage: { height: 150, marginBottom: 5 },
  badge: { backgroundColor: 'rgba(255,69,0,0.8)', padding: 5, position: 'absolute', top: 10, left: 10, borderRadius: 5 },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  featuredTitle: { fontWeight: 'bold', fontSize: 16 },
  featuredLocation: { color: '#555' },
});
