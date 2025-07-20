import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TokenLogo } from '../components/TokenLogo';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

export const SwapScreen: React.FC = () => {
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const tokens = [
    { symbol: 'SOL', name: 'Solana', price: '$98.45', change: '+2.3%', logo: 'solana' },
    { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '0.0%', logo: 'usdc' },
    { symbol: 'RWA', name: 'RWA Token', price: '$1.25', change: '+5.2%', logo: 'rwa' },
    { symbol: 'ENT', name: 'Enterprise Coin', price: '$0.89', change: '-2.1%', logo: 'ent' },
  ];

  const swapSettings = [
    { label: 'Slippage Tolerance', value: `${slippage}%` },
    { label: 'Network Fee', value: '~$0.002' },
    { label: 'Minimum Received', value: '0.0 USDC' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Swap" subtitle="Token-2022 Exchange" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Swap Interface */}
        <Card style={styles.swapCard}>
          <Text style={styles.swapTitle}>Swap Tokens</Text>
          
          {/* From Token */}
          <View style={styles.tokenInputContainer}>
            <Text style={styles.inputLabel}>From</Text>
            <View style={styles.tokenInput}>
              <View style={styles.tokenSelector}>
                <TokenLogo symbol={fromToken} size={32} style={styles.tokenLogo} />
                <Text style={styles.tokenSymbol}>{fromToken}</Text>
                <AppIcon name="keyboard-arrow-down" size={20} color="#fff" />
              </View>
              <TextInput
                style={styles.amountInput}
                placeholder="0.0"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={fromAmount}
                onChangeText={setFromAmount}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.balanceText}>Balance: 0.0 {fromToken}</Text>
          </View>

          {/* Swap Arrow */}
          <TouchableOpacity style={styles.swapArrow}>
            <AppIcon name="swap-vert" size={24} color="#fff" />
          </TouchableOpacity>

          {/* To Token */}
          <View style={styles.tokenInputContainer}>
            <Text style={styles.inputLabel}>To</Text>
            <View style={styles.tokenInput}>
              <View style={styles.tokenSelector}>
                <TokenLogo symbol={toToken} size={32} style={styles.tokenLogo} />
                <Text style={styles.tokenSymbol}>{toToken}</Text>
                <AppIcon name="keyboard-arrow-down" size={20} color="#fff" />
              </View>
              <TextInput
                style={styles.amountInput}
                placeholder="0.0"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={toAmount}
                onChangeText={setToAmount}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.balanceText}>Balance: 0.0 {toToken}</Text>
          </View>

          {/* Swap Button */}
          <Button
            title="Connect Wallet to Swap"
            onPress={() => {}}
            size="large"
            style={styles.swapButton}
            disabled={true}
          />
        </Card>

        {/* Swap Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>Swap Settings</Text>
          {swapSettings.map((setting, index) => (
            <View key={index} style={styles.settingItem}>
              <Text style={styles.settingLabel}>{setting.label}</Text>
              <Text style={styles.settingValue}>{setting.value}</Text>
            </View>
          ))}
        </Card>

        {/* Recent Swaps */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Swaps</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentSwaps}>
            <View style={styles.swapItem}>
              <View style={styles.swapInfo}>
                <Text style={styles.swapPair}>SOL → USDC</Text>
                <Text style={styles.swapAmount}>0.5 SOL → 49.22 USDC</Text>
              </View>
              <Text style={styles.swapTime}>2 min ago</Text>
            </View>
            <View style={styles.swapItem}>
              <View style={styles.swapInfo}>
                <Text style={styles.swapPair}>RWA → SOL</Text>
                <Text style={styles.swapAmount}>100 RWA → 0.8 SOL</Text>
              </View>
              <Text style={styles.swapTime}>5 min ago</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  swapCard: {
    marginTop: 20,
  },
  swapTitle: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  tokenInputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  tokenInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tokenLogo: {
    marginRight: 8,
  },
  tokenSymbol: {
    color: '#fff',
    fontSize: 16,
    marginRight: 4,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  amountInput: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'right',
    flex: 1,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  balanceText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 4,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  swapArrow: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  swapButton: {
    marginTop: 20,
  },
  settingsCard: {
    marginTop: 16,
  },
  settingsTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  settingValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  viewAllText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  recentSwaps: {
    marginTop: 8,
  },
  swapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  swapInfo: {
    flex: 1,
  },
  swapPair: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  swapAmount: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  swapTime: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
}); 