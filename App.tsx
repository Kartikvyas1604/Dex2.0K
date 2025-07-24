import 'react-native-get-random-values';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SwapScreen } from './src/screens/SwapScreen';
import { PoolsScreen } from './src/screens/PoolsScreen';
import { CreateTokenScreen } from './src/screens/CreateTokenScreen';
import { AnalyticsScreen } from './src/screens/AnalyticsScreen';
import { TokenDetailScreen } from './src/screens/TokenDetailScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { TradingScreen } from './src/screens/TradingScreen';
import { BottomTabBar } from './src/components/BottomTabBar';
import { CreatePoolScreen } from './src/screens/CreatePoolScreen';

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
      case 'pairs':
        return <PoolsScreen />;
      case 'create':
        return <CreateTokenScreen />;
      case 'create-pool':
        return <CreatePoolScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'swap':
        return <SwapScreen />;
      case 'trading':
        return <TradingScreen />;
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
