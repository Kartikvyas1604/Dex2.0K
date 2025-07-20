import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '../components/Button';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

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
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
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
            <View style={styles.featureIconContainer}>
              <Icon name="security" type="material" size={20} color="#fff" />
            </View>
            <Text style={styles.featureText}>Secure Trading</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Icon name="speed" type="material" size={20} color="#fff" />
            </View>
            <Text style={styles.featureText}>Lightning Fast</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Icon name="trending-up" type="material" size={20} color="#fff" />
            </View>
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

      {/* Bottom Decorative Element */}
      <View style={styles.bottomDecoration}>
        <Image 
          source={require('../../assets/splash-icon.png')} 
          style={styles.bottomImage}
          resizeMode="contain"
        />
      </View>
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
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: '25%',
    left: '5%',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.015)',
  },
  patternCircle3: {
    position: 'absolute',
    top: '50%',
    left: '15%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  appName: {
    fontSize: 28,
    marginBottom: 6,
    letterSpacing: 2,
    color: '#fff',
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  welcomeTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
    color: '#fff',
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 35,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
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
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginRight: 8,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  bottomDecoration: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    opacity: 0.1,
  },
  bottomImage: {
    width: 80,
    height: 80,
  },
}); 