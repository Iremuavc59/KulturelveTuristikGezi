import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

// Tipler
interface CulturalPlace {
  id: string;
  name: string;
  type: 'museum' | 'historical' | 'cultural';
  distance: number; // km cinsinden
  rating: number;
  image: string;
  estimatedTime: {
    car: number;
    publicTransport: number;
    walking: number;
  };
}

interface City {
  id: string;
  name: string;
  image: string;
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentLocation, setCurrentLocation] = useState<string>('İstanbul');
  const [nearbyPlaces, setNearbyPlaces] = useState<CulturalPlace[]>([]);
  const [recommendedPlaces, setRecommendedPlaces] = useState<CulturalPlace[]>([]);
  const [popularCities, setPopularCities] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMap, setShowMap] = useState<boolean>(false);

  // Konum ve verileri yükleme simülasyonu
  useEffect(() => {
    // Gerçek uygulamada bu kısım API çağrıları ile değiştirilecek
    setTimeout(() => {
      fetchMockData();
      setLoading(false);
    }, 1500);
  }, []);

  const fetchMockData = () => {
    // Yakındaki kültürel yerler için örnek veri
    setNearbyPlaces([
      {
        id: '1',
        name: 'Topkapı Sarayı',
        type: 'historical',
        distance: 2.3,
        rating: 4.8,
        image: 'https://example.com/topkapi.jpg',
        estimatedTime: {
          car: 15,
          publicTransport: 25,
          walking: 45
        }
      },
      {
        id: '2',
        name: 'İstanbul Arkeoloji Müzesi',
        type: 'museum',
        distance: 1.8,
        rating: 4.5,
        image: 'https://example.com/archaeology.jpg',
        estimatedTime: {
          car: 12,
          publicTransport: 22,
          walking: 35
        }
      },
      {
        id: '3',
        name: 'Galata Kulesi',
        type: 'cultural',
        distance: 3.5,
        rating: 4.6,
        image: 'https://example.com/galata.jpg',
        estimatedTime: {
          car: 20,
          publicTransport: 35,
          walking: 60
        }
      }
    ]);

    // AI önerileri için örnek veri
    setRecommendedPlaces([
      {
        id: '4',
        name: 'Ayasofya',
        type: 'historical',
        distance: 2.5,
        rating: 4.9,
        image: 'https://example.com/hagiasophia.jpg',
        estimatedTime: {
          car: 18,
          publicTransport: 28,
          walking: 48
        }
      },
      {
        id: '5',
        name: 'Dolmabahçe Sarayı',
        type: 'historical',
        distance: 4.8,
        rating: 4.7,
        image: 'https://example.com/dolmabahce.jpg',
        estimatedTime: {
          car: 25,
          publicTransport: 40,
          walking: 85
        }
      }
    ]);

    // Popüler şehirler için örnek veri
    setPopularCities([
      { id: '1', name: 'İstanbul', image: 'https://example.com/istanbul.jpg' },
      { id: '2', name: 'Ankara', image: 'https://example.com/ankara.jpg' },
      { id: '3', name: 'İzmir', image: 'https://example.com/izmir.jpg' },
      { id: '4', name: 'Antalya', image: 'https://example.com/antalya.jpg' }
    ]);
  };

  const renderPlaceItem = ({ item }: { item: CulturalPlace }) => (
    <TouchableOpacity style={styles.placeCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.placeImage}
        defaultSource={require('../assets/placeholder.png')} // Varsayılan bir resim eklemelisiniz
      />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <View style={styles.placeDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={styles.distanceContainer}>
            <Ionicons name="location" size={16} color="#FF5A5F" />
            <Text style={styles.distanceText}>{item.distance} km</Text>
          </View>
        </View>
        <View style={styles.transportContainer}>
          <View style={styles.transportItem}>
            <Ionicons name="car" size={16} color="#333" />
            <Text style={styles.transportText}>{item.estimatedTime.car} dk</Text>
          </View>
          <View style={styles.transportItem}>
            <Ionicons name="bus" size={16} color="#333" />
            <Text style={styles.transportText}>{item.estimatedTime.publicTransport} dk</Text>
          </View>
          <View style={styles.transportItem}>
            <Ionicons name="walk" size={16} color="#333" />
            <Text style={styles.transportText}>{item.estimatedTime.walking} dk</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={24} color="#FF5A5F" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCityItem = ({ item }: { item: City }) => (
    <TouchableOpacity style={styles.cityCard}>
      <Image source={{ uri: item.image }} style={styles.cityImage} />
      <Text style={styles.cityName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5A5F" />
        <Text style={styles.loadingText}>Kültürel noktalar yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={24} color="#FF5A5F" />
          <Text style={styles.locationText}>{currentLocation}</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Müze, tarihi yer veya şehir ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="#FF5A5F" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.mapToggleButton}
        onPress={() => setShowMap(!showMap)}
      >
        <Text style={styles.mapToggleText}>
          {showMap ? "Listeye Dön" : "Haritada Göster"}
        </Text>
        <Ionicons name={showMap ? "list" : "map"} size={20} color="#FFF" />
      </TouchableOpacity>

      {showMap ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 41.0082,  // İstanbul koordinatları
              longitude: 28.9784,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {nearbyPlaces.map((place) => (
              <Marker
                key={place.id}
                coordinate={{
                  // Gerçek uygulamada her yerin gerçek koordinatları olmalı
                  latitude: 41.0082 + Math.random() * 0.05 - 0.025,
                  longitude: 28.9784 + Math.random() * 0.05 - 0.025,
                }}
                title={place.name}
                description={`${place.distance} km uzaklıkta`}
              />
            ))}
          </MapView>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Popüler Şehirler</Text>
            <FlatList
              data={popularCities}
              renderItem={renderCityItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.cityList}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Yakınınızdaki Kültürel Noktalar</Text>
            {nearbyPlaces.map((place) => renderPlaceItem({ item: place }))}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Size Özel Öneriler</Text>
            <Text style={styles.subTitle}>İlgi alanlarınıza göre önerilen yerler</Text>
            {recommendedPlaces.map((place) => renderPlaceItem({ item: place }))}
          </View>

          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.routePlanButton}>
              <Ionicons name="map" size={24} color="#FFF" />
              <Text style={styles.routePlanText}>Kendi Rotanı Oluştur</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#FF5A5F" />
          <Text style={[styles.tabText, styles.activeTabText]}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="compass" size={24} color="#666" />
          <Text style={styles.tabText}>Keşfet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="map" size={24} color="#666" />
          <Text style={styles.tabText}>Rotalar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="heart" size={24} color="#666" />
          <Text style={styles.tabText}>Favoriler</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
    marginRight: 4,
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  mapToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5A5F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  mapToggleText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    height: 400,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    marginTop: -8,
  },
  cityList: {
    marginTop: 8,
    marginBottom: 8,
  },
  cityCard: {
    width: 120,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cityImage: {
    width: '100%',
    height: 90,
    borderRadius: 12,
  },
  cityName: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  placeCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeImage: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  placeInfo: {
    flex: 1,
    padding: 12,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  placeDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  transportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingTop: 8,
  },
  transportItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transportText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  favoriteButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routePlanButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  routePlanText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeTabText: {
    color: '#FF5A5F',
    fontWeight: '600',
  },
});

export default HomePage;