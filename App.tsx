import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateTokenScreen } from './src/screens/CreateTokenScreen';
import { SwapScreen } from './src/screens/SwapScreen';
import { PoolsScreen } from './src/screens/PoolsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { BottomTabBar } from './src/components/BottomTabBar';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const [fontsLoaded] = useFonts({
    'SpaceGrotesk': require('./assets/fonts/Jersey_15,Space_Grotesk/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf'),
  });

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
        return <PoolsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  if (!fontsLoaded) {
    return null; // Keep splash screen visible
  }

  // Hide splash screen once fonts are loaded
  SplashScreen.hideAsync();

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
});
