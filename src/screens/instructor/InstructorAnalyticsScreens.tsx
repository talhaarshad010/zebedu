import React, { useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- View Student Progress Screen ---
export const ViewStudentProgressScreen = () => {
  const { colors, typography } = useTheme();

  const STUDENTS = [
    { id: '1', name: 'Zubair Shah', progress: 85, lastActive: '2 mins ago' },
    { id: '2', name: 'Sara Khan', progress: 40, lastActive: '15 mins ago' },
    { id: '3', name: 'Ali Raza', progress: 10, lastActive: '1 hour ago' },
  ];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[typography.h1, { color: colors.text, marginBottom: 24 }]}>Student Progress</Text>
        
        <View style={[styles.filterBar, { backgroundColor: colors.surface }]}>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>Filter by: Most Recent</Text>
        </View>

        {STUDENTS.map((student) => (
          <TouchableOpacity key={student.id} style={[styles.studentCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
              <Text style={{ fontWeight: '700' }}>{student.name[0]}</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: '600' }]}>{student.name}</Text>
              <View style={styles.progressRow}>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${student.progress}%` }]} />
                </View>
                <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>{student.progress}%</Text>
              </View>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>Last active: {student.lastActive}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeScreen>
  );
};

// --- Course Insights Screen ---
export const CourseInsightsScreen = () => {
  const { colors, typography } = useTheme();

  const INSIGHTS = [
    { label: 'Avg. Completion', value: '72%', icon: 'trending-up-outline' },
    { label: 'Avg. Quiz Score', value: '84%', icon: 'document-text-outline' },
    { label: 'Engagement', value: 'High', icon: 'flame-outline' },
  ];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[typography.h1, { color: colors.text, marginBottom: 24 }]}>Course Insights</Text>

        <View style={styles.insightsGrid}>
          {INSIGHTS.map((item, idx) => (
            <View key={idx} style={[styles.insightCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.insightIcon, { backgroundColor: colors.primary + '10' }]}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[typography.h2, { color: colors.text }]}>{item.value}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 16 }]}>Lecture Drop-off Rate</Text>
          <View style={[styles.barChart, { backgroundColor: colors.surface }]}>
            {[80, 75, 70, 50, 45].map((val, i) => (
              <View key={i} style={styles.chartCol}>
                <View style={[styles.chartBar, { height: val, backgroundColor: colors.primary }]} />
                <Text style={[typography.caption, { marginTop: 8 }]}>L{i+1}</Text>
              </View>
            ))}
          </View>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 12, textAlign: 'center' }]}>
            Lectures 4 & 5 show a significant drop-off. Consider revising content.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 16 }]}>Recent Student Feedback</Text>
          {[1, 2].map((i) => (
            <View key={i} style={[styles.feedbackCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons key={s} name="star" size={14} color="#F59E0B" style={{ marginRight: 2 }} />
                ))}
              </View>
              <Text style={[typography.bodySmall, { color: colors.text, lineHeight: 20 }]}>
                "The explanations in Urdu are very helpful. I finally understand React hooks!"
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 8 }]}>— Ahmed Ali, 2 days ago</Text>
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
  filterBar: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  insightsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  insightCard: {
    width: '31%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  insightIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  section: {
    marginBottom: 32,
  },
  barChart: {
    height: 150,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    padding: 20,
  },
  chartCol: {
    alignItems: 'center',
  },
  chartBar: {
    width: 20,
    borderRadius: 4,
  },
  feedbackCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
});
