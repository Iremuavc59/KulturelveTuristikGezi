import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TravellerDetails {
  adults: number;
  children: number;
  infants: number;
}
console.log("Home Screen Loaded!");


const TravelBookingApp: React.FC = () => {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip' | 'multiCity'>('oneWay');
  const [departFrom, setDepartFrom] = useState('New Delhi');
  const [arrivalTo, setArrivalTo] = useState('London');
  const [departureDate, setDepartureDate] = useState('Wed 2 Mar');
  const [travellers, setTravellers] = useState<TravellerDetails>({
    adults: 2,
    children: 1,
    infants: 1,
  });
  const [stopPreference, setStopPreference] = useState<'stop' | 'nonStop'>('stop');
  const [classPreference, setClassPreference] = useState<'economy' | 'premium'>('economy');
  const [activeTab, setActiveTab] = useState<'flights' | 'hotel' | 'holidays'>('flights');

  const renderTravellersText = () => {
    return `${travellers.adults} adults · ${travellers.children} children · ${travellers.infants} infants`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <ImageBackground
          source={require('../assets/background.jpg')}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>A Journey to Adventurous</Text>
              <Text style={styles.headerSubtitle}>Discover amazing places at exclusive deals</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'flights' && styles.activeTab]}
                onPress={() => setActiveTab('flights')}
              >
                <Text style={[styles.tabText, activeTab === 'flights' && styles.activeTabText]}>Flights</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'hotel' && styles.activeTab]}
                onPress={() => setActiveTab('hotel')}
              >
                <Text style={[styles.tabText, activeTab === 'hotel' && styles.activeTabText]}>Hotel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'holidays' && styles.activeTab]}
                onPress={() => setActiveTab('holidays')}
              >
                <Text style={[styles.tabText, activeTab === 'holidays' && styles.activeTabText]}>Holidays</Text>
              </TouchableOpacity>
            </View>

            {/* Trip Type Selection */}
            <View style={styles.tripTypeContainer}>
              <TouchableOpacity
                style={[styles.tripTypeOption, tripType === 'oneWay' && styles.selectedTripType]}
                onPress={() => setTripType('oneWay')}
              >
                <View style={[styles.radioButton, tripType === 'oneWay' && styles.radioButtonSelected]}>
                  {tripType === 'oneWay' && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.tripTypeText}>One Way</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tripTypeOption, tripType === 'roundTrip' && styles.selectedTripType]}
                onPress={() => setTripType('roundTrip')}
              >
                <View style={[styles.radioButton, tripType === 'roundTrip' && styles.radioButtonSelected]}>
                  {tripType === 'roundTrip' && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.tripTypeText}>Round Trip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tripTypeOption, tripType === 'multiCity' && styles.selectedTripType]}
                onPress={() => setTripType('multiCity')}
              >
                <View style={[styles.radioButton, tripType === 'multiCity' && styles.radioButtonSelected]}>
                  {tripType === 'multiCity' && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.tripTypeText}>Multi City</Text>
              </TouchableOpacity>
            </View>

            {/* Search Form */}
            <View style={styles.formContainer}>
              <View style={styles.formRow}>
                <View style={styles.formInputHalf}>
                  <Text style={styles.formLabel}>Depart From</Text>
                  <TextInput
                    style={styles.formInput}
                    value={departFrom}
                    onChangeText={setDepartFrom}
                    placeholder="City or Airport"
                  />
                </View>
                <View style={styles.formInputHalf}>
                  <Text style={styles.formLabel}>Arrival To</Text>
                  <TextInput
                    style={styles.formInput}
                    value={arrivalTo}
                    onChangeText={setArrivalTo}
                    placeholder="City or Airport"
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formInputHalf}>
                  <Text style={styles.formLabel}>Departure Date</Text>
                  <TextInput
                    style={styles.formInput}
                    value={departureDate}
                    onChangeText={setDepartureDate}
                    placeholder="Select Date"
                  />
                </View>
                <View style={styles.formInputHalf}>
                  <Text style={styles.formLabel}>Traveller's</Text>
                  <TouchableOpacity style={styles.formInput}>
                    <Text>{renderTravellersText()}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Preferences */}
              <View style={styles.preferencesContainer}>
                <View style={styles.preferenceButtons}>
                  <TouchableOpacity
                    style={[styles.preferenceButton, stopPreference === 'stop' && styles.preferenceButtonSelected]}
                    onPress={() => setStopPreference('stop')}
                  >
                    <Text
                      style={[
                        styles.preferenceButtonText,
                        stopPreference === 'stop' && styles.preferenceButtonTextSelected,
                      ]}
                    >
                      Stop
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.preferenceButton, stopPreference === 'nonStop' && styles.preferenceButtonSelected]}
                    onPress={() => setStopPreference('nonStop')}
                  >
                    <Text
                      style={[
                        styles.preferenceButtonText,
                        stopPreference === 'nonStop' && styles.preferenceButtonTextSelected,
                      ]}
                    >
                      NonStop
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.preferenceButtons}>
                  <TouchableOpacity
                    style={[
                      styles.preferenceButton,
                      classPreference === 'economy' && styles.preferenceButtonSelected,
                    ]}
                    onPress={() => setClassPreference('economy')}
                  >
                    <Text
                      style={[
                        styles.preferenceButtonText,
                        classPreference === 'economy' && styles.preferenceButtonTextSelected,
                      ]}
                    >
                      Economy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.preferenceButton,
                      classPreference === 'premium' && styles.preferenceButtonSelected,
                    ]}
                    onPress={() => setClassPreference('premium')}
                  >
                    <Text
                      style={[
                        styles.preferenceButtonText,
                        classPreference === 'premium' && styles.preferenceButtonTextSelected,
                      ]}
                    >
                      Premium
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Search Button */}
              <TouchableOpacity style={styles.searchButton}>
                <Ionicons name="search" size={20} color="#fff" />
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#fff',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tripTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tripTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTripType: {
    opacity: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    borderColor: '#fff',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  tripTypeText: {
    color: '#fff',
    fontSize: 14,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  formInputHalf: {
    width: '48%',
  },
  formLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  preferencesContainer: {
    marginVertical: 15,
  },
  preferenceButtons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  preferenceButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  preferenceButtonSelected: {
    backgroundColor: '#0099cc',
    borderColor: '#0099cc',
  },
  preferenceButtonText: {
    color: '#666',
  },
  preferenceButtonTextSelected: {
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#0099cc',
    borderRadius: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default TravelBookingApp;