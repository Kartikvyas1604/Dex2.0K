import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { AppIcon } from '../components/AppIcon';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

interface MarketData {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change24h: string;
  volume24h: string;
  marketCap: string;
  trend: 'up' | 'down' | 'stable';
}

export const AnalyticsScreen: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedCategory, setSelectedCategory] = useState('trending');

  const timeframes = [
    { key: '1h', label: '1h' },
    { key: '6h', label: '6h' },
    { key: '24h', label: '24h' },
    { key: '7d', label: '7d' },
    { key: '30d', label: '30d' },
  ];

  const categories = [
    { key: 'trending', label: 'Trending' },
    { key: 'gainers', label: 'Top Gainers' },
    { key: 'losers', label: 'Top Losers' },
    { key: 'volume', label: 'High Volume' },
    { key: 'marketcap', label: 'Market Cap' },
  ];

  const marketData: MarketData[] = [
    {
      id: '1',
      name: 'Bonk',
      symbol: 'BONK',
      price: '$0.00001234',
      change24h: '+11.08%',
      volume24h: '$2,456,789',
      marketCap: '$12,345,678',
      trend: 'up',
    },
    {
      id: '2',
      name: 'Jupiter',
      symbol: 'JUP',
      price: '$0.5678',
      change24h: '+4.31%',
      volume24h: '$1,234,567',
      marketCap: '$89,123,456',
      trend: 'up',
    },
    {
      id: '3',
      name: 'Raydium',
      symbol: 'RAY',
      price: '$1.2345',
      change24h: '-4.39%',
      volume24h: '$3,456,789',
      marketCap: '$234,567,890',
      trend: 'down',
    },
    {
      id: '4',
      name: 'Orca',
      symbol: 'ORCA',
      price: '$3.4567',
      change24h: '+2.15%',
      volume24h: '$987,654',
      marketCap: '$156,789,012',
      trend: 'up',
    },
    {
      id: '5',
      name: 'Serum',
      symbol: 'SRM',
      price: '$0.1234',
      change24h: '-1.87%',
      volume24h: '$567,890',
      marketCap: '$45,678,901',
      trend: 'down',
    },
  ];

  const marketStats = [
    { label: 'Total Market Cap', value: '$2.4B', change: '+5.2%' },
    { label: '24h Volume', value: '$156M', change: '+12.8%' },
    { label: 'Active Pairs', value: '1,234', change: '+23' },
    { label: 'New Tokens', value: '45', change: '+8' },
  ];

  const renderMarketItem = ({ item }: { item: MarketData }) => {
    const isPositive = item.change24h.startsWith('+');
    
    return (
      <TouchableOpacity style={styles.marketItem}>
        <View style={styles.marketHeader}>
          <View style={styles.marketInfo}>
            <Text style={styles.marketName}>{item.name}</Text>
            <Text style={styles.marketSymbol}>{item.symbol}</Text>
          </View>
          <View style={styles.marketPrice}>
            <Text style={styles.priceText}>{item.price}</Text>
            <Text style={[
              styles.changeText,
              isPositive ? styles.positiveChange : styles.negativeChange
            ]}>
              {item.change24h}
            </Text>
          </View>
        </View>
        
        <View style={styles.marketDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Volume 24h</Text>
            <Text style={styles.detailValue}>{item.volume24h}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Market Cap</Text>
            <Text style={styles.detailValue}>{item.marketCap}</Text>
          </View>
        </View>
        
        <View style={styles.trendIndicator}>
          <AppIcon 
            name={item.trend === 'up' ? 'trend-up' : item.trend === 'down' ? 'trend-down' : 'trend-stable'} 
            size={16} 
            color={item.trend === 'up' ? '#51cf66' : item.trend === 'down' ? '#ff6b6b' : '#ffd43b'} 
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Analytics" subtitle="Market Insights & Trends" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Market Overview */}
        <Card style={styles.overviewCard}>
          <Text style={styles.sectionTitle}>Market Overview</Text>
          <View style={styles.statsGrid}>
            {marketStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statChange}>{stat.change}</Text>
              </View>
            ))}
          </View>
        </Card>

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

        {/* Category Selector */}
        <View style={styles.categoryContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key && styles.activeCategoryButton
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.key && styles.activeCategoryText
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Market Data */}
        <Card style={styles.marketCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'trending' && 'Trending Tokens'}
              {selectedCategory === 'gainers' && 'Top Gainers'}
              {selectedCategory === 'losers' && 'Top Losers'}
              {selectedCategory === 'volume' && 'High Volume'}
              {selectedCategory === 'marketcap' && 'Market Cap Leaders'}
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={marketData}
            renderItem={renderMarketItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </Card>

        {/* Insights */}
        <Card style={styles.insightsCard}>
          <Text style={styles.sectionTitle}>Market Insights</Text>
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <AppIcon name="trend-up" size={20} color="#51cf66" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Meme Tokens Surge</Text>
                <Text style={styles.insightDescription}>
                  Meme tokens showing strong momentum with 15% average gains
                </Text>
              </View>
            </View>
            
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <AppIcon name="volume" size={20} color="#667eea" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Volume Increase</Text>
                <Text style={styles.insightDescription}>
                  Trading volume up 23% compared to yesterday
                </Text>
              </View>
            </View>
            
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <AppIcon name="new" size={20} color="#ffd43b" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>New Token Launch</Text>
                <Text style={styles.insightDescription}>
                  8 new tokens launched in the last 24 hours
                </Text>
              </View>
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
    paddingBottom: 100,
  },
  overviewCard: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
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
    marginBottom: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  statChange: {
    color: '#51cf66',
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  timeframeContainer: {
    marginTop: 16,
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
  categoryContainer: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  categoryScroll: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  activeCategoryText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  marketCard: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#667eea',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  marketItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  marketInfo: {
    flex: 1,
  },
  marketName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  marketSymbol: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  marketPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  changeText: {
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
  marketDetails: {
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
  trendIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  insightsCard: {
    marginTop: 16,
  },
  insightsList: {
    marginTop: 8,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  insightDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
}); 