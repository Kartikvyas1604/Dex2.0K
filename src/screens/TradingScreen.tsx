import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Modal, TextInput, Alert } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TokenLogo } from '../components/TokenLogo';
import { TradingViewChart } from '../components/TradingViewChart';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';
import { AppIcon } from '../components/AppIcon';
import { getTokenPrice } from '../utils/coinmarketcap';
import Loader from '../components/Loader';

const { width } = Dimensions.get('window');

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change24h: string;
  volume24h: string;
  marketCap: string;
  logo?: string;
  isPositive: boolean;
}

export const TradingScreen: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [selectedInterval, setSelectedInterval] = useState('5');
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [orderAmount, setOrderAmount] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [priceError, setPriceError] = useState('');
  const [tokenDetails, setTokenDetails] = useState<{[symbol:string]:{price:number, volume:number, marketCap:number}} >({});

  const recentTokens: Token[] = [
    {
      id: '1',
      name: 'Solana',
      symbol: 'SOL',
      price: '$98.45',
      change24h: '+12.5%',
      volume24h: '$2.4B',
      marketCap: '$42.8B',
      isPositive: true,
    },
    {
      id: '2',
      name: 'PumpFun',
      symbol: 'PUMP',
      price: '$0.0234',
      change24h: '+45.2%',
      volume24h: '$156M',
      marketCap: '$89M',
      isPositive: true,
    },
    {
      id: '3',
      name: 'Raydium',
      symbol: 'RAY',
      price: '$1.23',
      change24h: '-3.2%',
      volume24h: '$89M',
      marketCap: '$320M',
      isPositive: false,
    },
    {
      id: '4',
      name: 'TokenMill',
      symbol: 'TKN',
      price: '$0.0045',
      change24h: '+67.8%',
      volume24h: '$234M',
      marketCap: '$156M',
      isPositive: true,
    },
    {
      id: '5',
      name: 'Meteora',
      symbol: 'MET',
      price: '$0.89',
      change24h: '+23.1%',
      volume24h: '$445M',
      marketCap: '$567M',
      isPositive: true,
    },
    {
      id: '6',
      name: 'Jupiter',
      symbol: 'JUP',
      price: '$0.67',
      change24h: '-8.9%',
      volume24h: '$123M',
      marketCap: '$890M',
      isPositive: false,
    },
  ];

  const intervals = [
    { value: '1', label: '1m' },
    { value: '5', label: '5m' },
    { value: '15', label: '15m' },
    { value: '60', label: '1h' },
    { value: '240', label: '4h' },
    { value: '1D', label: '1d' },
    { value: '1W', label: '1w' },
  ];

  useEffect(() => {
    let isMounted = true;
    async function fetchAllDetails() {
      setPriceError('');
      try {
        const details: {[symbol:string]:{price:number, volume:number, marketCap:number}} = {};
        const results = await Promise.all(recentTokens.map(async (token) => {
          try {
            const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${token.symbol}`;
            const res = await fetch(url, {
              headers: {
                'X-CMC_PRO_API_KEY': require('../config').COINMARKETCAP_API_KEY,
              },
            });
            const data = await res.json();
            if (data.status && data.status.error_code === 0) {
              const d = data.data[token.symbol].quote.USD;
              return { symbol: token.symbol, price: d.price, volume: d.volume_24h, marketCap: d.market_cap };
            }
          } catch {}
          return { symbol: token.symbol, price: null, volume: null, marketCap: null };
        }));
        results.forEach(({symbol, price, volume, marketCap}) => {
          if (price !== null) details[symbol] = { price, volume, marketCap };
        });
        if (isMounted) setTokenDetails(details);
        if (results.every(r => r.price === null)) {
          setPriceError('Failed to fetch token data');
        }
      } catch (e) {
        setPriceError('Failed to fetch token data');
      }
    }
    fetchAllDetails();
    return () => { isMounted = false; };
  }, [recentTokens.map(t=>t.symbol).join(',')]);

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
  };

  const handleBackToTokens = () => {
    setSelectedToken(null);
  };

  const handleOrderPress = (type: 'buy' | 'sell') => {
    setOrderType(type);
    setOrderAmount('');
    setOrderPrice(selectedToken?.price.replace('$', '') || '');
    setOrderModalVisible(true);
  };

  const handlePlaceOrder = () => {
    if (!orderAmount || !orderPrice) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const details = {
      type: orderType,
      token: selectedToken,
      amount: orderAmount,
      price: orderPrice,
      total: (parseFloat(orderAmount) * parseFloat(orderPrice)).toFixed(2),
      timestamp: new Date().toLocaleString(),
    };

    setOrderDetails(details);
    setOrderModalVisible(false);
    setConfirmModalVisible(true);
  };

  const handleConfirmOrder = () => {
    // Here you would typically send the order to your backend
    console.log('Order placed:', orderDetails);
    setConfirmModalVisible(false);
    setOrderDetails(null);
    
    // Show success message
    Alert.alert(
      'Order Placed Successfully!',
      `${orderDetails?.type.toUpperCase()} order for ${orderDetails?.amount} ${orderDetails?.token?.symbol} has been placed.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleCancelOrder = () => {
    setConfirmModalVisible(false);
    setOrderDetails(null);
  };

  const TokenCard: React.FC<{ token: Token }> = ({ token }) => (
    <TouchableOpacity 
      style={styles.tokenCard}
      onPress={() => handleTokenSelect(token)}
    >
      <View style={styles.tokenHeader}>
        <View style={styles.tokenInfo}>
          <TokenLogo symbol={token.symbol} size={40} />
          <View style={styles.tokenDetails}>
            <Text style={styles.tokenName}>{token.name}</Text>
            <Text style={styles.tokenSymbol}>{token.symbol}</Text>
          </View>
        </View>
        <View style={styles.tokenPrice}>
          <Text style={styles.priceText}>{tokenDetails[token.symbol]?.price || token.price}</Text>
          <Text style={[
            styles.changeText,
            { color: token.isPositive ? '#51cf66' : '#ff6b6b' }
          ]}>
            {token.change24h}
          </Text>
        </View>
      </View>
      <View style={styles.tokenStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Volume 24h</Text>
          <Text style={styles.statValue}>{tokenDetails[token.symbol]?.volume || token.volume24h}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Market Cap</Text>
          <Text style={styles.statValue}>{tokenDetails[token.symbol]?.marketCap || token.marketCap}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (selectedToken) {
    return (
      <View style={styles.container}>
                 <Header 
           title={`${selectedToken.symbol}/USDT`} 
           showBack={true}
           onBack={handleBackToTokens}
         />
        
        {/* Timeline Buttons */}
        <View style={styles.timelineContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timelineScroll}
          >
            {intervals.map((interval) => (
              <TouchableOpacity
                key={interval.value}
                style={[
                  styles.timelineButton,
                  selectedInterval === interval.value && styles.timelineButtonActive
                ]}
                onPress={() => setSelectedInterval(interval.value)}
              >
                <Text style={[
                  styles.timelineText,
                  selectedInterval === interval.value && styles.timelineTextActive
                ]}>
                  {interval.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trading Chart */}
        <View style={styles.chartContainer}>
          <TradingViewChart
            symbol={`CRYPTOCAP:${selectedToken.symbol}`}
            interval={selectedInterval}
            theme="dark"
          />
        </View>

        {/* Trading Form */}
        <Card style={styles.tradingForm}>
          <Text style={styles.formTitle}>Trade {selectedToken.symbol}</Text>
          <View style={styles.formRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Amount</Text>
              <Text style={styles.inputValue}>0.00</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <Text style={styles.inputValue}>{selectedToken.price}</Text>
            </View>
          </View>
                     <View style={styles.buttonRow}>
             <Button
               title="Buy"
               onPress={() => handleOrderPress('buy')}
               variant="primary"
               size="medium"
               style={[styles.tradeButton, styles.buyButton] as any}
             />
             <Button
               title="Sell"
               onPress={() => handleOrderPress('sell')}
               variant="outline"
               size="medium"
               style={[styles.tradeButton, styles.sellButton] as any}
             />
           </View>
                 </Card>

         {/* Order Modal */}
         <Modal
           visible={orderModalVisible}
           transparent={true}
           animationType="slide"
           onRequestClose={() => setOrderModalVisible(false)}
         >
           <View style={styles.modalOverlay}>
             <View style={styles.modalContent}>
               <View style={styles.modalHeader}>
                 <Text style={styles.modalTitle}>
                   {orderType.toUpperCase()} {selectedToken?.symbol}
                 </Text>
                 <TouchableOpacity 
                   onPress={() => setOrderModalVisible(false)}
                   style={styles.closeButton}
                 >
                   <Text style={styles.closeButtonText}>×</Text>
                 </TouchableOpacity>
               </View>

               <View style={styles.inputGroup}>
                 <Text style={styles.inputLabel}>Amount ({selectedToken?.symbol})</Text>
                 <TextInput
                   style={styles.textInput}
                   placeholder="0.00"
                   placeholderTextColor="rgba(255, 255, 255, 0.4)"
                   value={orderAmount}
                   onChangeText={setOrderAmount}
                   keyboardType="numeric"
                 />
               </View>

               <View style={styles.inputGroup}>
                 <Text style={styles.inputLabel}>Price (USD)</Text>
                 <TextInput
                   style={styles.textInput}
                   placeholder="0.00"
                   placeholderTextColor="rgba(255, 255, 255, 0.4)"
                   value={orderPrice}
                   onChangeText={setOrderPrice}
                   keyboardType="numeric"
                 />
               </View>

               <View style={styles.orderSummary}>
                 <View style={styles.summaryRow}>
                   <Text style={styles.summaryLabel}>Total Value</Text>
                   <Text style={styles.summaryValue}>
                     ${orderAmount && orderPrice ? (parseFloat(orderAmount) * parseFloat(orderPrice)).toFixed(2) : '0.00'}
                   </Text>
                 </View>
                 <View style={styles.summaryRow}>
                   <Text style={styles.summaryLabel}>Network Fee</Text>
                   <Text style={styles.summaryValue}>~0.001 SOL</Text>
                 </View>
               </View>

               <View style={styles.modalButtons}>
                 <Button
                   title="Cancel"
                   onPress={() => setOrderModalVisible(false)}
                   variant="outline"
                   size="medium"
                   style={styles.modalButton}
                 />
                 <Button
                   title={`Place ${orderType.toUpperCase()} Order`}
                   onPress={handlePlaceOrder}
                   variant="primary"
                   size="medium"
                   style={[
                     styles.modalButton,
                     orderType === 'buy' ? styles.buyModalButton : styles.sellModalButton
                   ] as any}
                 />
               </View>
             </View>
           </View>
         </Modal>

         {/* Confirmation Modal */}
         <Modal
           visible={confirmModalVisible}
           transparent={true}
           animationType="fade"
           onRequestClose={handleCancelOrder}
         >
           <View style={styles.modalOverlay}>
             <View style={styles.confirmModalContent}>
               <View style={styles.confirmHeader}>
                 <View style={[
                   styles.confirmIcon,
                   orderDetails?.type === 'buy' ? styles.buyIcon : styles.sellIcon
                 ]}>
                   <Text style={styles.confirmIconText}>
                     {orderDetails?.type === 'buy' ? '↑' : '↓'}
                   </Text>
                 </View>
                 <Text style={styles.confirmTitle}>
                   Confirm {orderDetails?.type?.toUpperCase()} Order
                 </Text>
               </View>

               <View style={styles.confirmDetails}>
                 <View style={styles.confirmRow}>
                   <Text style={styles.confirmLabel}>Token</Text>
                   <Text style={styles.confirmValue}>{orderDetails?.token?.symbol}</Text>
                 </View>
                 <View style={styles.confirmRow}>
                   <Text style={styles.confirmLabel}>Amount</Text>
                   <Text style={styles.confirmValue}>{orderDetails?.amount} {orderDetails?.token?.symbol}</Text>
                 </View>
                 <View style={styles.confirmRow}>
                   <Text style={styles.confirmLabel}>Price</Text>
                   <Text style={styles.confirmValue}>${orderDetails?.price}</Text>
                 </View>
                 <View style={styles.confirmRow}>
                   <Text style={styles.confirmLabel}>Total</Text>
                   <Text style={styles.confirmValue}>${orderDetails?.total}</Text>
                 </View>
                 <View style={styles.confirmRow}>
                   <Text style={styles.confirmLabel}>Time</Text>
                   <Text style={styles.confirmValue}>{orderDetails?.timestamp}</Text>
                 </View>
               </View>

               <View style={styles.confirmButtons}>
                 <Button
                   title="Cancel"
                   onPress={handleCancelOrder}
                   variant="outline"
                   size="medium"
                   style={styles.confirmButton}
                 />
                 <Button
                   title="Confirm Order"
                   onPress={handleConfirmOrder}
                   variant="primary"
                   size="medium"
                   style={[
                     styles.confirmButton,
                     orderDetails?.type === 'buy' ? styles.buyConfirmButton : styles.sellConfirmButton
                   ] as any}
                 />
               </View>
             </View>
           </View>
         </Modal>
       </View>
     );
   }

  return (
    <View style={styles.container}>
      <Header title="Trading" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Market Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$2.4T</Text>
              <Text style={styles.statLabel}>Total Market Cap</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$89.2B</Text>
              <Text style={styles.statLabel}>24h Volume</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>+5.2%</Text>
              <Text style={styles.statLabel}>Market Change</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.tokensCard}>
          <Text style={styles.tokensTitle}>Recent Launched Tokens</Text>
          {priceError ? <Text style={{color:'#ff6b6b',textAlign:'center'}}>{priceError}</Text> : null}
          {recentTokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
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
    paddingBottom: 100,
  },
  statsCard: {
    marginTop: 20,
  },
  statsTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  tokensCard: {
    marginTop: 16,
  },
  tokensTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  tokenCard: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenDetails: {
    marginLeft: 12,
  },
  tokenName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tokenSymbol: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  tokenPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  changeText: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tokenStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineContainer: {
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  timelineScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  timelineButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  timelineButtonActive: {
    backgroundColor: '#667eea',
  },
  timelineText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  timelineTextActive: {
    color: '#fff',
  },
  chartContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  tradingForm: {
    margin: 16,
    marginTop: 0,
  },
  formTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  inputValue: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tradeButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  buyButton: {
    backgroundColor: '#51cf66',
  },
  sellButton: {
    borderColor: '#ff6b6b',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  inputGroup: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  orderSummary: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
  buyModalButton: {
    backgroundColor: '#51cf66',
  },
  sellModalButton: {
    backgroundColor: '#ff6b6b',
  },
  // Confirmation Modal Styles
  confirmModalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  confirmHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buyIcon: {
    backgroundColor: 'rgba(81, 207, 102, 0.2)',
    borderWidth: 2,
    borderColor: '#51cf66',
  },
  sellIcon: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  confirmIconText: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  confirmTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  confirmDetails: {
    marginBottom: 24,
  },
  confirmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  confirmLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  confirmValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
  },
  buyConfirmButton: {
    backgroundColor: '#51cf66',
  },
  sellConfirmButton: {
    backgroundColor: '#ff6b6b',
  },
}); 