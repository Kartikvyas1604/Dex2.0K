import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'glass';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  variant = 'default'
}) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'elevated':
        return [styles.card, styles.elevatedCard, style];
      case 'glass':
        return [styles.card, styles.glassCard, style];
      default:
        return [styles.card, style];
    }
  };

  return (
    <View style={getCardStyle()}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  elevatedCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
}); 