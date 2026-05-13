import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing
} from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';

type SplashScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Splash'>;
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
    scale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <SafeScreen containerStyle={{ backgroundColor: colors.primary }}>
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, animatedStyle]}>
          {/* <Image 
            source={require('../../assets/brand/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          /> */}
          <Text style={[typography.h1, { color: '#FFFFFF', marginTop: 16 }]}>Zebedu</Text>
          <Text style={[typography.bodyMedium, { color: '#E8F0FB', marginTop: 8 }]}>
            Learn in Your Language
          </Text>
        </Animated.View>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
  },
});
