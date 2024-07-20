import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import colors from '../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const Onboarding: React.FC<Props> = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start animation when component mounts
    Animated.timing(scaleAnim, {
      toValue: 0.5,
      duration: 2500,
      useNativeDriver: true,
    }).start(() =>
      // Animation completed, navigate to Home Screen
      navigation.navigate('Home')
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoAndText}>
        <View style={styles.animatedImage}>
          <Animated.Image
            source={require('../assets/vector.png')}
            style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
          />
        </View>
        <View>
          <Text style={styles.logoText}>Z COINS</Text>
        </View>
      </View>
      <Text style={styles.footerText}>BiLira Cryptocurrency Exchange</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedImage: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  container: {
    flex: 1,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14.52,
    marginBottom: 30,
    textAlign: 'center',
  },
  image: {
    height: 150,
    width: 150, // Adjust image size based on your design
  },
  logoAndText: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '700',
    justifyContent: 'flex-end',
    textAlign: 'left',
  },
});

export default Onboarding;
