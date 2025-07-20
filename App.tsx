import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateTokenScreen } from './src/screens/CreateTokenScreen';
import { SwapScreen } from './src/screens/SwapScreen';
import { BottomTabBar } from './src/components/BottomTabBar';

export default function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'swap':
        return <SwapScreen />;
      case 'create':
        return <CreateTokenScreen />;
      case 'pools':
        return (
          <View style={styles.placeholderContainer}>
            <View style={styles.placeholderCard}>
              <Icon name="water" type="material" size={64} color="#fff" style={styles.placeholderIcon} />
              <Text style={styles.placeholderTitle}>Liquidity Pools</Text>
              <Text style={styles.placeholderSubtitle}>Coming Soon</Text>
            </View>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.placeholderContainer}>
            <View style={styles.placeholderCard}>
              <Icon name="person" type="material" size={64} color="#fff" style={styles.placeholderIcon} />
              <Text style={styles.placeholderTitle}>Profile</Text>
              <Text style={styles.placeholderSubtitle}>Coming Soon</Text>
            </View>
          </View>
        );
      default:
        return <HomeScreen />;
    }
  };

  if (!isWalletConnected) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <WelcomeScreen onConnectWallet={handleConnectWallet} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.background}>
        {renderScreen()}
        <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  placeholderCard: {
    width: '100%',
    height: 300,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  placeholderIcon: {
    marginBottom: 16,
  },
  placeholderTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  placeholderSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    fontWeight: '500',
  },
});
