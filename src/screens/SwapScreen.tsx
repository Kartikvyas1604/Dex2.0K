import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { AppIcon } from '../components/AppIcon';
import { TokenLogo } from '../components/TokenLogo';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';
import { CustomKeyboard } from '../components/CustomKeyboard';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

interface Token {
  symbol: string;
  name: string;
  address: string;
  logo: string;
  price: number;
  priceChange24h: number;
  balance: number;
}

interface SwapState {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  slippage: number;
  gasEstimate: number;
  priceImpact: number;
}

export const SwapScreen: React.FC = () => {
  const [swapState, setSwapState] = useState<SwapState>({
    fromToken: {
      symbol: 'SOL',
      name: 'Solana',
      address: 'So11111111111111111111111111111111111111112',
      logo: 'solana',
      price: 98.45,
      priceChange24h: 2.3,
      balance: 12.5,
    },
    toToken: {
      symbol: 'BONK',
      name: 'Bonk',
      address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      logo: 'bonk',
      price: 0.00001234,
      priceChange24h: 11.08,
      balance: 1000000,
    },
    fromAmount: '',
    toAmount: '',
    slippage: 0.5,
    gasEstimate: 0.001,
    priceImpact: 0.12,
  });

  const [showTokenSelector, setShowTokenSelector] = useState<'from' | 'to' | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState<'from' | 'to' | null>(null);
  const [infoModal, setInfoModal] = useState({ visible: false, text: '' });

  const popularTokens: Token[] = [
    {
      symbol: 'SOL',
      name: 'Solana',
      address: 'So11111111111111111111111111111111111111112',
      logo: 'solana',
      price: 98.45,
      priceChange24h: 2.3,
      balance: 12.5,
    },
    {
      symbol: 'BONK',
      name: 'Bonk',
      address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      logo: 'bonk',
      price: 0.00001234,
      priceChange24h: 11.08,
      balance: 1000000,
    },
    {
      symbol: 'JUP',
      name: 'Jupiter',
      address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      logo: 'jupiter',
      price: 0.5678,
      priceChange24h: 4.31,
      balance: 500,
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      logo: 'raydium',
      price: 1.2345,
      priceChange24h: -4.39,
      balance: 200,
    },
  ];

  const slippageOptions = [0.1, 0.5, 1.0, 2.0];

  const updateSwapState = (field: keyof SwapState, value: any) => {
    setSwapState(prev => ({ ...prev, [field]: value }));
  };

  const handleFromAmountChange = (amount: string) => {
    updateSwapState('fromAmount', amount);
    // Calculate to amount based on price
    if (amount && !isNaN(parseFloat(amount))) {
      const fromValue = parseFloat(amount) * swapState.fromToken.price;
      const toAmount = fromValue / swapState.toToken.price;
      updateSwapState('toAmount', toAmount.toFixed(6));
    } else {
      updateSwapState('toAmount', '');
    }
  };

  const handleToAmountChange = (amount: string) => {
    updateSwapState('toAmount', amount);
    // Calculate from amount based on price
    if (amount && !isNaN(parseFloat(amount))) {
      const toValue = parseFloat(amount) * swapState.toToken.price;
      const fromAmount = toValue / swapState.fromToken.price;
      updateSwapState('fromAmount', fromAmount.toFixed(6));
    } else {
      updateSwapState('fromAmount', '');
    }
  };

  const handleTokenSelect = (token: Token, type: 'from' | 'to') => {
    if (type === 'from') {
      updateSwapState('fromToken', token);
    } else {
      updateSwapState('toToken', token);
    }
    setShowTokenSelector(null);
  };

  const handleSwapTokens = () => {
    const tempFrom = swapState.fromToken;
    const tempFromAmount = swapState.fromAmount;
    
    updateSwapState('fromToken', swapState.toToken);
    updateSwapState('toToken', tempFrom);
    updateSwapState('fromAmount', swapState.toAmount);
    updateSwapState('toAmount', tempFromAmount);
  };

  const handleSwap = () => {
    if (!swapState.fromAmount || !swapState.toAmount) {
      Alert.alert('Error', 'Please enter amounts to swap');
      return;
    }

    if (parseFloat(swapState.fromAmount) > swapState.fromToken.balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    // Here you would integrate with Solana Token-2022 swap
    Alert.alert(
      'Confirm Swap',
      `Swap ${swapState.fromAmount} ${swapState.fromToken.symbol} for ${swapState.toAmount} ${swapState.toToken.symbol}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Swap', 
          onPress: () => {
            console.log('Executing swap:', swapState);
            Alert.alert('Success', 'Swap executed successfully!');
          }
        }
      ]
    );
  };

  const handleAmountInputPress = (type: 'from' | 'to') => {
    setKeyboardVisible(type);
  };

  const handleKeyboardChange = (val: string) => {
    if (keyboardVisible === 'from') {
      handleFromAmountChange(val);
    } else if (keyboardVisible === 'to') {
      handleToAmountChange(val);
    }
  };

  const handleKeyboardMax = () => {
    if (keyboardVisible === 'from') {
      handleFromAmountChange(swapState.fromToken.balance.toString());
    } else if (keyboardVisible === 'to') {
      handleToAmountChange(swapState.toToken.balance.toString());
    }
  };

  const handleKeyboardDone = () => {
    setKeyboardVisible(null);
  };

  useEffect(() => {
    const fetchJupiterQuote = async () => {
      if (!swapState.fromAmount || isNaN(Number(swapState.fromAmount))) return;
      try {
        // Jupiter API expects amount in smallest units (lamports, decimals)
        const inputMint = swapState.fromToken.address;
        const outputMint = swapState.toToken.address;
        const amount = Math.floor(Number(swapState.fromAmount) * Math.pow(10, 9)); // assuming 9 decimals
        const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=100`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
          console.log('Best Jupiter quote:', data.data[0]);
        } else {
          console.log('No quote found');
        }
      } catch (e) {
        console.error('Jupiter API quote error:', e);
      }
    };
    fetchJupiterQuote();
    // Only refetch when fromAmount, fromToken, or toToken changes
  }, [swapState.fromAmount, swapState.fromToken, swapState.toToken]);

  const renderTokenSelector = () => (
    <View style={styles.tokenSelectorOverlay}>
      <View style={styles.tokenSelectorModal}>
        <View style={styles.tokenSelectorHeader}>
          <Text style={styles.tokenSelectorTitle}>Select Token</Text>
          <TouchableOpacity onPress={() => setShowTokenSelector(null)}>
            <AppIcon name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.tokenList}>
          {popularTokens.map((token) => (
            <TouchableOpacity
              key={token.address}
              style={styles.tokenItem}
              onPress={() => handleTokenSelect(token, showTokenSelector!)}
            >
              <View style={styles.tokenInfo}>
                <TokenLogo symbol={token.symbol} size={32} />
                <View style={styles.tokenDetails}>
                  <Text style={styles.tokenSymbol}>{token.symbol}</Text>
                  <Text style={styles.tokenName}>{token.name}</Text>
                </View>
              </View>
              <View style={styles.tokenBalance}>
                <Text style={styles.balanceText}>{token.balance.toLocaleString()}</Text>
                <Text style={styles.balanceLabel}>{token.symbol}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderSwapCard = () => (
    <Card style={styles.swapCard}>
      {/* From Token */}
      <View style={styles.tokenInputContainer}>
        <View style={styles.tokenInputHeader}>
          <Text style={styles.inputLabel}>From</Text>
          <Text style={styles.balanceText}>
            Balance: {swapState.fromToken.balance.toLocaleString()} {swapState.fromToken.symbol}
          </Text>
        </View>
        <View style={styles.tokenInputRow}>
          <TouchableOpacity 
            style={styles.tokenSelector}
            onPress={() => setShowTokenSelector('from')}
          >
            <TokenLogo symbol={swapState.fromToken.symbol} size={32} />
            <Text style={styles.tokenSymbol}>{swapState.fromToken.symbol}</Text>
            <AppIcon name="chevron-down" size={16} color="rgba(255, 255, 255, 0.6)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.amountInput} onPress={() => handleAmountInputPress('from')} activeOpacity={0.8}>
            <Text style={styles.amountTextInput}>
              {swapState.fromAmount || <Text style={{ color: 'rgba(255,255,255,0.4)', fontFamily: FONTS.bold, fontWeight: FONT_WEIGHTS.bold }}>0.0</Text>}
            </Text>
            <Text style={styles.usdValue}>
              ${swapState.fromAmount ? (parseFloat(swapState.fromAmount) * swapState.fromToken.price).toFixed(2) : '0.00'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Swap Button */}
      <TouchableOpacity style={styles.swapButton} onPress={handleSwapTokens}>
        <AppIcon name="swap" size={20} color="#fff" />
      </TouchableOpacity>
      {/* To Token */}
      <View style={styles.tokenInputContainer}>
        <View style={styles.tokenInputHeader}>
          <Text style={styles.inputLabel}>To</Text>
          <Text style={styles.balanceText}>
            Balance: {swapState.toToken.balance.toLocaleString()} {swapState.toToken.symbol}
          </Text>
        </View>
        <View style={styles.tokenInputRow}>
          <TouchableOpacity 
            style={styles.tokenSelector}
            onPress={() => setShowTokenSelector('to')}
          >
            <TokenLogo symbol={swapState.toToken.symbol} size={32} />
            <Text style={styles.tokenSymbol}>{swapState.toToken.symbol}</Text>
            <AppIcon name="chevron-down" size={16} color="rgba(255, 255, 255, 0.6)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.amountInput} onPress={() => handleAmountInputPress('to')} activeOpacity={0.8}>
            <Text style={styles.amountTextInput}>
              {swapState.toAmount || <Text style={{ color: 'rgba(255,255,255,0.4)', fontFamily: FONTS.bold, fontWeight: FONT_WEIGHTS.bold }}>0.0</Text>}
            </Text>
            <Text style={styles.usdValue}>
              ${swapState.toAmount ? (parseFloat(swapState.toAmount) * swapState.toToken.price).toFixed(2) : '0.00'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  const renderSwapDetails = () => (
    <Card style={styles.detailsCard}>
      <View style={styles.detailsHeader}>
        <Text style={styles.detailsTitle}>Swap Details</Text>
        <TouchableOpacity onPress={() => setShowSettings(!showSettings)}>
          <AppIcon name="settings" size={20} color="rgba(255, 255, 255, 0.6)" />
        </TouchableOpacity>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Rate</Text>
        <Text style={styles.detailValue}>
          1 {swapState.fromToken.symbol} = {(swapState.toToken.price / swapState.fromToken.price).toFixed(6)} {swapState.toToken.symbol}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Price Impact</Text>
        <Text style={[
          styles.detailValue,
          swapState.priceImpact > 2 ? styles.highImpact : styles.lowImpact
        ]}>
          {swapState.priceImpact}%
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Network Fee</Text>
        <Text style={styles.detailValue}>{swapState.gasEstimate} SOL</Text>
      </View>

      {showSettings && (
        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>Slippage Tolerance</Text>
          <View style={styles.slippageOptions}>
            {slippageOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.slippageOption,
                  swapState.slippage === option && styles.selectedSlippageOption
                ]}
                onPress={() => updateSwapState('slippage', option)}
              >
                <Text style={[
                  styles.slippageOptionText,
                  swapState.slippage === option && styles.selectedSlippageOptionText
                ]}>
                  {option}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </Card>
  );



  return (
    <View style={styles.container}>
      <Header title="Swap" subtitle="Trade Token-2022 tokens" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Swap Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Swap Tokens</Text>
          <TouchableOpacity onPress={() => setInfoModal({visible: true, text: 'Swap lets you exchange one token for another instantly using the best available liquidity pool.'})}>
            <AppIcon name="info" size={18} color="#667eea" />
          </TouchableOpacity>
        </View>
        {renderSwapCard()}
        {renderSwapDetails()}

          {/* Swap Button */}
        <View style={styles.swapButtonContainer}>
          <Button
            title="Swap"
            onPress={handleSwap}
            size="large"
            disabled={!swapState.fromAmount || !swapState.toAmount}
          />
          </View>
      </ScrollView>

      {showTokenSelector && renderTokenSelector()}
      {/* Custom Keyboard Modal */}
      {keyboardVisible && (
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 100 }}>
          <CustomKeyboard
            value={keyboardVisible === 'from' ? swapState.fromAmount : swapState.toAmount}
            onChange={handleKeyboardChange}
            onMax={handleKeyboardMax}
            onDone={handleKeyboardDone}
            showMax={true}
            showDone={true}
          />
        </View>
      )}
      {/* Info Modal */}
      <Modal visible={infoModal.visible} transparent animationType="fade">
        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.7)',justifyContent:'center',alignItems:'center'}}>
          <View style={{backgroundColor:'#181818',padding:24,borderRadius:16,maxWidth:320}}>
            <Text style={{color:'#fff',fontSize:16,marginBottom:12}}>{infoModal.text}</Text>
            <TouchableOpacity onPress={()=>setInfoModal({visible:false,text:''})} style={{alignSelf:'flex-end',marginTop:8}}>
              <Text style={{color:'#667eea',fontWeight:'bold'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 100,
  },
  swapCard: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 20,
  },
  tokenInputContainer: {
    marginBottom: 16,
  },
  tokenInputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  balanceText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  tokenInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
  },
  tokenSymbol: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  amountInput: {
    flex: 1,
    alignItems: 'flex-end',
  },
  amountTextInput: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'right',
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
    minWidth: 100,
  },
  usdValue: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginTop: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  swapButton: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  detailsCard: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailsTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  lowImpact: {
    color: '#51cf66',
  },
  highImpact: {
    color: '#ff6b6b',
  },
  settingsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingsTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  slippageOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  slippageOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  selectedSlippageOption: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  slippageOptionText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  selectedSlippageOptionText: {
    color: '#fff',
  },

  swapButtonContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  tokenSelectorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  tokenSelectorModal: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  tokenSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tokenSelectorTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  tokenList: {
    maxHeight: 400,
  },
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tokenDetails: {
    gap: 2,
  },
  tokenName: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  tokenBalance: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
}); 