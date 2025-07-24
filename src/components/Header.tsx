import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AppIcon } from './AppIcon';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
}

const { width } = Dimensions.get('window');

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onBack, 
  showBack = false
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <AppIcon name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <View style={styles.spacer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64 + 24, // header height + status bar
    paddingTop: 24, // status bar padding
    paddingBottom: 0,
    paddingHorizontal: 0,
    backgroundColor: '#101014', // solid dark
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 0.5,
  },
  spacer: {
    width: 40,
  },
}); 