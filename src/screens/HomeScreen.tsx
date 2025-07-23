import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { AppIcon } from '../components/AppIcon';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

interface TokenData {
  id: string;
  name: string;
  symbol: string;
  price: string;
  priceChange24h: string;
  priceChangePercent24h: string;
  volume24h: string;
  liquidity: string;
  marketCap: string;
  fdv: string;
  pairAddress: string;
  dexId: string;
  chainId: string;
  url: string;
  pairCreatedAt: string;
  liquidityUsd: string;
  txns: {
    h24: {
      buys: number;
      sells: number;
    };
    h6: {
      buys: number;
      sells: number;
    };
    h1: {
      buys: number;
      sells: number;
    };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
}

export const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
  const [infoModal, setInfoModal] = useState<{visible: boolean, text: string}>({visible: false, text: ''});

  // Mock data for trending tokens
  const trendingTokens: TokenData[] = [
    {
      id: '1',
      name: 'Bonk',
      symbol: 'BONK',
      price: '$0.00001234',
      priceChange24h: '+0.00000123',
      priceChangePercent24h: '+11.08%',
      volume24h: '$2,456,789',
      liquidity: '$1,234,567',
      marketCap: '$12,345,678',
      fdv: '$12,345,678',
      pairAddress: '0x1234...5678',
      dexId: 'raydium',
      chainId: 'solana',
      url: 'https://raydium.io/swap/?inputCurrency=sol&outputCurrency=0x1234...5678',
      pairCreatedAt: '2024-01-15T10:30:00Z',
      liquidityUsd: '$1,234,567',
      txns: {
        h24: { buys: 1234, sells: 567 },
        h6: { buys: 234, sells: 123 },
        h1: { buys: 45, sells: 23 }
      },
      volume: {
        h24: 2456789,
        h6: 456789,
        h1: 123456
      },
      priceChange: {
        m5: 2.5,
        h1: 5.2,
        h6: 8.7,
        h24: 11.08
      }
    },
    {
      id: '2',
      name: 'Jupiter',
      symbol: 'JUP',
      price: '$0.5678',
      priceChange24h: '+0.0234',
      priceChangePercent24h: '+4.31%',
      volume24h: '$1,234,567',
      liquidity: '$2,345,678',
      marketCap: '$89,123,456',
      fdv: '$89,123,456',
      pairAddress: '0x2345...6789',
      dexId: 'raydium',
      chainId: 'solana',
      url: 'https://raydium.io/swap/?inputCurrency=sol&outputCurrency=0x2345...6789',
      pairCreatedAt: '2024-01-10T15:45:00Z',
      liquidityUsd: '$2,345,678',
      txns: {
        h24: { buys: 2345, sells: 1234 },
        h6: { buys: 456, sells: 234 },
        h1: { buys: 89, sells: 45 }
      },
      volume: {
        h24: 1234567,
        h6: 234567,
        h1: 67890
      },
      priceChange: {
        m5: 1.2,
        h1: 2.8,
        h6: 3.9,
        h24: 4.31
      }
    },
    {
      id: '3',
      name: 'Raydium',
      symbol: 'RAY',
      price: '$1.2345',
      priceChange24h: '-0.0567',
      priceChangePercent24h: '-4.39%',
      volume24h: '$3,456,789',
      liquidity: '$4,567,890',
      marketCap: '$234,567,890',
      fdv: '$234,567,890',
      pairAddress: '0x3456...7890',
      dexId: 'raydium',
      chainId: 'solana',
      url: 'https://raydium.io/swap/?inputCurrency=sol&outputCurrency=0x3456...7890',
      pairCreatedAt: '2024-01-05T09:15:00Z',
      liquidityUsd: '$4,567,890',
      txns: {
        h24: { buys: 3456, sells: 2345 },
        h6: { buys: 678, sells: 456 },
        h1: { buys: 123, sells: 78 }
      },
      volume: {
        h24: 3456789,
        h6: 567890,
        h1: 123456
      },
      priceChange: {
        m5: -0.8,
        h1: -2.1,
        h6: -3.4,
        h24: -4.39
      }
    }
  ];

  const filters = [
    { key: 'trending', label: 'Trending' },
    { key: 'gainers', label: 'Top Gainers' },
    { key: 'losers', label: 'Top Losers' },
    { key: 'volume', label: 'High Volume' },
    { key: 'liquidity', label: 'High Liquidity' },
  ];

  const timeframes = [
    { key: '5m', label: '5m' },
    { key: '1h', label: '1h' },
    { key: '6h', label: '6h' },
    { key: '24h', label: '24h' },
  ];

  // Market sentiment calculation (mock data)
  const marketSentiment = {
    isBullish: true, // true for bullish, false for bearish
    totalMarketCap: '$2.4B',
    totalVolume: '$156M',
    activePairs: '1,234',
    marketChange: '+5.2%',
    volumeChange: '+12.8%'
  };

  // Filtering logic for tokens
  const getFilteredTokens = () => {
    switch (selectedFilter) {
      case 'gainers':
        return trendingTokens.filter(t => parseFloat(t.priceChangePercent24h) > 0).sort((a, b) => parseFloat(b.priceChangePercent24h) - parseFloat(a.priceChangePercent24h));
      case 'losers':
        return trendingTokens.filter(t => parseFloat(t.priceChangePercent24h) < 0).sort((a, b) => parseFloat(a.priceChangePercent24h) - parseFloat(b.priceChangePercent24h));
      case 'volume':
        return trendingTokens.slice().sort((a, b) => parseFloat(b.volume24h.replace(/[$,]/g, '')) - parseFloat(a.volume24h.replace(/[$,]/g, '')));
      case 'liquidity':
        return trendingTokens.slice().sort((a, b) => parseFloat(b.liquidity.replace(/[$,]/g, '')) - parseFloat(a.liquidity.replace(/[$,]/g, '')));
      case 'trending':
      default:
        return trendingTokens;
    }
  };

  const renderTokenItem = ({ item }: { item: TokenData }) => {
    const isPositive = item.priceChangePercent24h.startsWith('+');
    return (
      <TouchableOpacity style={styles.tokenItem} onPress={() => setSelectedToken(item)}>
        <View style={styles.tokenHeader}>
          <View style={styles.tokenInfo}>
            <Text style={styles.tokenName}>{item.name}</Text>
            <Text style={styles.tokenSymbol}>{item.symbol}</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.tokenPrice}>{item.price}</Text>
            <Text style={[
              styles.priceChange,
              isPositive ? styles.positiveChange : styles.negativeChange
            ]}>
              {item.priceChangePercent24h}
            </Text>
          </View>
        </View>
        <View style={styles.tokenDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Volume 24h</Text>
            <Text style={styles.detailValue}>{item.volume24h}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Liquidity</Text>
            <Text style={styles.detailValue}>{item.liquidity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Market Cap</Text>
            <Text style={styles.detailValue}>{item.marketCap}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (selectedToken) {
    // Render the trading chart and details for the selected token
    return (
      <View style={styles.container}>
        <Header title={`${selectedToken.symbol}/USDT`} subtitle="Trading Chart" showBack={true} onBack={() => setSelectedToken(null)} />
        {/* You can add your chart and trading details here, e.g. TradingViewChart or similar */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18 }}>[Trading chart and details for {selectedToken.name}]</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="DEX Screener" subtitle="Solana Token-2022 Analytics" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Balance Card */}
        <Card style={{ marginTop: 20, marginHorizontal: 16 }}>
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: FONTS.bold, fontWeight: FONT_WEIGHTS.bold, marginBottom: 12 }}>Wallet Balance</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: '#fff', fontSize: 28, fontFamily: FONTS.bold, fontWeight: FONT_WEIGHTS.bold }}>$12,450.67</Text>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontFamily: FONTS.medium, fontWeight: FONT_WEIGHTS.medium }}>Solana Mainnet</Text>
            </View>
            <AppIcon name="wallet" size={32} color="#fff" />
          </View>
        </Card>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <AppIcon name="search" size={20} color="rgba(255, 255, 255, 0.6)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by token name or address..."
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <AppIcon name="close" size={20} color="rgba(255, 255, 255, 0.6)" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.activeFilterButton
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.activeFilterText
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Timeframe Selector */}
        <View style={styles.timeframeContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeframeScroll}
          >
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe.key}
                style={[
                  styles.timeframeButton,
                  selectedTimeframe === timeframe.key && styles.activeTimeframeButton
                ]}
                onPress={() => setSelectedTimeframe(timeframe.key)}
              >
                <Text style={[
                  styles.timeframeText,
                  selectedTimeframe === timeframe.key && styles.activeTimeframeText
                ]}>
                  {timeframe.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Tokens */}
        <Card style={styles.tokensCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedFilter === 'trending' && 'Trending Tokens'}
              {selectedFilter === 'gainers' && 'Top Gainers'}
              {selectedFilter === 'losers' && 'Top Losers'}
              {selectedFilter === 'volume' && 'High Volume'}
              {selectedFilter === 'liquidity' && 'High Liquidity'}
            </Text>
            <TouchableOpacity onPress={() => setInfoModal({visible: true, text: 'Trending Tokens are the most actively traded tokens on Solana right now, based on volume and price movement.'})}>
              <AppIcon name="info" size={18} color="#667eea" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={getFilteredTokens()}
            renderItem={renderTokenItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </Card>
      </ScrollView>
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
  marketOverviewContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  bullishGlow: {
    backgroundColor: 'rgba(81, 207, 102, 0.15)',
    borderColor: 'rgba(81, 207, 102, 0.3)',
    shadowColor: '#51cf66',
  },
  bearishGlow: {
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderColor: 'rgba(255, 107, 107, 0.3)',
    shadowColor: '#ff6b6b',
  },
  marketOverviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  marketOverviewTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  sentimentIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  bullishIndicator: {
    backgroundColor: 'rgba(81, 207, 102, 0.3)',
  },
  bearishIndicator: {
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
  },
  sentimentText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  marketStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marketStat: {
    alignItems: 'center',
    flex: 1,
  },
  marketStatLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  marketStatValue: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  marketStatChange: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  searchContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  filtersContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  filtersScroll: {
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  activeFilterText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  timeframeContainer: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  timeframeScroll: {
    paddingRight: 16,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 6,
  },
  activeTimeframeButton: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  timeframeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  activeTimeframeText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tokensCard: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  viewAllText: {
    color: '#667eea',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tokenItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tokenInfo: {
    flex: 1,
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
  priceInfo: {
    alignItems: 'flex-end',
  },
  tokenPrice: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  priceChange: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  positiveChange: {
    color: '#51cf66',
  },
  negativeChange: {
    color: '#ff6b6b',
  },
  tokenDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  detailValue: {
    color: '#fff',
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tokenActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
}); 