import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
  theme?: 'dark' | 'light';
  height?: number;
  onLoad?: () => void;
  onError?: (error: any) => void;
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol = 'CRYPTOCAP:SOL',
  interval = '5',
  theme = 'dark',
  height = 300,
  onLoad,
  onError,
}) => {
  const webViewRef = useRef<WebView>(null);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TradingView Chart</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: ${theme === 'dark' ? '#0a0a0a' : '#ffffff'};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
          }
          #tradingview_widget {
            height: 100vh !important;
            width: 100vw !important;
            min-height: 100vh;
            min-width: 100vw;
          }
        </style>
      </head>
      <body>
        <div id="tradingview_widget"></div>
        
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
          new TradingView.widget({
            "width": "100%",
            "height": "100%",
            "symbol": "${symbol}",
            "interval": "${interval}",
            "timezone": "Asia/Kolkata",
            "theme": "${theme}",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "${theme === 'dark' ? '#1a1a1a' : '#ffffff'}",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_legend": true,
            "save_image": false,
            "container_id": "tradingview_widget",
            "studies": [],
            "autosize": true,
            "overrides": {
              "mainSeriesProperties.candleStyle.upColor": "#51cf66",
              "mainSeriesProperties.candleStyle.downColor": "#ff6b6b",
              "mainSeriesProperties.candleStyle.borderUpColor": "#51cf66",
              "mainSeriesProperties.candleStyle.borderDownColor": "#ff6b6b",
              "mainSeriesProperties.candleStyle.wickUpColor": "#51cf66",
              "mainSeriesProperties.candleStyle.wickDownColor": "#ff6b6b"
            }
          });
        </script>
      </body>
    </html>
  `;

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = (error: any) => {
    if (onError) {
      onError(error);
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webview}
        onLoad={handleLoad}
        onError={handleError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={false}
        bounces={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="compatibility"
        allowsBackForwardNavigationGestures={false}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
        onMessage={(event) => console.log('WebView message:', event.nativeEvent.data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#0a0a0a',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 