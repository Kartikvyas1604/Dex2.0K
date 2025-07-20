import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Switch } from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

interface MenuItemProps {
  item: {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    action: 'navigate' | 'toggle';
    value?: boolean;
    onToggle?: (value: boolean) => void;
  };
}

export const ProfileScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  const walletInfo = {
    address: '0x1234...5678',
    balance: '$12,450.67',
    network: 'Solana Mainnet',
    connected: true,
  };

  const profileStats = [
    { label: 'Total Swaps', value: '156', change: '+12' },
    { label: 'Liquidity Provided', value: '$2,340', change: '+8.5%' },
    { label: 'Tokens Created', value: '3', change: '+1' },
    { label: 'Total Volume', value: '$45,670', change: '+23%' },
  ];

  const menuItems = [
    {
      id: 'wallet',
      title: 'Wallet Settings',
      subtitle: 'Manage wallet connections',
      icon: 'wallet',
      action: 'navigate' as const,
    },
    {
      id: 'security',
      title: 'Security',
      subtitle: 'Biometric, PIN, and security settings',
      icon: 'security',
      action: 'navigate' as const,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Push notifications and alerts',
      icon: 'notifications',
      action: 'toggle' as const,
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      id: 'biometric',
      title: 'Biometric Login',
      subtitle: 'Use fingerprint or face ID',
      icon: 'fingerprint',
      action: 'toggle' as const,
      value: biometricEnabled,
      onToggle: setBiometricEnabled,
    },
    {
      id: 'appearance',
      title: 'Dark Mode',
      subtitle: 'Toggle dark theme',
      icon: 'dark-mode',
      action: 'toggle' as const,
      value: darkModeEnabled,
      onToggle: setDarkModeEnabled,
    },
    {
      id: 'language',
      title: 'Language',
      subtitle: 'English (US)',
      icon: 'language',
      action: 'navigate' as const,
    },
    {
      id: 'support',
      title: 'Support',
      subtitle: 'Help center and contact',
      icon: 'help',
      action: 'navigate' as const,
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'App version and information',
      icon: 'info',
      action: 'navigate' as const,
    },
  ];

  const MenuItem: React.FC<MenuItemProps> = ({ item }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <AppIcon name={item.icon} size={20} color="#fff" />
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.menuItemRight}>
        {item.action === 'toggle' ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: 'rgba(255, 255, 255, 0.2)', true: '#667eea' }}
            thumbColor={item.value ? '#fff' : 'rgba(255, 255, 255, 0.6)'}
          />
        ) : (
          <AppIcon name="chevron-right" size={20} color="rgba(255, 255, 255, 0.5)" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Profile" subtitle="Account & Settings" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Info Card */}
        <Card style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View style={styles.walletIcon}>
              <AppIcon name="wallet" size={24} color="#fff" />
            </View>
            <View style={styles.walletInfo}>
              <Text style={styles.walletAddress}>{walletInfo.address}</Text>
              <Text style={styles.walletNetwork}>{walletInfo.network}</Text>
            </View>
            <View style={styles.connectionStatus}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Connected</Text>
            </View>
          </View>
          <View style={styles.walletBalance}>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <Text style={styles.balanceValue}>{walletInfo.balance}</Text>
          </View>
        </Card>

        {/* Profile Statistics */}
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Activity Overview</Text>
          <View style={styles.statsGrid}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statChange}>{stat.change}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <AppIcon name="swap" size={20} color="#fff" />
              </View>
              <Text style={styles.actionText}>New Swap</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <AppIcon name="add" size={20} color="#fff" />
              </View>
              <Text style={styles.actionText}>Add Liquidity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <AppIcon name="create" size={20} color="#fff" />
              </View>
              <Text style={styles.actionText}>Create Token</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <AppIcon name="history" size={20} color="#fff" />
              </View>
              <Text style={styles.actionText}>Transaction History</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Settings Menu */}
        <Card style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>Settings</Text>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </Card>

        {/* Disconnect Button */}
        <View style={styles.disconnectContainer}>
          <Button
            title="Disconnect Wallet"
            onPress={() => {}}
            variant="outline"
            size="large"
            style={styles.disconnectButton}
          />
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
  walletCard: {
    marginTop: 20,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  walletInfo: {
    flex: 1,
  },
  walletAddress: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  walletNetwork: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#51cf66',
    marginRight: 6,
  },
  statusText: {
    color: '#51cf66',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  walletBalance: {
    alignItems: 'center',
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  balanceValue: {
    color: '#fff',
    fontSize: 28,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  statsCard: {
    marginTop: 16,
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
  actionsCard: {
    marginTop: 16,
  },
  actionsTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  settingsCard: {
    marginTop: 16,
  },
  settingsTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  menuSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  menuItemRight: {
    alignItems: 'center',
  },
  disconnectContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  disconnectButton: {
    width: '100%',
  },
}); 