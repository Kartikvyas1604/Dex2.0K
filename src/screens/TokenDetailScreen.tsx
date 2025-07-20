import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { AppIcon } from '../components/AppIcon';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

interface TokenDetailProps {
  route: {
    params: {
      token: any;
    };
  };
}

export const TokenDetailScreen: React.FC<TokenDetailProps> = ({ route }) => {
  const { token } = route.params;
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedTab, setSelectedTab] = useState('overview');

  const timeframes = [
    { key: '5m', label: '5m' },
    { key: '1h', label: '1h' },
    { key: '6h', label: '6h' },
    { key: '24h', label: '24h' },
    { key: '7d', label: '7d' },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'trades', label: 'Trades' },
    { key: 'liquidity', label: 'Liquidity' },
    { key: 'analytics', label: 'Analytics' },
  ];

  const renderPriceChart = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chartPlaceholder}>
        <AppIcon name="chart" size={48} color="rgba(255, 255, 255, 0.3)" />
        <Text style={styles.chartPlaceholderText}>Price Chart</Text>
        <Text style={styles.chartPlaceholderSubtext}>Interactive chart coming soon</Text>
      </View>
    </View>
  );

  const renderOverview = () => (
    <View>
      {/* Price Information */}
      <Card style={styles.priceCard}>
        <View style={styles.priceHeader}>
          <View style={styles.tokenInfo}>
            <Text style={styles.tokenName}>{token.name}</Text>
            <Text style={styles.tokenSymbol}>{token.symbol}</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.currentPrice}>{token.price}</Text>
            <Text style={[
              styles.priceChange,
              token.priceChangePercent24h.startsWith('+') ? styles.positiveChange : styles.negativeChange
            ]}>
              {token.priceChangePercent24h}
            </Text>
          </View>
        </View>
        
        <View style={styles.priceStats}>
          <View style={styles.priceStat}>
            <Text style={styles.priceStatLabel}>Market Cap</Text>
            <Text style={styles.priceStatValue}>{token.marketCap}</Text>
          </View>
          <View style={styles.priceStat}>
            <Text style={styles.priceStatLabel}>FDV</Text>
            <Text style={styles.priceStatValue}>{token.fdv}</Text>
          </View>
          <View style={styles.priceStat}>
            <Text style={styles.priceStatLabel}>Volume 24h</Text>
            <Text style={styles.priceStatValue}>{token.volume24h}</Text>
          </View>
        </View>
      </Card>

      {/* Trading Data */}
      <Card style={styles.tradingCard}>
        <Text style={styles.cardTitle}>Trading Data</Text>
        <View style={styles.tradingGrid}>
          <View style={styles.tradingItem}>
            <Text style={styles.tradingLabel}>Liquidity</Text>
            <Text style={styles.tradingValue}>{token.liquidity}</Text>
          </View>
          <View style={styles.tradingItem}>
            <Text style={styles.tradingLabel}>Buy Tax</Text>
            <Text style={styles.tradingValue}>0%</Text>
          </View>
          <View style={styles.tradingItem}>
            <Text style={styles.tradingLabel}>Sell Tax</Text>
            <Text style={styles.tradingValue}>0%</Text>
          </View>
          <View style={styles.tradingItem}>
            <Text style={styles.tradingLabel}>Holders</Text>
            <Text style={styles.tradingValue}>1,234</Text>
          </View>
        </View>
      </Card>

      {/* Transaction Activity */}
      <Card style={styles.activityCard}>
        <Text style={styles.cardTitle}>Transaction Activity</Text>
        <View style={styles.activityGrid}>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>24h Buys</Text>
            <Text style={styles.activityValue}>{token.txns.h24.buys}</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>24h Sells</Text>
            <Text style={styles.activityValue}>{token.txns.h24.sells}</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>6h Buys</Text>
            <Text style={styles.activityValue}>{token.txns.h6.buys}</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>6h Sells</Text>
            <Text style={styles.activityValue}>{token.txns.h6.sells}</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderTrades = () => (
    <Card>
      <Text style={styles.cardTitle}>Recent Trades</Text>
      <View style={styles.tradesList}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <View key={index} style={styles.tradeItem}>
            <View style={styles.tradeInfo}>
              <Text style={styles.tradeType}>Buy</Text>
              <Text style={styles.tradeAmount}>1,234 {token.symbol}</Text>
            </View>
            <View style={styles.tradePrice}>
              <Text style={styles.tradePriceValue}>$0.00001234</Text>
              <Text style={styles.tradeTime}>2 min ago</Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );

  const renderLiquidity = () => (
    <Card>
      <Text style={styles.cardTitle}>Liquidity Information</Text>
      <View style={styles.liquidityInfo}>
        <View style={styles.liquidityItem}>
          <Text style={styles.liquidityLabel}>Total Liquidity</Text>
          <Text style={styles.liquidityValue}>{token.liquidity}</Text>
        </View>
        <View style={styles.liquidityItem}>
          <Text style={styles.liquidityLabel}>LP Holders</Text>
          <Text style={styles.liquidityValue}>89</Text>
        </View>
        <View style={styles.liquidityItem}>
          <Text style={styles.liquidityLabel}>Pair Created</Text>
          <Text style={styles.liquidityValue}>Jan 15, 2024</Text>
        </View>
      </View>
    </Card>
  );

  const renderAnalytics = () => (
    <Card>
      <Text style={styles.cardTitle}>Analytics</Text>
      <View style={styles.analyticsGrid}>
        <View style={styles.analyticsItem}>
          <Text style={styles.analyticsLabel}>Price Change 5m</Text>
          <Text style={[
            styles.analyticsValue,
            token.priceChange.m5 > 0 ? styles.positiveChange : styles.negativeChange
          ]}>
            {token.priceChange.m5 > 0 ? '+' : ''}{token.priceChange.m5}%
          </Text>
        </View>
        <View style={styles.analyticsItem}>
          <Text style={styles.analyticsLabel}>Price Change 1h</Text>
          <Text style={[
            styles.analyticsValue,
            token.priceChange.h1 > 0 ? styles.positiveChange : styles.negativeChange
          ]}>
            {token.priceChange.h1 > 0 ? '+' : ''}{token.priceChange.h1}%
          </Text>
        </View>
        <View style={styles.analyticsItem}>
          <Text style={styles.analyticsLabel}>Price Change 6h</Text>
          <Text style={[
            styles.analyticsValue,
            token.priceChange.h6 > 0 ? styles.positiveChange : styles.negativeChange
          ]}>
            {token.priceChange.h6 > 0 ? '+' : ''}{token.priceChange.h6}%
          </Text>
        </View>
        <View style={styles.analyticsItem}>
          <Text style={styles.analyticsLabel}>Price Change 24h</Text>
          <Text style={[
            styles.analyticsValue,
            token.priceChange.h24 > 0 ? styles.positiveChange : styles.negativeChange
          ]}>
            {token.priceChange.h24 > 0 ? '+' : ''}{token.priceChange.h24}%
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header title={token.symbol} subtitle="Token Details" showBack />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Price Chart */}
        {renderPriceChart()}

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

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScroll}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabButton,
                  selectedTab === tab.key && styles.activeTabButton
                ]}
                onPress={() => setSelectedTab(tab.key)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'trades' && renderTrades()}
        {selectedTab === 'liquidity' && renderLiquidity()}
        {selectedTab === 'analytics' && renderAnalytics()}

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <AppIcon name="swap" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Trade on Raydium</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <AppIcon name="chart" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>View Chart</Text>
          </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 100,
  },
  chartContainer: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    marginTop: 8,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  chartPlaceholderSubtext: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    marginTop: 4,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
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
  tabContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  tabScroll: {
    paddingRight: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  activeTabText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  priceCard: {
    marginTop: 16,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 4,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  tokenSymbol: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 4,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  priceChange: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  positiveChange: {
    color: '#51cf66',
  },
  negativeChange: {
    color: '#ff6b6b',
  },
  priceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceStat: {
    alignItems: 'center',
    flex: 1,
  },
  priceStatLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  priceStatValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tradingCard: {
    marginTop: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  tradingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tradingItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tradingLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  tradingValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  activityCard: {
    marginTop: 16,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  activityValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tradesList: {
    marginTop: 8,
  },
  tradeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tradeInfo: {
    flex: 1,
  },
  tradeType: {
    color: '#51cf66',
    fontSize: 14,
    marginBottom: 2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tradeAmount: {
    color: '#fff',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  tradePrice: {
    alignItems: 'flex-end',
  },
  tradePriceValue: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tradeTime: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  liquidityInfo: {
    marginTop: 8,
  },
  liquidityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  liquidityLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  liquidityValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  analyticsItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  analyticsLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  analyticsValue: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  actionsContainer: {
    marginTop: 24,
    marginHorizontal: 16,
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#667eea',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#667eea',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
}); 