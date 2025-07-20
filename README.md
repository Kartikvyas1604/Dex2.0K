# DEX Screener - Solana Token-2022 Analytics

A React Native mobile application that provides comprehensive analytics and trading information for Solana Token-2022 program tokens, similar to DEX Screener but specifically focused on Solana's ecosystem.

## Features

### 🏠 Home Screen
- **Token Discovery**: Browse trending tokens with real-time price data
- **Search Functionality**: Search by token name or address
- **Advanced Filters**: Filter by trending, gainers, losers, volume, and liquidity
- **Timeframe Selection**: View data for 5m, 1h, 6h, and 24h periods
- **Market Overview**: Quick stats on total market cap, volume, and active pairs

### 📊 Analytics Screen
- **Market Insights**: Comprehensive market analytics and trends
- **Performance Metrics**: Track top gainers, losers, and high-volume tokens
- **Market Statistics**: Real-time market cap, volume, and pair statistics
- **Trend Analysis**: Visual indicators for market trends

### 🔄 Trading Pairs Screen
- **Pair Discovery**: Browse all trading pairs across multiple DEXes
- **DEX Filtering**: Filter by Raydium, Orca, Jupiter, and other DEXes
- **Detailed Pair Info**: Price, volume, liquidity, and market cap data
- **Quick Actions**: Chart view, trade, and detailed information access

### 💱 Swap Screen
- **Token Swapping**: Direct token-to-token swaps
- **Price Impact**: Real-time price impact calculations
- **Slippage Settings**: Customizable slippage tolerance
- **Transaction History**: Track your swap history

### 👤 Profile Screen
- **Wallet Management**: Connect and manage your Solana wallet
- **Portfolio Overview**: View your token holdings and performance
- **Transaction History**: Complete history of your trades
- **Settings**: Customize notifications, appearance, and security

## Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: React Native StyleSheet with custom design system
- **Fonts**: Space Grotesk (Google Fonts)
- **Icons**: Custom SVG icon system
- **State Management**: React Hooks (useState, useEffect)

## Key Components

### Screens
- `HomeScreen`: Token discovery and trending analysis
- `AnalyticsScreen`: Market insights and performance metrics
- `PoolsScreen`: Trading pairs and DEX information
- `SwapScreen`: Token swapping interface
- `TokenDetailScreen`: Detailed token information and charts
- `ProfileScreen`: User profile and wallet management

### Components
- `Header`: Navigation header with back button support
- `BottomTabBar`: Main navigation tabs
- `Card`: Reusable card component for content sections
- `AppIcon`: Custom icon system
- `TokenLogo`: Token logo display component
- `Button`: Reusable button component

## Design System

### Colors
- **Primary Background**: `#0a0a0a` (Dark theme)
- **Card Background**: `rgba(255, 255, 255, 0.05)`
- **Primary Accent**: `#667eea`
- **Success**: `#51cf66`
- **Error**: `#ff6b6b`
- **Warning**: `#ffd43b`

### Typography
- **Font Family**: Space Grotesk
- **Weights**: Light, Regular, Medium, SemiBold, Bold
- **Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 28px, 36px

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start Development Server**
   ```bash
   npx expo start
   ```

3. **Run on Device/Simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Main application screens
├── utils/              # Utility functions and constants
└── assets/             # Images, fonts, and static assets
```

## Features in Development

- [ ] Real-time price charts with TradingView integration
- [ ] Push notifications for price alerts
- [ ] Advanced portfolio analytics
- [ ] Social features and token discussions
- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] Dark/Light theme toggle
- [ ] Offline mode support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This application is for educational and informational purposes only. It does not constitute financial advice. Always do your own research before making investment decisions. 