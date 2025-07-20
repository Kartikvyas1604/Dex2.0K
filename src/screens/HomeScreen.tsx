import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const portfolioValue = '$12,450.67';
  const dailyChange = '+$234.12';
  const dailyChangePercent = '+1.92%';
  const isPositive = dailyChange.startsWith('+');

  const recentTokens = [
    { name: 'RWA Token', symbol: 'RWA', price: '$1.25', change: '+5.2%', volume: '$2.4M', liquidity: '$156K' },
    { name: 'Enterprise Coin', symbol: 'ENT', price: '$0.89', change: '-2.1%', volume: '$1.8M', liquidity: '$89K' },
    { name: 'Real Estate Token', symbol: 'RET', price: '$15.67', change: '+12.8%', volume: '$5.2M', liquidity: '$234K' },
  ];

  const stats = [
    { label: 'Active Tokens', value: '156', change: '+12' },
    { label: 'Total Volume', value: '$2.4M', change: '+8.5%' },
    { label: 'Liquidity Pools', value: '89', change: '+5' },
    { label: 'Active Users', value: '1,234', change: '+23%' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Dex2.0K" subtitle="Token-2022 AMM Platform" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Portfolio Overview */}
        <View style={styles.portfolioCard}>
          <View style={[
            styles.portfolioContainer,
            isPositive ? styles.positiveBackground : styles.negativeBackground
          ]}>
            <Text style={styles.portfolioLabel}>Portfolio Value</Text>
            <Text style={styles.portfolioValue}>{portfolioValue}</Text>
            <View style={styles.changeContainer}>
              <Text style={[
                styles.dailyChange,
                isPositive ? styles.positiveChange : styles.negativeChange
              ]}>
                {dailyChange}
              </Text>
              <Text style={[
                styles.dailyChangePercent,
                isPositive ? styles.positiveChange : styles.negativeChange
              ]}>
                ({dailyChangePercent})
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Tokens */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Token-2022 Tokens</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentTokens.map((token, index) => (
            <View key={index} style={styles.tokenItem}>
              <View style={styles.tokenInfo}>
                <View style={styles.tokenHeader}>
                  <Text style={styles.tokenName}>{token.name}</Text>
                  <Text style={styles.tokenSymbol}>{token.symbol}</Text>
                </View>
                <View style={styles.tokenDetails}>
                  <Text style={styles.tokenDetail}>Vol: {token.volume}</Text>
                  <Text style={styles.tokenDetail}>Liq: {token.liquidity}</Text>
                </View>
              </View>
              <View style={styles.tokenPrice}>
                <Text style={styles.priceText}>{token.price}</Text>
                <Text style={[
                  styles.changeText,
                  token.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
                ]}>
                  {token.change}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Platform Stats */}
        <Card>
          <Text style={styles.sectionTitle}>Platform Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statCardValue}>{stat.value}</Text>
                <Text style={styles.statCardLabel}>{stat.label}</Text>
                <Text style={styles.statCardChange}>{stat.change}</Text>
              </View>
            ))}
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
    paddingBottom: 120, // Extra padding to account for floating navbar
  },
  portfolioCard: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  portfolioContainer: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  positiveBackground: {
    backgroundColor: 'rgba(81, 207, 102, 0.15)', // Green background shade
  },
  negativeBackground: {
    backgroundColor: 'rgba(255, 107, 107, 0.15)', // Red background shade
  },
  portfolioLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  portfolioValue: {
    color: '#fff',
    fontSize: 36,
    marginBottom: 8,
    letterSpacing: 1,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dailyChange: {
    fontSize: 20,
    marginRight: 4,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  dailyChangePercent: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  positiveChange: {
    color: '#51cf66',
  },
  negativeChange: {
    color: '#ff6b6b',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
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
    flex: 1,
  },
  tokenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tokenName: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tokenSymbol: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  tokenDetails: {
    flexDirection: 'row',
  },
  tokenDetail: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginRight: 12,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  tokenPrice: {
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
  statCardValue: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 4,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  statCardLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  statCardChange: {
    color: '#51cf66',
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
}); 