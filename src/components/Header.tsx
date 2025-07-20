import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AppIcon } from './AppIcon';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  subtitle?: string;
}

const { width } = Dimensions.get('window');

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onBack, 
  showBack = false,
  subtitle
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
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        
        <View style={styles.spacer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 2,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  spacer: {
    width: 40,
  },
}); 