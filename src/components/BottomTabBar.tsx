import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AppIcon } from './AppIcon';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

interface TabItem {
  key: string;
  title: string;
  icon: string;
  screen: string;
}

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const tabs: TabItem[] = [
  { key: 'home', title: 'Home', icon: 'home', screen: 'Home' },
  { key: 'pairs', title: 'Pairs', icon: 'pools', screen: 'Pools' },
  { key: 'trading', title: 'Trading', icon: 'trend-up', screen: 'Trading' },
  { key: 'swap', title: 'Swap', icon: 'swap', screen: 'Swap' },
  { key: 'profile', title: 'Profile', icon: 'profile', screen: 'Profile' },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}
            >
              {isActive && (
                <View style={styles.activeIndicator} />
              )}
              
              <AppIcon
                name={isActive ? `${tab.icon}-selected` : tab.icon}
                size={22}
                color={isActive ? '#fff' : '#666'}
                style={styles.tabIcon}
              />
              
              <Text style={[
                styles.tabTitle,
                isActive && styles.activeTabTitle
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 16,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: '#fff',
    opacity: 0.1,
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabTitle: {
    fontSize: 10,
    color: '#666',
    letterSpacing: 0.2,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  activeTabTitle: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
}); 