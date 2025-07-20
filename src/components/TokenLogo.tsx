import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppIcon } from './AppIcon';

interface TokenLogoProps {
  symbol: string;
  size?: number;
  style?: any;
}

export const TokenLogo: React.FC<TokenLogoProps> = ({ 
  symbol, 
  size = 32, 
  style 
}) => {
  const getTokenConfig = (tokenSymbol: string) => {
    const tokens: { [key: string]: { color: string; icon: string } } = {
      'SOL': { color: '#9945FF', icon: 'solana' },
      'USDC': { color: '#2775CA', icon: 'usdc' },
      'RWA': { color: '#FF6B35', icon: 'rwa' },
      'ENT': { color: '#4ECDC4', icon: 'ent' },
      'BTC': { color: '#F7931A', icon: 'currency-bitcoin' },
      'ETH': { color: '#627EEA', icon: 'currency-exchange' },
      'USDT': { color: '#26A17B', icon: 'attach-money' },
      'DEFAULT': { color: '#667eea', icon: 'business' },
    };

    return tokens[tokenSymbol.toUpperCase()] || tokens['DEFAULT'];
  };

  const tokenConfig = getTokenConfig(symbol);

  return (
    <View style={[
      styles.container,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: tokenConfig.color,
      },
      style
    ]}>
      <AppIcon
        name={tokenConfig.icon}
        size={size * 0.6}
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
}); 