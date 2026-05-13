import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { Button } from '../../components/common/FormComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export const InstructorDashboardScreen = () => {
  const { colors, typography } = useTheme();

  const STATS = [
    { label: 'Total Students', value: '1,250', icon: 'people-outline' },
    { label: 'Courses', value: '08', icon: 'book-outline' },
    { label: 'Earnings', value: '$4,200', icon: 'wallet-outline' },
  ];

  const RECENT_ENROLMENTS = [
    { id: '1', name: 'Zubair Shah', course: 'React Native Pro', date: '2 mins ago' },
    { id: '2', name: 'Sara Khan', course: 'UI Design', date: '15 mins ago' },
    { id: '3', name: 'Ali Raza', course: 'Digital Marketing', date: '1 hour ago' },
  ];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[typography.bodyMedium, { color: colors.textSecondary }]}>Welcome back,</Text>
            <Text style={[typography.h2, { color: colors.text }]}>Sir Tariq</Text>
          </View>
          <TouchableOpacity style={[styles.profileMini, { backgroundColor: colors.surface }]}>
            <Ionicons name="person-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          {STATS.map((stat, idx) => (
            <View key={idx} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.statIcon, { backgroundColor: colors.primary + '10' }]}>
                <Ionicons name={stat.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[typography.h3, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.quickActions, { backgroundColor: colors.primary }]}>
          <View style={styles.actionText}>
            <Text style={[typography.h3, { color: '#FFF' }]}>Ready to teach?</Text>
            <Text style={[typography.bodySmall, { color: '#E8F0FB', marginTop: 4 }]}>Create a new course today!</Text>
          </View>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '700' }]}>Create Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.h3, { color: colors.text }]}>Recent Enrolments</Text>
            <TouchableOpacity>
              <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {RECENT_ENROLMENTS.map((item) => (
            <View key={item.id} style={[styles.enrolmentCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.avatarSmall, { backgroundColor: colors.surface }]}>
                <Text style={{ fontWeight: '700' }}>{item.name[0]}</Text>
              </View>
              <View style={styles.enrolmentInfo}>
                <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: '600' }]}>{item.name}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.course}</Text>
              </View>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.date}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 16 }]}>Performance Overview</Text>
          <View style={[styles.chartPlaceholder, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>[ Analytics Chart Placeholder ]</Text>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  profileMini: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
  },
  actionText: {
    flex: 1,
  },
  actionBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  enrolmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enrolmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chartPlaceholder: {
    height: 160,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
