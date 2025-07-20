import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '../components/Button';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onConnectWallet: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onConnectWallet }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Content animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
      </View>

      {/* Logo Section */}
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: logoAnim,
            transform: [{ scale: logoAnim }],
          }
        ]}
      >
        <View style={styles.logoCircle}>
          <Icon name="account-balance-wallet" type="material" size={48} color="#fff" />
        </View>
        <Text style={styles.appName}>Dex2.0K</Text>
        <Text style={styles.appSubtitle}>Token-2022 AMM Platform</Text>
      </Animated.View>

      {/* Content Section */}
      <Animated.View 
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ],
          }
        ]}
      >
        <Text style={styles.welcomeTitle}>Welcome to the Future</Text>
        <Text style={styles.welcomeSubtitle}>
          Experience the next generation of decentralized trading with Token-2022 transfer hooks
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Icon name="security" type="material" size={24} color="#fff" />
            <Text style={styles.featureText}>Secure Trading</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="speed" type="material" size={24} color="#fff" />
            <Text style={styles.featureText}>Lightning Fast</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="trending-up" type="material" size={24} color="#fff" />
            <Text style={styles.featureText}>Advanced Features</Text>
          </View>
        </View>

        <Button
          title="Connect Wallet"
          onPress={onConnectWallet}
          size="large"
          icon="account-balance-wallet"
          style={styles.connectButton}
        />

        <TouchableOpacity style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Learn More</Text>
          <Icon name="arrow-forward" type="material" size={16} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternCircle1: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  patternCircle3: {
    position: 'absolute',
    top: '50%',
    left: '15%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  connectButton: {
    width: '100%',
    marginBottom: 20,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  learnMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
}); 