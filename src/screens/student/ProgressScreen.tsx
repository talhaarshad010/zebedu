import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';

export const ProgressScreen = () => {
  const { colors, typography } = useTheme();

  const STATS = [
    { label: 'Enrolled', value: '12', icon: '📚' },
    { label: 'Completed', value: '04', icon: '🏆' },
    { label: 'Hours', value: '45h', icon: '⏱️' },
  ];

  const BADGES = [
    { name: 'First Lesson', icon: '🎓', unlocked: true },
    { name: '7 Day Streak', icon: '🔥', unlocked: true },
    { name: 'Early Bird', icon: '🌅', unlocked: false },
    { name: 'Top Learner', icon: '🌟', unlocked: false },
  ];

  const WEEKLY_ACTIVITY = [
    { day: 'M', mins: 45 },
    { day: 'T', mins: 30 },
    { day: 'W', mins: 60 },
    { day: 'T', mins: 20 },
    { day: 'F', mins: 40 },
    { day: 'S', mins: 10 },
    { day: 'S', mins: 0 },
  ];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[typography.h1, { color: colors.text, marginBottom: 24 }]}>My Progress</Text>

        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 20 }]}>Weekly Activity</Text>
          <View style={styles.chart}>
            {WEEKLY_ACTIVITY.map((item, idx) => (
              <View key={idx} style={styles.barContainer}>
                <View style={[
                  styles.bar, 
                  { 
                    height: (item.mins / 60) * 100, 
                    backgroundColor: colors.primary,
                    opacity: item.mins === 0 ? 0.2 : 1
                  }
                ]} />
                <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 8 }]}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsRow}>
          {STATS.map((stat, idx) => (
            <View key={idx} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</Text>
              <Text style={[typography.h2, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 16 }]}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {BADGES.map((badge, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.badgeCard, 
                  { backgroundColor: colors.surface, opacity: badge.unlocked ? 1 : 0.4 }
                ]}
              >
                <Text style={{ fontSize: 32, marginBottom: 8 }}>{badge.icon}</Text>
                <Text style={[typography.caption, { color: colors.text, fontWeight: '600', textAlign: 'center' }]}>
                  {badge.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 16 }]}>Course Progress</Text>
          {[1, 2].map((i) => (
            <View key={i} style={[styles.courseProgress, { borderBottomColor: colors.border }]}>
              <View style={styles.courseHeader}>
                <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: '600' }]}>
                  {i === 1 ? 'Advanced React Native' : 'Digital Marketing Pro'}
                </Text>
                <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>
                  {i === 1 ? '65%' : '20%'}
                </Text>
              </View>
              <View style={[styles.fullProgressBar, { backgroundColor: colors.border }]}>
                <View style={[styles.fullProgressFill, { backgroundColor: colors.primary, width: i === 1 ? '65%' : '20%' }]} />
              </View>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 8 }]}>
                Last activity: {i === 1 ? '2 hours ago' : 'Yesterday'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  chartCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: 'center',
    width: 30,
  },
  bar: {
    width: 12,
    borderRadius: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    width: '31%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  section: {
    marginBottom: 32,
  },
  badgeCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    padding: 10,
  },
  courseProgress: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fullProgressBar: {
    height: 8,
    borderRadius: 4,
  },
  fullProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
