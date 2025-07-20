import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, Alert } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const CreateTokenScreen: React.FC = () => {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [decimals, setDecimals] = useState('9');
  const [enableTransferHook, setEnableTransferHook] = useState(false);
  const [hookProgramId, setHookProgramId] = useState('');
  const [enableWhitelist, setEnableWhitelist] = useState(false);
  const [enableKYC, setEnableKYC] = useState(false);
  const [enableConditionalTransfers, setEnableConditionalTransfers] = useState(false);

  const handleCreateToken = () => {
    if (!tokenName || !tokenSymbol || !totalSupply) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would integrate with Solana Token-2022 program
    Alert.alert(
      'Success',
      `Token "${tokenName}" (${tokenSymbol}) created successfully!`,
      [{ text: 'OK' }]
    );
  };

  const transferHookTypes = [
    { name: 'Whitelist Hook', description: 'Restrict transfers to approved addresses' },
    { name: 'KYC Hook', description: 'Require KYC verification for transfers' },
    { name: 'Conditional Hook', description: 'Add custom transfer conditions' },
    { name: 'Rate Limiting Hook', description: 'Limit transfer frequency and amounts' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Create Token-2022" showBack />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Basic Token Info */}
        <Card>
          <Text style={styles.sectionTitle}>Token Information</Text>
          
          <Input
            label="Token Name"
            value={tokenName}
            onChangeText={setTokenName}
            placeholder="e.g., Real Estate Token"
            leftIcon={<Text style={styles.icon}>🪙</Text>}
          />
          
          <Input
            label="Token Symbol"
            value={tokenSymbol}
            onChangeText={setTokenSymbol}
            placeholder="e.g., RET"
            leftIcon={<Text style={styles.icon}>📝</Text>}
          />
          
          <Input
            label="Total Supply"
            value={totalSupply}
            onChangeText={setTotalSupply}
            placeholder="e.g., 1000000"
            keyboardType="numeric"
            leftIcon={<Text style={styles.icon}>💰</Text>}
          />
          
          <Input
            label="Decimals"
            value={decimals}
            onChangeText={setDecimals}
            placeholder="9"
            keyboardType="numeric"
            leftIcon={<Text style={styles.icon}>🔢</Text>}
          />
        </Card>

        {/* Transfer Hook Configuration */}
        <Card>
          <Text style={styles.sectionTitle}>Transfer Hook Configuration</Text>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Enable Transfer Hook</Text>
            <Switch
              value={enableTransferHook}
              onValueChange={setEnableTransferHook}
              trackColor={{ false: '#767577', true: '#667eea' }}
              thumbColor={enableTransferHook ? '#fff' : '#f4f3f4'}
            />
          </View>

          {enableTransferHook && (
            <>
              <Input
                label="Hook Program ID"
                value={hookProgramId}
                onChangeText={setHookProgramId}
                placeholder="Enter Solana program ID"
                leftIcon={<Text style={styles.icon}>🔗</Text>}
              />

              <Text style={styles.hookTypesTitle}>Available Hook Types:</Text>
              {transferHookTypes.map((hook, index) => (
                <View key={index} style={styles.hookTypeItem}>
                  <View style={styles.hookTypeInfo}>
                    <Text style={styles.hookTypeName}>{hook.name}</Text>
                    <Text style={styles.hookTypeDescription}>{hook.description}</Text>
                  </View>
                  <View style={styles.hookTypeIcon}>
                    <Text style={styles.icon}>⚙️</Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </Card>

        {/* Advanced Features */}
        <Card>
          <Text style={styles.sectionTitle}>Advanced Features</Text>
          
          <View style={styles.switchContainer}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Whitelist Management</Text>
              <Text style={styles.switchDescription}>Restrict token transfers to approved addresses</Text>
            </View>
            <Switch
              value={enableWhitelist}
              onValueChange={setEnableWhitelist}
              trackColor={{ false: '#767577', true: '#667eea' }}
              thumbColor={enableWhitelist ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.switchContainer}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>KYC Verification</Text>
              <Text style={styles.switchDescription}>Require identity verification for transfers</Text>
            </View>
            <Switch
              value={enableKYC}
              onValueChange={setEnableKYC}
              trackColor={{ false: '#767577', true: '#667eea' }}
              thumbColor={enableKYC ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.switchContainer}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Conditional Transfers</Text>
              <Text style={styles.switchDescription}>Add custom logic to transfer conditions</Text>
            </View>
            <Switch
              value={enableConditionalTransfers}
              onValueChange={setEnableConditionalTransfers}
              trackColor={{ false: '#767577', true: '#667eea' }}
              thumbColor={enableConditionalTransfers ? '#fff' : '#f4f3f4'}
            />
          </View>
        </Card>

        {/* Token Preview */}
        <Card>
          <Text style={styles.sectionTitle}>Token Preview</Text>
          <View style={styles.previewContainer}>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Name:</Text>
              <Text style={styles.previewValue}>{tokenName || 'Not set'}</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Symbol:</Text>
              <Text style={styles.previewValue}>{tokenSymbol || 'Not set'}</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Supply:</Text>
              <Text style={styles.previewValue}>{totalSupply || 'Not set'}</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Transfer Hook:</Text>
              <Text style={styles.previewValue}>
                {enableTransferHook ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>
        </Card>

        {/* Create Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Create Token-2022"
            onPress={handleCreateToken}
            size="large"
            style={styles.createButton}
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
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  icon: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  switchInfo: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 2,
  },
  hookTypesTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
  hookTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  hookTypeInfo: {
    flex: 1,
  },
  hookTypeName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  hookTypeDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 2,
  },
  hookTypeIcon: {
    marginLeft: 12,
  },
  previewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
  },
  previewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  previewLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  previewValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 20,
  },
  createButton: {
    width: '100%',
  },
}); 