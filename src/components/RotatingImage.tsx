import React from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';
import Svg from 'react-native-svg';


const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const RotatingImage: React.FC = () => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
            <Image source={require('../assets/vector.png')} style={styles.image} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Adjust as needed
  },
});

export default RotatingImage;
