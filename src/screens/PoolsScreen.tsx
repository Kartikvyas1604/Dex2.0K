import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { TokenLogo } from '../components/TokenLogo';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

interface TradingPair {
  id: string;
  token0: {
    symbol: string;
    name: string;
    logo: string;
    address: string;
  };
  token1: {
    symbol: string;
    name: string;
    logo: string;
    address: string;
  };
  price: string;
  priceChange24h: string;
  priceChangePercent24h: string;
  volume24h: string;
  liquidity: string;
  marketCap: string;
  dexId: string;
  pairAddress: string;
  createdAt: string;
  txns: {
    h24: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h1: { buys: number; sells: number };
  };
}

export const PoolsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDex, setSelectedDex] = useState('all');
  const [infoModal, setInfoModal] = useState({ visible: false, text: '' });

  const tradingPairs: TradingPair[] = [
    {
      id: '1',
      token0: { symbol: 'BONK', name: 'Bonk', logo: 'bonk', address: '0x1234...5678' },
      token1: { symbol: 'SOL', name: 'Solana', logo: 'solana', address: '0x2345...6789' },
      price: '$0.00001234',
      priceChange24h: '+0.00000123',
      priceChangePercent24h: '+11.08%',
      volume24h: '$2,456,789',
      liquidity: '$1,234,567',
      marketCap: '$12,345,678',
      dexId: 'raydium',
      pairAddress: '0x3456...7890',
      createdAt: '2024-01-15T10:30:00Z',
      txns: {
        h24: { buys: 1234, sells: 567 },
        h6: { buys: 234, sells: 123 },
        h1: { buys: 45, sells: 23 }
      }
    },
    {
      id: '2',
      token0: { symbol: 'JUP', name: 'Jupiter', logo: 'jupiter', address: '0x4567...8901' },
      token1: { symbol: 'SOL', name: 'Solana', logo: 'solana', address: '0x2345...6789' },
      price: '$0.5678',
      priceChange24h: '+0.0234',
      priceChangePercent24h: '+4.31%',
      volume24h: '$1,234,567',
      liquidity: '$2,345,678',
      marketCap: '$89,123,456',
      dexId: 'raydium',
      pairAddress: '0x5678...9012',
      createdAt: '2024-01-10T15:45:00Z',
      txns: {
        h24: { buys: 2345, sells: 1234 },
        h6: { buys: 456, sells: 234 },
        h1: { buys: 89, sells: 45 }
      }
    },
    {
      id: '3',
      token0: { symbol: 'RAY', name: 'Raydium', logo: 'raydium', address: '0x6789...0123' },
      token1: { symbol: 'SOL', name: 'Solana', logo: 'solana', address: '0x2345...6789' },
      price: '$1.2345',
      priceChange24h: '-0.0567',
      priceChangePercent24h: '-4.39%',
      volume24h: '$3,456,789',
      liquidity: '$4,567,890',
      marketCap: '$234,567,890',
      dexId: 'orca',
      pairAddress: '0x7890...1234',
      createdAt: '2024-01-05T09:15:00Z',
      txns: {
        h24: { buys: 3456, sells: 2345 },
        h6: { buys: 678, sells: 456 },
        h1: { buys: 123, sells: 78 }
      }
    },
    {
      id: '4',
      token0: { symbol: 'ORCA', name: 'Orca', logo: 'orca', address: '0x8901...2345' },
      token1: { symbol: 'SOL', name: 'Solana', logo: 'solana', address: '0x2345...6789' },
      price: '$3.4567',
      priceChange24h: '+0.0723',
      priceChangePercent24h: '+2.15%',
      volume24h: '$987,654',
      liquidity: '$1,567,890',
      marketCap: '$156,789,012',
      dexId: 'orca',
      pairAddress: '0x9012...3456',
      createdAt: '2024-01-12T14:20:00Z',
      txns: {
        h24: { buys: 987, sells: 654 },
        h6: { buys: 234, sells: 123 },
        h1: { buys: 45, sells: 23 }
      }
    }
  ];

  const filters = [
    { key: 'all', label: 'All Pairs' },
    { key: 'trending', label: 'Trending' },
    { key: 'gainers', label: 'Top Gainers' },
    { key: 'losers', label: 'Top Losers' },
    { key: 'volume', label: 'High Volume' },
    { key: 'liquidity', label: 'High Liquidity' },
  ];

  const dexes = [
    { key: 'all', label: 'All DEXes' },
    { key: 'raydium', label: 'Raydium' },
    { key: 'orca', label: 'Orca' },
    { key: 'jupiter', label: 'Jupiter' },
  ];

  const renderPairItem = ({ item }: { item: TradingPair }) => {
    const isPositive = item.priceChangePercent24h.startsWith('+');
    
    return (
      <TouchableOpacity style={styles.pairItem}>
        <View style={styles.pairHeader}>
          <View style={styles.tokenPair}>
            <View style={styles.tokenLogos}>
              <TokenLogo symbol={item.token0.symbol} size={32} style={styles.tokenLogo} />
              <TokenLogo symbol={item.token1.symbol} size={32} style={[styles.tokenLogo, styles.tokenLogoOverlap]} />
            </View>
            <View style={styles.tokenInfo}>
              <Text style={styles.tokenPairText}>
                {item.token0.symbol}/{item.token1.symbol}
              </Text>
              <Text style={styles.dexName}>{item.dexId.toUpperCase()}</Text>
            </View>
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
        
        <View style={styles.pairDetails}>
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
        
        <View style={styles.pairActions}>
          <TouchableOpacity style={styles.actionButton}>
            <AppIcon name="chart" size={16} color="#fff" />
            <Text style={styles.actionText}>Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <AppIcon name="swap" size={16} color="#fff" />
            <Text style={styles.actionText}>Trade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <AppIcon name="info" size={16} color="#fff" />
            <Text style={styles.actionText}>Info</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Trading Pairs" subtitle="Solana Token-2022 Pairs" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <AppIcon name="search" size={20} color="rgba(255, 255, 255, 0.6)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by token name or pair..."
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

        {/* DEX Filter */}
        <View style={styles.dexContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dexScroll}
          >
            {dexes.map((dex) => (
              <TouchableOpacity
                key={dex.key}
                style={[
                  styles.dexButton,
                  selectedDex === dex.key && styles.activeDexButton
                ]}
                onPress={() => setSelectedDex(dex.key)}
              >
                <Text style={[
                  styles.dexText,
                  selectedDex === dex.key && styles.activeDexText
                ]}>
                  {dex.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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

        {/* Trading Pairs */}
        <Card style={styles.pairsCard}>
          <View style={styles.sectionHeader}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <AppIcon name="pools" size={20} color="#fff" style={{marginRight:8}} />
              <Text style={styles.sectionTitle}>
                {selectedFilter === 'all' && 'All Trading Pairs'}
                {selectedFilter === 'trending' && 'Trending Pairs'}
                {selectedFilter === 'gainers' && 'Top Gainers'}
                {selectedFilter === 'losers' && 'Top Losers'}
                {selectedFilter === 'volume' && 'High Volume'}
                {selectedFilter === 'liquidity' && 'High Liquidity'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setInfoModal({visible: true, text: 'Pools (Trading Pairs) are liquidity pools where you can swap between two tokens, provide liquidity, and earn fees.'})}>
              <AppIcon name="info" size={18} color="#667eea" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={tradingPairs}
            renderItem={renderPairItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </Card>

        {/* Market Stats */}
        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Market Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,234</Text>
              <Text style={styles.statLabel}>Total Pairs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$156M</Text>
              <Text style={styles.statLabel}>24h Volume</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$2.4B</Text>
              <Text style={styles.statLabel}>Total Liquidity</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Active DEXes</Text>
            </View>
          </View>
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
  searchContainer: {
    marginTop: 20,
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
  dexContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  dexScroll: {
    paddingRight: 16,
  },
  dexButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  activeDexButton: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  dexText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  activeDexText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  filtersContainer: {
    marginTop: 12,
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
  pairsCard: {
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
  pairItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  pairHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tokenPair: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tokenLogos: {
    flexDirection: 'row',
    marginRight: 12,
  },
  tokenLogo: {
    borderWidth: 2,
    borderColor: '#0a0a0a',
  },
  tokenLogoOverlap: {
    marginLeft: -8,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenPairText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  dexName: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
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
  pairDetails: {
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
  pairActions: {
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
  statsCard: {
    marginTop: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 4,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
}); 