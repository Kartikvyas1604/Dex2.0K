import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TokenLogo } from '../components/TokenLogo';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

interface Token {
  symbol: string;
  name: string;
  logo: string;
}

interface Pool {
  id: string;
  token1: Token;
  token2: Token;
  liquidity: string;
  apr: string;
  share?: string;
  value?: string;
  change: string;
  volume24h?: string;
}

interface PoolCardProps {
  pool: Pool;
  isMyPool?: boolean;
}

export const PoolsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my-pools');

  const myPools: Pool[] = [
    {
      id: '1',
      token1: { symbol: 'SOL', name: 'Solana', logo: 'solana' },
      token2: { symbol: 'USDC', name: 'USD Coin', logo: 'usdc' },
      liquidity: '$12,450',
      apr: '24.5%',
      share: '0.12%',
      value: '$1,234',
      change: '+5.2%',
    },
    {
      id: '2',
      token1: { symbol: 'RWA', name: 'RWA Token', logo: 'rwa' },
      token2: { symbol: 'SOL', name: 'Solana', logo: 'solana' },
      liquidity: '$8,920',
      apr: '18.7%',
      share: '0.08%',
      value: '$567',
      change: '-2.1%',
    },
  ];

  const allPools: Pool[] = [
    {
      id: '1',
      token1: { symbol: 'SOL', name: 'Solana', logo: 'solana' },
      token2: { symbol: 'USDC', name: 'USD Coin', logo: 'usdc' },
      liquidity: '$2.4M',
      volume24h: '$156K',
      apr: '24.5%',
      change: '+5.2%',
    },
    {
      id: '2',
      token1: { symbol: 'RWA', name: 'RWA Token', logo: 'rwa' },
      token2: { symbol: 'SOL', name: 'Solana', logo: 'solana' },
      liquidity: '$890K',
      volume24h: '$45K',
      apr: '18.7%',
      change: '-2.1%',
    },
    {
      id: '3',
      token1: { symbol: 'ENT', name: 'Enterprise Coin', logo: 'ent' },
      token2: { symbol: 'USDC', name: 'USD Coin', logo: 'usdc' },
      liquidity: '$567K',
      volume24h: '$23K',
      apr: '15.3%',
      change: '+8.9%',
    },
  ];

  const PoolCard: React.FC<PoolCardProps> = ({ pool, isMyPool = false }) => (
    <Card style={styles.poolCard}>
      <View style={styles.poolHeader}>
        <View style={styles.tokenPair}>
          <View style={styles.tokenLogos}>
            <TokenLogo symbol={pool.token1.symbol} size={32} style={styles.tokenLogo} />
            <TokenLogo symbol={pool.token2.symbol} size={32} style={[styles.tokenLogo, styles.tokenLogoOverlap]} />
          </View>
          <View style={styles.tokenInfo}>
            <Text style={styles.tokenPairText}>
              {pool.token1.symbol}/{pool.token2.symbol}
            </Text>
            <Text style={styles.poolType}>Token-2022 Pool</Text>
          </View>
        </View>
        <View style={styles.poolStats}>
          <Text style={styles.liquidityText}>${pool.liquidity}</Text>
          <Text style={styles.aprText}>{pool.apr} APR</Text>
        </View>
      </View>

      {isMyPool ? (
        <View style={styles.myPoolDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Your Share</Text>
            <Text style={styles.detailValue}>{pool.share}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pool Value</Text>
            <Text style={styles.detailValue}>{pool.value}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>24h Change</Text>
            <Text style={[
              styles.detailValue,
              pool.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
            ]}>
              {pool.change}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.poolDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>24h Volume</Text>
            <Text style={styles.detailValue}>{pool.volume24h}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>24h Change</Text>
            <Text style={[
              styles.detailValue,
              pool.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
            ]}>
              {pool.change}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.poolActions}>
        {isMyPool ? (
          <>
            <Button
              title="Add Liquidity"
              onPress={() => {}}
              size="small"
              style={styles.actionButton}
            />
            <Button
              title="Remove"
              onPress={() => {}}
              variant="outline"
              size="small"
              style={styles.actionButton}
            />
          </>
        ) : (
          <Button
            title="Add Liquidity"
            onPress={() => {}}
            size="small"
            style={styles.actionButton}
          />
        )}
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header title="Liquidity Pools" subtitle="Token-2022 AMM" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'my-pools' && styles.activeTab]}
            onPress={() => setActiveTab('my-pools')}
          >
            <Text style={[styles.tabText, activeTab === 'my-pools' && styles.activeTabText]}>
              My Pools
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all-pools' && styles.activeTab]}
            onPress={() => setActiveTab('all-pools')}
          >
            <Text style={[styles.tabText, activeTab === 'all-pools' && styles.activeTabText]}>
              All Pools
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pool Statistics */}
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$2.4M</Text>
              <Text style={styles.statLabel}>Total Liquidity</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Active Pools</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$89K</Text>
              <Text style={styles.statLabel}>24h Volume</Text>
            </View>
          </View>
        </Card>

        {/* Pools List */}
        {activeTab === 'my-pools' ? (
          <View style={styles.poolsList}>
            {myPools.length > 0 ? (
              myPools.map((pool) => (
                <PoolCard key={pool.id} pool={pool} isMyPool={true} />
              ))
            ) : (
              <Card style={styles.emptyState}>
                <AppIcon name="pools" size={64} color="rgba(255, 255, 255, 0.3)" />
                <Text style={styles.emptyTitle}>No Liquidity Pools</Text>
                <Text style={styles.emptySubtitle}>
                  Add liquidity to pools to start earning fees
                </Text>
                <Button
                  title="Add Liquidity"
                  onPress={() => {}}
                  size="medium"
                  style={styles.emptyButton}
                />
              </Card>
            )}
          </View>
        ) : (
          <View style={styles.poolsList}>
            {allPools.map((pool) => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </View>
        )}
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
    paddingBottom: 120,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  activeTabText: {
    color: '#fff',
  },
  statsCard: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
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
  poolsList: {
    marginTop: 16,
  },
  poolCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  poolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tokenPair: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tokenLogos: {
    flexDirection: 'row',
    marginRight: 12,
    alignItems: 'center',
  },
  tokenLogo: {
    marginRight: 0,
  },
  tokenLogoOverlap: {
    marginLeft: -12,
    zIndex: 1,
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
  poolType: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  poolStats: {
    alignItems: 'flex-end',
  },
  liquidityText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  aprText: {
    color: '#51cf66',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  myPoolDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  poolDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  positiveChange: {
    color: '#51cf66',
  },
  negativeChange: {
    color: '#ff6b6b',
  },
  poolActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  emptyState: {
    marginHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  emptySubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  emptyButton: {
    width: 200,
  },
}); 