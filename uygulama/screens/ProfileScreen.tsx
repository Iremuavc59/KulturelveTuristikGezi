import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  const user = {
    name: 'Ahmet Yılmaz',
    username: '@ahmetyilmaz',
    email: 'ahmet.yilmaz@example.com',
    location: 'İstanbul, Türkiye',
    visitedCount: 24,
    favoriteCount: 12,
    reviewCount: 8,
  };

  const recentVisits = [
    {
      id: '1',
      name: 'Topkapı Sarayı',
      date: '15 Nisan 2025',
      photo: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'İstanbul Arkeoloji Müzesi',
      date: '8 Nisan 2025',
      photo: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Ayasofya',
      date: '27 Mart 2025',
      photo: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#666" />
            </View>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.location}>{user.location}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.visitedCount}</Text>
              <Text style={styles.statLabel}>Ziyaret</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.favoriteCount}</Text>
              <Text style={styles.statLabel}>Favori</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.reviewCount}</Text>
              <Text style={styles.statLabel}>Yorum</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={24} color="#333" />
              <Text style={styles.settingLabel}>Karanlık Mod</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#0066cc' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <Text style={styles.settingLabel}>Bildirimler</Text>
            </View>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isNotificationsEnabled ? '#0066cc' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="location-outline" size={24} color="#333" />
              <Text style={styles.settingLabel}>Konum</Text>
            </View>
            <Switch
              value={isLocationEnabled}
              onValueChange={setIsLocationEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isLocationEnabled ? '#0066cc' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Recent Visits */}
        <View style={styles.recentVisitsSection}>
          <Text style={styles.sectionTitle}>Son Ziyaretler</Text>
          {recentVisits.map(visit => (
            <TouchableOpacity key={visit.id} style={styles.visitItem}>
              <Image
                source={{ uri: visit.photo }}
                style={styles.visitImage}
              />
              <View style={styles.visitInfo}>
                <Text style={styles.visitName}>{visit.name}</Text>
                <Text style={styles.visitDate}>{visit.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  settingsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  recentVisitsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  visitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  visitImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  visitInfo: {
    flex: 1,
  },
  visitName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  visitDate: {
    fontSize: 14,
    color: '#666',
  },
});