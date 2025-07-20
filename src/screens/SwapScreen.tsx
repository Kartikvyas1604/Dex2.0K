import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const SwapScreen: React.FC = () => {
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('RWA');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [isLoading, setIsLoading] = useState(false);

  const availableTokens = [
    { symbol: 'SOL', name: 'Solana', price: '$98.45', icon: '☀️' },
    { symbol: 'RWA', name: 'Real Estate Token', price: '$1.25', icon: '🏠' },
    { symbol: 'ENT', name: 'Enterprise Coin', price: '$0.89', icon: '🏢' },
    { symbol: 'RET', name: 'Real Estate Token', price: '$15.67', icon: '🏘️' },
  ];

  const slippageOptions = ['0.1', '0.5', '1.0'];

  const handleSwap = () => {
    if (!fromAmount || !toAmount) {
      Alert.alert('Error', 'Please enter amounts to swap');
      return;
    }

    setIsLoading(true);
    
    // Simulate swap process with transfer hook validation
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Swap Successful!',
        `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const TokenSelector = ({ 
    token, 
    onSelect, 
    amount, 
    onAmountChange, 
    isFrom = false 
  }: {
    token: string;
    onSelect: () => void;
    amount: string;
    onAmountChange: (value: string) => void;
    isFrom?: boolean;
  }) => {
    const selectedToken = availableTokens.find(t => t.symbol === token);
    
    return (
      <Card>
        <View style={styles.tokenSelector}>
          <TouchableOpacity style={styles.tokenButton} onPress={onSelect}>
            <Text style={styles.tokenIcon}>{selectedToken?.icon}</Text>
            <View style={styles.tokenInfo}>
              <Text style={styles.tokenSymbol}>{selectedToken?.symbol}</Text>
              <Text style={styles.tokenName}>{selectedToken?.name}</Text>
            </View>
            <Text style={styles.tokenPrice}>{selectedToken?.price}</Text>
            <Text style={styles.arrowIcon}>▼</Text>
          </TouchableOpacity>
          
          <Input
            label={isFrom ? "You Pay" : "You Receive"}
            value={amount}
            onChangeText={onAmountChange}
            placeholder="0.0"
            keyboardType="numeric"
            style={styles.amountInput}
          />
          
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>Balance:</Text>
            <Text style={styles.balanceValue}>1,234.56 {selectedToken?.symbol}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Swap Tokens" showBack />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* From Token */}
        <TokenSelector
          token={fromToken}
          onSelect={() => Alert.alert('Select Token', 'Token selection modal would open')}
          amount={fromAmount}
          onAmountChange={setFromAmount}
          isFrom={true}
        />

        {/* Swap Arrow */}
        <View style={styles.swapArrowContainer}>
          <View style={styles.swapArrow}>
            <Text style={styles.swapArrowIcon}>↓</Text>
          </View>
        </View>

        {/* To Token */}
        <TokenSelector
          token={toToken}
          onSelect={() => Alert.alert('Select Token', 'Token selection modal would open')}
          amount={toAmount}
          onAmountChange={setToAmount}
        />

        {/* Transfer Hook Status */}
        <Card>
          <Text style={styles.sectionTitle}>Transfer Hook Status</Text>
          <View style={styles.hookStatusContainer}>
            <View style={styles.hookStatusItem}>
              <Text style={styles.hookStatusLabel}>Whitelist Check:</Text>
              <View style={styles.hookStatusValue}>
                <Text style={styles.hookStatusIcon}>✅</Text>
                <Text style={styles.hookStatusText}>Passed</Text>
              </View>
            </View>
            <View style={styles.hookStatusItem}>
              <Text style={styles.hookStatusLabel}>KYC Verification:</Text>
              <View style={styles.hookStatusValue}>
                <Text style={styles.hookStatusIcon}>✅</Text>
                <Text style={styles.hookStatusText}>Verified</Text>
              </View>
            </View>
            <View style={styles.hookStatusItem}>
              <Text style={styles.hookStatusLabel}>Transfer Conditions:</Text>
              <View style={styles.hookStatusValue}>
                <Text style={styles.hookStatusIcon}>✅</Text>
                <Text style={styles.hookStatusText}>Met</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Swap Settings */}
        <Card>
          <Text style={styles.sectionTitle}>Swap Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Slippage Tolerance</Text>
            <View style={styles.slippageOptions}>
              {slippageOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.slippageOption,
                    slippage === option && styles.slippageOptionActive
                  ]}
                  onPress={() => setSlippage(option)}
                >
                  <Text style={[
                    styles.slippageOptionText,
                    slippage === option && styles.slippageOptionTextActive
                  ]}>
                    {option}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Price Impact</Text>
            <Text style={styles.settingValue}>0.12%</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Minimum Received</Text>
            <Text style={styles.settingValue}>1,234.56 RWA</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Network Fee</Text>
            <Text style={styles.settingValue}>0.000005 SOL</Text>
          </View>
        </Card>

        {/* Swap Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? "Processing..." : "Swap Tokens"}
            onPress={handleSwap}
            disabled={isLoading || !fromAmount || !toAmount}
            size="large"
            style={styles.swapButton}
          />
        </View>
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
  tokenSelector: {
    marginBottom: 8,
  },
  tokenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
  },
  tokenIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenSymbol: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tokenName: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  tokenPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowIcon: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  amountInput: {
    marginBottom: 8,
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  balanceValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  swapArrowContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  swapArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
  },
  swapArrowIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  hookStatusContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
  },
  hookStatusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  hookStatusLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  hookStatusValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hookStatusIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  hookStatusText: {
    color: '#51cf66',
    fontSize: 14,
    fontWeight: '600',
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
  },
  settingValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  slippageOptions: {
    flexDirection: 'row',
  },
  slippageOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 8,
  },
  slippageOptionActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  slippageOptionText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  slippageOptionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 20,
  },
  swapButton: {
    width: '100%',
  },
}); 