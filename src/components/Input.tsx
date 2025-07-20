import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Icon } from 'react-native-elements';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  success?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  iconType?: string;
  variant?: 'default' | 'filled';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  leftIcon,
  rightIcon,
  iconType = 'material',
  style,
  variant = 'default',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    setHasValue(text.length > 0);
    props.onChangeText?.(text);
  };

  const getBorderColor = () => {
    if (error) return '#ff6b6b';
    if (success) return '#51cf66';
    if (isFocused) return '#667eea';
    return 'rgba(255, 255, 255, 0.2)';
  };

  const getBackgroundColor = () => {
    if (variant === 'filled') {
      return 'rgba(255, 255, 255, 0.08)';
    }
    return 'rgba(255, 255, 255, 0.05)';
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { 
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          },
          style,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            <Icon name={leftIcon} type={iconType} size={20} color="rgba(255, 255, 255, 0.6)" />
          </View>
        )}
        
        <View style={styles.inputWrapper}>
          <Text style={[
            styles.label,
            (isFocused || hasValue) && styles.labelFocused,
          ]}>
            {label}
          </Text>
          
          <TextInput
            {...props}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
          />
        </View>
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            <Icon name={rightIcon} type={iconType} size={20} color="rgba(255, 255, 255, 0.6)" />
          </View>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  leftIcon: {
    marginRight: 14,
  },
  rightIcon: {
    marginLeft: 14,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 16,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    transition: 'all 0.2s ease',
  },
  labelFocused: {
    top: -8,
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  input: {
    fontSize: 16,
    color: '#fff',
    paddingTop: 8,
    paddingBottom: 4,
    fontWeight: '500',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 18,
    fontWeight: '500',
  },
}); 