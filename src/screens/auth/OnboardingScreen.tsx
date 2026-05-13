import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';

const { width } = Dimensions.get('window');

type OnboardingScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Onboarding'>;
};

const slides = [
  {
    id: 1,
    title: 'Access 1000+ Courses',
    description: 'Learn from industry experts and top instructors in your local language.',
    icon: '📚',
    color: '#0D4DA1',
  },
  {
    id: 2,
    title: 'In Urdu, Sindhi & More',
    description: 'Language is no longer a barrier to your education and career growth.',
    icon: '🌍',
    color: '#16A34A',
  },
  {
    id: 3,
    title: 'Learn at Your Own Pace',
    description: 'Flexible schedules and lifetime access to all enrolled courses.',
    icon: '⏱️',
    color: '#F59E0B',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const { colors, typography, isDark } = useTheme();
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < slides.length - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    } else {
      navigation.navigate('SignIn');
    }
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={[typography.bodyMedium, { color: colors.primary, fontWeight: '600' }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.page}>
            <View style={[styles.iconContainer, { backgroundColor: slide.color + '15' }]}>
              <Text style={styles.iconText}>{slide.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[typography.h1, { color: colors.text, textAlign: 'center' }]}>
                {slide.title}
              </Text>
              <Text style={[typography.bodyLarge, { 
                color: colors.textSecondary, 
                textAlign: 'center', 
                marginTop: 16,
                paddingHorizontal: 20
              }]}>
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </PagerView>

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { 
                  backgroundColor: currentPage === index ? colors.primary : colors.border,
                  width: currentPage === index ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <Text style={[typography.button, { color: '#FFFFFF' }]}>
            {currentPage === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('SignIn')}
          style={styles.loginLink}
        >
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
            Already have an account? <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconText: {
    fontSize: 80,
  },
  textContainer: {
    alignItems: 'center',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
});
