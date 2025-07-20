import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Icon } from 'react-native-elements';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
  iconType?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  icon,
  iconType = 'material',
}) => {
  const getBackgroundColor = () => {
    if (disabled) return '#666';
    switch (variant) {
      case 'primary':
        return '#667eea';
      case 'secondary':
        return '#f093fb';
      case 'success':
        return '#51cf66';
      case 'danger':
        return '#ff6b6b';
      default:
        return '#667eea';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 10, paddingHorizontal: 20 };
      case 'large':
        return { paddingVertical: 18, paddingHorizontal: 40 };
      default:
        return { paddingVertical: 14, paddingHorizontal: 28 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.button,
          styles.outlineButton,
          getSizeStyles(),
          disabled && styles.disabled,
          style,
        ]}
      >
        {icon && (
          <Icon 
            name={icon} 
            type={iconType}
            size={16} 
            color="#667eea" 
            style={styles.iconContainer} 
          />
        )}
        <Text style={[
          styles.outlineText,
          { fontSize: getTextSize() },
          disabled && styles.disabledText,
          textStyle,
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        getSizeStyles(),
        { backgroundColor: getBackgroundColor() },
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon && (
        <Icon 
          name={icon} 
          type={iconType}
          size={16} 
          color="#fff" 
          style={styles.iconContainer} 
        />
      )}
      <Text style={[
        styles.text,
        { fontSize: getTextSize() },
        disabled && styles.disabledText,
        textStyle,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  outlineText: {
    color: '#667eea',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  iconContainer: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999',
  },
}); 