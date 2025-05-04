import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  FlatList, 
  TextInput,
  TouchableOpacity,
  Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type ExploreScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Explore'>;
};

const cities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", 
  "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", 
  "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", 
  "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", 
  "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", 
  "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", 
  "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", 
  "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", 
  "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", 
  "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", 
  "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", 
  "Kilis", "Osmaniye", "Düzce"
];

// Add types for attractions
type Attraction = {
  name: string;
  type: string;
  description?: string;
};

type CityWithAttractions = {
  name: string;
  attractions: Attraction[];
};

// Add tourist attractions data
const cityAttractions: { [key: string]: Attraction[] } = {
  "İstanbul": [
    { name: "Ayasofya", type: "Tarihi Yapı", description: "Bizans döneminden kalma, dünyaca ünlü tarihi yapı" },
    { name: "Topkapı Sarayı", type: "Müze", description: "Osmanlı İmparatorluğu'nun yönetim merkezi" },
    { name: "Sultanahmet Camii", type: "Dini Yapı", description: "Mavi Camii olarak da bilinen tarihi cami" }
  ],
  "Ankara": [
    { name: "Anıtkabir", type: "Anıt", description: "Türkiye Cumhuriyeti'nin kurucusu Atatürk'ün mozolesi" },
    { name: "Anadolu Medeniyetleri Müzesi", type: "Müze", description: "Anadolu'nun tarih öncesi eserlerini sergileyen müze" }
  ],
  "İzmir": [
    { name: "Efes Antik Kenti", type: "Antik Kent", description: "Antik dönemin en önemli şehirlerinden biri" },
    { name: "Saat Kulesi", type: "Tarihi Yapı", description: "Konak Meydanı'nın simgesi" }
  ],
  "Nevşehir": [
    { name: "Peri Bacaları", type: "Doğal Oluşum", description: "Kapadokya'nın simgesi olan doğal kaya oluşumları" },
    { name: "Yeraltı Şehirleri", type: "Tarihi Yapı", description: "Antik dönemde yaşam alanı olarak kullanılan yeraltı yerleşimleri" }
  ]
  // Diğer şehirler için gezilecek yerler eklenebilir
};

export default function ExploreScreen({ navigation }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAttractions = (cityName: string) => {
    const attractions = cityAttractions[cityName];
    if (!attractions) {
      return (
        <View style={styles.noAttractionsContainer}>
          <Text style={styles.noAttractionsText}>
            Bu şehir için henüz gezilecek yer eklenmemiştir.
          </Text>
        </View>
      );
    }

    return attractions.map((attraction, index) => (
      <View key={index} style={styles.attractionContainer}>
        <View style={styles.attractionHeader}>
          <Text style={styles.attractionName}>{attraction.name}</Text>
          <Text style={styles.attractionType}>{attraction.type}</Text>
        </View>
        {attraction.description && (
          <Text style={styles.attractionDescription}>{attraction.description}</Text>
        )}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Şehir ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity 
              style={[
                styles.cityItem,
                selectedCity === item && styles.selectedCity
              ]}
              onPress={() => setSelectedCity(selectedCity === item ? null : item)}
            >
              <Text style={styles.cityName}>{item}</Text>
              <Ionicons 
                name={selectedCity === item ? "chevron-up" : "chevron-forward"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
            {selectedCity === item && (
              <View style={styles.attractionsList}>
                {renderAttractions(item)}
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
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
    fontSize: 16,
    color: '#333',
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cityName: {
    fontSize: 16,
    color: '#333',
  },
  selectedCity: {
    backgroundColor: '#f0f7ff',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  attractionsList: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  attractionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  attractionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  attractionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  attractionType: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  attractionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  noAttractionsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  noAttractionsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  }
});