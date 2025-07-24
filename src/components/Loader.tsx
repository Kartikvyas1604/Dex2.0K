import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export const Loader: React.FC<{ size?: number }> = ({ size = 45 }) => {
  const anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  }, [anim]);

  // Calculate animated background positions for 3 columns
  const interpolate = (start: number) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

  return (
    <View style={[styles.wrapper, { width: size, height: size * 0.89 }]}> 
      <Animated.View
        style={[
          styles.bar,
          {
            left: 0,
            backgroundColor: '#fff',
            height: '66%',
            top: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '34%'] }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          {
            left: size * 0.5 - 5,
            backgroundColor: '#fff',
            height: '66%',
            top: anim.interpolate({ inputRange: [0, 1], outputRange: ['17%', '51%'] }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          {
            left: size - 10,
            backgroundColor: '#fff',
            height: '66%',
            top: anim.interpolate({ inputRange: [0, 1], outputRange: ['34%', '68%'] }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bar: {
    position: 'absolute',
    width: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});

export default Loader; 