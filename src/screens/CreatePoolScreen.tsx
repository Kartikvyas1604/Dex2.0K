import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Card } from '../components/Card';
import { AppIcon } from '../components/AppIcon';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const TOKENS = [
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'BONK', name: 'Bonk' },
  { symbol: 'JUP', name: 'Jupiter' },
  { symbol: 'RAY', name: 'Raydium' },
  { symbol: 'USDC', name: 'USD Coin' },
];

export const CreatePoolScreen: React.FC = () => {
  const [tokenA, setTokenA] = useState(TOKENS[0]);
  const [tokenB, setTokenB] = useState(TOKENS[1]);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [fee, setFee] = useState('0.3%');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCreatePool = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Create Liquidity Pool</Text>
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Select Tokens</Text>
        <View style={styles.tokenRow}>
          <TouchableOpacity style={styles.tokenSelector}>
            <AppIcon name={tokenA.symbol.toLowerCase()} size={24} color="#fff" />
            <Text style={styles.tokenText}>{tokenA.symbol}</Text>
          </TouchableOpacity>
          <Text style={styles.vsText}>/</Text>
          <TouchableOpacity style={styles.tokenSelector}>
            <AppIcon name={tokenB.symbol.toLowerCase()} size={24} color="#fff" />
            <Text style={styles.tokenText}>{tokenB.symbol}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{tokenA.symbol} Amount</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0.0"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={amountA}
              onChangeText={setAmountA}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{tokenB.symbol} Amount</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0.0"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={amountB}
              onChangeText={setAmountB}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Pool Fee</Text>
          <View style={styles.feeSelector}>
            {['0.1%', '0.3%', '1%'].map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.feeOption, fee === f && styles.selectedFeeOption]}
                onPress={() => setFee(f)}
              >
                <Text style={[styles.feeOptionText, fee === f && styles.selectedFeeOptionText]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreatePool}
          disabled={submitting || !amountA || !amountB}
        >
          <Text style={styles.createButtonText}>{submitting ? 'Creating...' : 'Create Pool'}</Text>
        </TouchableOpacity>
        {success && <Text style={styles.successText}>Pool created successfully! (placeholder)</Text>}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
    marginBottom: 16,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tokenText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
    marginLeft: 8,
  },
  vsText: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 12,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  feeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  feeOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  selectedFeeOption: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  feeOptionText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  selectedFeeOptionText: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  successText: {
    color: '#4ade80',
    marginTop: 12,
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 12,
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
}); 