import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { AppIcon } from '../components/AppIcon';
import { FONTS, FONT_WEIGHTS } from '../utils/fonts';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

interface TransferHookConfig {
  enabled: boolean;
  whitelistEnabled: boolean;
  kycEnabled: boolean;
  maxTransferAmount: string;
  minTransferAmount: string;
  transferFee: string;
  hookProgramId: string;
}

interface TokenConfig {
  name: string;
  symbol: string;
  description: string;
  totalSupply: string;
  decimals: number;
  transferHook: TransferHookConfig;
  metadata: {
    logo: string;
    website: string;
    twitter: string;
    telegram: string;
  };
}

export const CreateTokenScreen: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [tokenConfig, setTokenConfig] = useState<TokenConfig>({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '',
    decimals: 9,
    transferHook: {
      enabled: false,
      whitelistEnabled: false,
      kycEnabled: false,
      maxTransferAmount: '',
      minTransferAmount: '',
      transferFee: '',
      hookProgramId: '',
    },
    metadata: {
      logo: '',
      website: '',
      twitter: '',
      telegram: '',
    },
  });

  const [lpConfig, setLpConfig] = useState({
    baseToken: 'SOL',
    liquidityAmount: '',
    initialPrice: '',
    fee: '0.3%',
  });

  const [hookWarning, setHookWarning] = useState('');

  const steps = [
    { id: 1, title: 'Token Details', icon: 'token' },
    { id: 2, title: 'Transfer Hook', icon: 'hook' },
    { id: 3, title: 'LP Pool', icon: 'pool' },
    { id: 4, title: 'Review & Deploy', icon: 'deploy' },
  ];

  const updateTokenConfig = (field: keyof TokenConfig, value: any) => {
    setTokenConfig(prev => ({ ...prev, [field]: value }));
  };

  const updateTransferHook = (field: keyof TransferHookConfig, value: any) => {
    setTokenConfig(prev => ({
      ...prev,
      transferHook: { ...prev.transferHook, [field]: value }
    }));
  };

  const renderTokenDetails = () => (
    <View>
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Basic Token Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Token Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter token name (e.g., My Token)"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            value={tokenConfig.name}
            onChangeText={(value) => updateTokenConfig('name', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Token Symbol</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter token symbol (e.g., MTK)"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            value={tokenConfig.symbol}
            onChangeText={(value) => updateTokenConfig('symbol', value)}
            maxLength={10}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Describe your token..."
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            value={tokenConfig.description}
            onChangeText={(value) => updateTokenConfig('description', value)}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Total Supply</Text>
            <TextInput
              style={styles.textInput}
              placeholder="1000000"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={tokenConfig.totalSupply}
              onChangeText={(value) => updateTokenConfig('totalSupply', value)}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Decimals</Text>
            <TextInput
              style={styles.textInput}
            placeholder="9"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={tokenConfig.decimals.toString()}
              onChangeText={(value) => updateTokenConfig('decimals', parseInt(value) || 9)}
            keyboardType="numeric"
            />
          </View>
        </View>
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Social Links & Metadata</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Website URL</Text>
          <TextInput
            style={styles.textInput}
            placeholder="https://mytoken.com"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            value={tokenConfig.metadata.website}
            onChangeText={(value) => updateTokenConfig('metadata', { ...tokenConfig.metadata, website: value })}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Twitter</Text>
            <TextInput
              style={styles.textInput}
              placeholder="@mytoken"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={tokenConfig.metadata.twitter}
              onChangeText={(value) => updateTokenConfig('metadata', { ...tokenConfig.metadata, twitter: value })}
            />
          </View>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Telegram</Text>
            <TextInput
              style={styles.textInput}
              placeholder="t.me/mytoken"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={tokenConfig.metadata.telegram}
              onChangeText={(value) => updateTokenConfig('metadata', { ...tokenConfig.metadata, telegram: value })}
            />
          </View>
        </View>
        </Card>
    </View>
  );

  const renderTransferHook = () => (
    <View>
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transfer Hook Configuration</Text>
            <Switch
            value={tokenConfig.transferHook.enabled}
            onValueChange={(value) => updateTransferHook('enabled', value)}
            trackColor={{ false: 'rgba(255, 255, 255, 0.2)', true: '#667eea' }}
            thumbColor={tokenConfig.transferHook.enabled ? '#fff' : 'rgba(255, 255, 255, 0.6)'}
            />
          </View>

        {tokenConfig.transferHook.enabled && (
          <>
            <View style={styles.hookFeature}>
              <View style={styles.featureHeader}>
                <Text style={styles.featureTitle}>Whitelist Management</Text>
                <Switch
                  value={tokenConfig.transferHook.whitelistEnabled}
                  onValueChange={(value) => updateTransferHook('whitelistEnabled', value)}
                  trackColor={{ false: 'rgba(255, 255, 255, 0.2)', true: '#51cf66' }}
                  thumbColor={tokenConfig.transferHook.whitelistEnabled ? '#fff' : 'rgba(255, 255, 255, 0.6)'}
                />
              </View>
              <Text style={styles.featureDescription}>
                Restrict transfers to approved addresses only
              </Text>
            </View>

            <View style={styles.hookFeature}>
              <View style={styles.featureHeader}>
                <Text style={styles.featureTitle}>KYC Verification</Text>
                <Switch
                  value={tokenConfig.transferHook.kycEnabled}
                  onValueChange={(value) => updateTransferHook('kycEnabled', value)}
                  trackColor={{ false: 'rgba(255, 255, 255, 0.2)', true: '#ffd43b' }}
                  thumbColor={tokenConfig.transferHook.kycEnabled ? '#fff' : 'rgba(255, 255, 255, 0.6)'}
                />
              </View>
              <Text style={styles.featureDescription}>
                Require identity verification for transfers
              </Text>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Max Transfer Amount</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="1000"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={tokenConfig.transferHook.maxTransferAmount}
                  onChangeText={(value) => updateTransferHook('maxTransferAmount', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Min Transfer Amount</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="1"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={tokenConfig.transferHook.minTransferAmount}
                  onChangeText={(value) => updateTransferHook('minTransferAmount', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Transfer Fee (%)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="2.5"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={tokenConfig.transferHook.transferFee}
                onChangeText={(value) => updateTransferHook('transferFee', value)}
                keyboardType="numeric"
              />
                  </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Hook Program ID</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter custom hook program ID (optional)"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={tokenConfig.transferHook.hookProgramId}
                onChangeText={(value) => {
                  updateTransferHook('hookProgramId', value);
                  if (value && !isHookWhitelisted(value)) {
                    setHookWarning('This hook program is not whitelisted!');
                  } else {
                    setHookWarning('');
                  }
                }}
              />
              {hookWarning ? (
                <Text style={{ color: '#ff6b6b', marginTop: 4 }}>{hookWarning}</Text>
              ) : null}
            </View>
            </>
          )}
        </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Hook Features Preview</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <AppIcon name="security" size={24} color="#51cf66" />
            <Text style={styles.featureCardTitle}>Secure Transfers</Text>
            <Text style={styles.featureCardDesc}>Pre-transfer validation</Text>
          </View>
          <View style={styles.featureCard}>
            <AppIcon name="whitelist" size={24} color="#667eea" />
            <Text style={styles.featureCardTitle}>Whitelist</Text>
            <Text style={styles.featureCardDesc}>Approved addresses only</Text>
          </View>
          <View style={styles.featureCard}>
            <AppIcon name="kyc" size={24} color="#ffd43b" />
            <Text style={styles.featureCardTitle}>KYC Ready</Text>
            <Text style={styles.featureCardDesc}>Identity verification</Text>
          </View>
          <View style={styles.featureCard}>
            <AppIcon name="fee" size={24} color="#ff6b6b" />
            <Text style={styles.featureCardTitle}>Transfer Fees</Text>
            <Text style={styles.featureCardDesc}>Customizable fees</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderLPPool = () => (
    <View>
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Liquidity Pool Configuration</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Base Token</Text>
          <View style={styles.tokenSelector}>
            <Text style={styles.selectedToken}>{lpConfig.baseToken}</Text>
            <AppIcon name="chevron-down" size={16} color="rgba(255, 255, 255, 0.6)" />
          </View>
            </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Liquidity Amount</Text>
            <TextInput
              style={styles.textInput}
              placeholder="1000"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={lpConfig.liquidityAmount}
              onChangeText={(value) => setLpConfig(prev => ({ ...prev, liquidityAmount: value }))}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Initial Price</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0.001"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={lpConfig.initialPrice}
              onChangeText={(value) => setLpConfig(prev => ({ ...prev, initialPrice: value }))}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Pool Fee</Text>
          <View style={styles.feeSelector}>
            {['0.1%', '0.3%', '1%'].map((fee) => (
              <TouchableOpacity
                key={fee}
                style={[
                  styles.feeOption,
                  lpConfig.fee === fee && styles.selectedFeeOption
                ]}
                onPress={() => setLpConfig(prev => ({ ...prev, fee }))}
              >
                <Text style={[
                  styles.feeOptionText,
                  lpConfig.fee === fee && styles.selectedFeeOptionText
                ]}>
                  {fee}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Pool Preview</Text>
        <View style={styles.poolPreview}>
          <View style={styles.poolPair}>
            <Text style={styles.poolPairText}>{tokenConfig.symbol || 'TOKEN'}/SOL</Text>
            <Text style={styles.poolType}>Token-2022 Pool</Text>
          </View>
          <View style={styles.poolStats}>
            <View style={styles.poolStat}>
              <Text style={styles.poolStatLabel}>Initial Liquidity</Text>
              <Text style={styles.poolStatValue}>{lpConfig.liquidityAmount || '0'} SOL</Text>
            </View>
            <View style={styles.poolStat}>
              <Text style={styles.poolStatLabel}>Initial Price</Text>
              <Text style={styles.poolStatValue}>${lpConfig.initialPrice || '0'}</Text>
            </View>
            <View style={styles.poolStat}>
              <Text style={styles.poolStatLabel}>Pool Fee</Text>
              <Text style={styles.poolStatValue}>{lpConfig.fee}</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderReview = () => (
    <View>
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Token Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Name</Text>
          <Text style={styles.summaryValue}>{tokenConfig.name || 'Not set'}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Symbol</Text>
          <Text style={styles.summaryValue}>{tokenConfig.symbol || 'Not set'}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Supply</Text>
          <Text style={styles.summaryValue}>{tokenConfig.totalSupply || 'Not set'}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Decimals</Text>
          <Text style={styles.summaryValue}>{tokenConfig.decimals}</Text>
          </View>
        </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Transfer Hook Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Enabled</Text>
          <Text style={styles.summaryValue}>
            {tokenConfig.transferHook.enabled ? 'Yes' : 'No'}
          </Text>
            </View>
        {tokenConfig.transferHook.enabled && (
          <>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Whitelist</Text>
              <Text style={styles.summaryValue}>
                {tokenConfig.transferHook.whitelistEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>KYC</Text>
              <Text style={styles.summaryValue}>
                {tokenConfig.transferHook.kycEnabled ? 'Required' : 'Not Required'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Transfer Fee</Text>
              <Text style={styles.summaryValue}>
                {tokenConfig.transferHook.transferFee ? `${tokenConfig.transferHook.transferFee}%` : 'None'}
              </Text>
            </View>
          </>
        )}
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>LP Pool Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Trading Pair</Text>
          <Text style={styles.summaryValue}>{tokenConfig.symbol || 'TOKEN'}/SOL</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Initial Liquidity</Text>
          <Text style={styles.summaryValue}>{lpConfig.liquidityAmount || '0'} SOL</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Initial Price</Text>
          <Text style={styles.summaryValue}>${lpConfig.initialPrice || '0'}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Pool Fee</Text>
          <Text style={styles.summaryValue}>{lpConfig.fee}</Text>
          </View>
        </Card>
    </View>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return renderTokenDetails();
      case 2:
        return renderTransferHook();
      case 3:
        return renderLPPool();
      case 4:
        return renderReview();
      default:
        return renderTokenDetails();
    }
  };

  const canProceed = () => {
    switch (activeStep) {
      case 1:
        return tokenConfig.name && tokenConfig.symbol && tokenConfig.totalSupply;
      case 2:
        return true; // Transfer hook is optional
      case 3:
        return lpConfig.liquidityAmount && lpConfig.initialPrice;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (activeStep < 4 && canProceed()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const isHookWhitelisted = (hookId: string) => {
    if (!hookId) return true; // Allow empty (no hook)
    return HOOK_WHITELIST.includes(hookId);
  };

  const handleDeploy = () => {
    // Whitelist enforcement
    if (tokenConfig.transferHook.enabled && !isHookWhitelisted(tokenConfig.transferHook.hookProgramId)) {
      setHookWarning('Selected hook program is not whitelisted. Please use a safe, approved hook.');
      Toast.show({ type: 'error', text1: 'Error', text2: 'Selected hook program is not whitelisted.' });
      return;
    }
    setHookWarning('');
    // TODO: Blockchain logic to create Token-2022 with Transfer Hook and LP pool
    // Use Solana web3.js and @solana/spl-token-2022 here
    // Show success/error feedback
    try {
      // ... blockchain logic ...
      Toast.show({ type: 'success', text1: 'Success', text2: 'Token deployed successfully!' });
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to deploy token.' });
    }
    console.log('Deploying token with config:', tokenConfig);
    console.log('LP config:', lpConfig);
  };

  return (
    <View style={styles.container}>
      <Header title="Create Token" subtitle="Token-2022 with Transfer Hook" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          {steps.map((step, index) => (
            <View key={step.id} style={styles.stepContainer}>
              <TouchableOpacity
                style={[
                  styles.stepButton,
                  activeStep >= step.id && styles.activeStepButton
                ]}
                onPress={() => setActiveStep(step.id)}
                disabled={activeStep < step.id}
              >
                <AppIcon 
                  name={step.icon} 
                  size={20} 
                  color={activeStep >= step.id ? '#fff' : 'rgba(255, 255, 255, 0.6)'} 
                />
              </TouchableOpacity>
              <Text style={[
                styles.stepTitle,
                activeStep >= step.id && styles.activeStepTitle
              ]}>
                {step.title}
              </Text>
              {index < steps.length - 1 && (
                <View style={[
                  styles.stepLine,
                  activeStep > step.id && styles.activeStepLine
                ]} />
              )}
            </View>
          ))}
        </View>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          {activeStep > 1 && (
            <Button
              title="Previous"
              onPress={handlePrevious}
              variant="outline"
              size="large"
              style={styles.navButton}
            />
          )}
          {activeStep < 4 ? (
            <Button
              title="Next"
              onPress={handleNext}
              size="large"
              style={styles.navButton}
              disabled={!canProceed()}
            />
          ) : (
          <Button
              title="Deploy Token"
              onPress={handleDeploy}
            size="large"
              style={styles.navButton}
          />
          )}
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
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeStepButton: {
    backgroundColor: '#667eea',
    borderColor: '#fff',
  },
  stepTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
    textAlign: 'center',
  },
  activeStepTitle: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  stepLine: {
    position: 'absolute',
    top: 24,
    right: -width / 8,
    width: width / 4,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeStepLine: {
    backgroundColor: '#667eea',
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  hookFeature: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  featureDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 80) / 2,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  featureCardTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  featureCardDesc: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedToken: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  feeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  feeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  selectedFeeOption: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  feeOptionText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  selectedFeeOptionText: {
    color: '#fff',
  },
  poolPreview: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  poolPair: {
    alignItems: 'center',
    marginBottom: 16,
  },
  poolPairText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 4,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  poolType: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  poolStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  poolStat: {
    alignItems: 'center',
    flex: 1,
  },
  poolStatLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  poolStatValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
}); 