import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const portfolioValue = '$12,450.67';
  const dailyChange = '+$234.12';
  const dailyChangePercent = '+1.92%';

  const quickActions = [
    { title: 'Create Token', icon: 'add-circle' },
    { title: 'Create Pool', icon: 'water' },
    { title: 'Swap Tokens', icon: 'swap-horiz' },
    { title: 'Add Liquidity', icon: 'opacity' },
  ];

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
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Portfolio Overview */}
        <Card variant="elevated" style={styles.portfolioCard}>
          <View style={styles.portfolioContainer}>
            <Text style={styles.portfolioLabel}>Portfolio Value</Text>
            <Text style={styles.portfolioValue}>{portfolioValue}</Text>
            <View style={styles.changeContainer}>
              <Text style={styles.dailyChange}>{dailyChange}</Text>
              <Text style={styles.dailyChangePercent}>({dailyChangePercent})</Text>
            </View>
            <View style={styles.portfolioStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>24H</Text>
                <Text style={styles.statLabel}>Volume</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>7D</Text>
                <Text style={styles.statLabel}>Change</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>30D</Text>
                <Text style={styles.statLabel}>Growth</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionCardContainer}>
                <View style={styles.actionCard}>
                  <Icon name={action.icon} type="material" size={28} color="#fff" style={styles.actionIcon} />
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

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

        {/* Call to Action */}
        <Card variant="glass" style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to Trade?</Text>
          <Text style={styles.ctaSubtitle}>Start swapping Token-2022 tokens with transfer hooks</Text>
          <Button
            title="Start Trading"
            onPress={() => {}}
            size="large"
            style={styles.ctaButton}
            icon="trending-up"
          />
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
  portfolioCard: {
    marginTop: 20,
  },
  portfolioContainer: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  portfolioLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  portfolioValue: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dailyChange: {
    color: '#51cf66',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 4,
  },
  dailyChangePercent: {
    color: '#51cf66',
    fontSize: 16,
  },
  portfolioStats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 0.5,
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
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCardContainer: {
    width: (width - 80) / 2,
    marginBottom: 12,
  },
  actionCard: {
    height: 110,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  actionIcon: {
    marginBottom: 8,
  },
  actionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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
    fontWeight: '600',
    marginRight: 8,
  },
  tokenSymbol: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  tokenDetails: {
    flexDirection: 'row',
  },
  tokenDetail: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginRight: 12,
  },
  tokenPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  positiveChange: {
    color: '#51cf66',
  },
  negativeChange: {
    color: '#ff6b6b',
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statCardLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  statCardChange: {
    color: '#51cf66',
    fontSize: 12,
    fontWeight: '600',
  },
  ctaCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  ctaTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaButton: {
    width: '80%',
  },
}); 