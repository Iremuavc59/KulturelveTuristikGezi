import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, Platform, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getAllPlaces, Place } from '../services/placeService';

type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Örnek keşif mekânları
  const nearbyPlaces = [
    {
      id: '1',
      name: 'Topkapı Sarayı',
      type: 'Tarihi Mekân',
      rating: 4.8,
      distance: '2.3 km',
      duration: '15 dk',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'İstanbul Arkeoloji Müzesi',
      type: 'Müze',
      rating: 4.5,
      distance: '1.8 km',
      duration: '12 dk',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Ayasofya',
      type: 'Tarihi Mekân',
      rating: 4.9,
      distance: '2.5 km',
      duration: '18 dk',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const categories = [
    { id: '1', name: 'Müzeler', icon: 'building' }, // museum ikonu için building kullanıyoruz
    { id: '2', name: 'Tarihi Yerler', icon: 'monument' },
    { id: '3', name: 'Sanat Galerileri', icon: 'paint-brush' },
    { id: '4', name: 'Favoriler', icon: 'heart-solid' }, // heart-solid kullanıyoruz
  ];

  const popularDestinations = [
    { id: '1', name: 'İstanbul', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Ankara', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'İzmir', image: 'https://via.placeholder.com/150' },
  ];

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      setLoading(true);
      const placesData = await getAllPlaces();
      setPlaces(placesData);
    } catch (err) {
      setError('Veriler yüklenirken bir hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5762B7" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Merhaba, Ziyaretçi 👋</Text>
          <Text style={styles.subGreeting}>Bugün ne keşfetmek istersiniz?</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle-outline" size={36} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Müze, tarihi yer veya şehir ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <View style={styles.categoryIconContainer}>
                <Ionicons 
                  name={category.id === '1' ? 'business' : 
                        category.id === '2' ? 'business' :
                        category.id === '3' ? 'color-palette' :
                        'heart'} 
                  size={24} 
                  color="#0066cc" 
                />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          <TouchableOpacity style={styles.mapPlaceholder}>
            <MaterialIcons name="map" size={36} color="#555" />
            <Text style={styles.mapText}>Harita Önizlemesi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewMapButton}>
            <Text style={styles.viewMapText}>Yakındaki Mekanlar</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#0066cc" />
          </TouchableOpacity>
        </View>

        {/* Nearby Attractions */}
        <View style={styles.nearbyContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Yakınlardaki Keşifler</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          
          {places.map((place) => (
            <TouchableOpacity key={place.id} style={styles.placeCard}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>Görsel</Text>
              </View>
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeType}>{place.type}</Text>
                <View style={styles.placeDetails}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.rating}>{place.rating}</Text>
                  </View>
                  <View style={styles.distanceContainer}>
                    <Ionicons name="location" size={14} color="#0066cc" />
                    <Text style={styles.distance}>{place.distance}</Text>
                  </View>
                  <View style={styles.durationContainer}>
                    <Ionicons name="time-outline" size={14} color="#0066cc" />
                    <Text style={styles.duration}>{place.duration}</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#ccc" style={styles.chevron} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Cities */}
        <Text style={styles.sectionTitle}>Popüler Şehirler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.citiesContainer}>
          {popularDestinations.map((city) => (
            <TouchableOpacity key={city.id} style={styles.cityCard}>
              <View style={styles.cityImagePlaceholder}>
                <Text style={styles.cityName}>{city.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#0066cc" />
          <Text style={[styles.navText, styles.activeNavText]}>Ana Sayfa</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Explore')}
        >
          <Ionicons name="compass-outline" size={24} color="#888" />
          <Text style={styles.navText}>Keşfet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map-outline" size={24} color="#888" />
          <Text style={styles.navText}>Harita</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#888" />
          <Text style={styles.navText}>Favoriler</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-outline" size={24} color="#888" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    // Platform specific padding for status bar
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10, // Reduced from 20
    paddingBottom: 15,
    backgroundColor: '#f5f7fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 20, // Increased for better visibility
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4, // Added for spacing
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 2, // Reduced from 4
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchContainer: {
    marginTop: 5, // Added to reduce space
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    padding: 8,
  },
  mapContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#e6e9ed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#555',
    fontSize: 16,
    marginBottom: 10,
  },
  viewMapButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  viewMapText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#0066cc',
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: 80,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#e6f0ff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },
  nearbyContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    color: '#0066cc',
    fontSize: 14,
    fontWeight: '500',
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#e6e9ed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  imagePlaceholderText: {
    color: '#888',
    fontSize: 12,
  },
  placeInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  placeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: 12,
    color: '#555',
    marginLeft: 3,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  distance: {
    fontSize: 12,
    color: '#555',
    marginLeft: 3,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#555',
    marginLeft: 3,
  },
  chevron: {
    alignSelf: 'center',
  },
  citiesContainer: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  cityCard: {
    width: 140,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cityImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e6e9ed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 11,
    marginTop: 4,
    color: '#888',
  },
  activeNavText: {
    color: '#0066cc',
    fontWeight: '500',
  },
});