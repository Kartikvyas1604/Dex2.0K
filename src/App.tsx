import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';

const onboardingStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('onboarded').then(val => {
      if (!val) setShowOnboarding(true);
    });
  }, []);

  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem('onboarded', 'true');
    setShowOnboarding(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {showOnboarding && (
        <Modal visible transparent animationType="fade">
          <View style={onboardingStyles.overlay}>
            <View style={onboardingStyles.modal}>
              <Text style={onboardingStyles.title}>Welcome to Dex2.0K!</Text>
              <Text style={onboardingStyles.text}>Trade Token-2022 tokens with Transfer Hooks on Solana. Create tokens, pools, and swap with advanced analytics.</Text>
              <Text style={onboardingStyles.text}>• Create Token-2022 with Transfer Hook
• Add liquidity pools
• Trade with real-time charts
• Secure, modern UI</Text>
              <TouchableOpacity style={onboardingStyles.button} onPress={handleFinishOnboarding}>
                <Text style={onboardingStyles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <Toast ref={(ref) => Toast.setRef?.(ref)} />
    </View>
  );
};

export default App; 