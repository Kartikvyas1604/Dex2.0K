import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

interface CustomKeyboardProps {
  value: string;
  onChange: (val: string) => void;
  onMax?: () => void;
  onDone?: () => void;
  showMax?: boolean;
  showDone?: boolean;
}

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '⌫'],
];

export const CustomKeyboard: React.FC<CustomKeyboardProps> = ({
  value,
  onChange,
  onMax,
  onDone,
  showMax = true,
  showDone = true,
}) => {
  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      onChange(value.slice(0, -1));
    } else if (key === '.') {
      if (!value.includes('.')) onChange(value + '.');
    } else {
      onChange(value + key);
    }
  };

  return (
    <View style={styles.keyboardContainer}>
      {showMax && (
        <TouchableOpacity style={styles.maxButton} onPress={onMax}>
          <Text style={styles.maxText}>MAX</Text>
        </TouchableOpacity>
      )}
      {KEYS.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => handleKeyPress(key)}
              activeOpacity={0.7}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {showDone && (
        <TouchableOpacity style={styles.doneButton} onPress={onDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    backgroundColor: '#181818',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 48,
    marginVertical: 6,
  },
  key: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    width: (width - 96) / 3,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  keyText: {
    color: '#fff',
    fontSize: 26,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  maxButton: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    paddingHorizontal: 18,
    paddingVertical: 6,
    backgroundColor: '#667eea',
    borderRadius: 12,
  },
  maxText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
    letterSpacing: 1.2,
  },
  doneButton: {
    marginTop: 16,
    backgroundColor: '#51cf66',
    borderRadius: 16,
    paddingHorizontal: 40,
    paddingVertical: 12,
    alignSelf: 'center',
  },
  doneText: {
    color: '#181818',
    fontSize: 18,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 1.1,
  },
}); 