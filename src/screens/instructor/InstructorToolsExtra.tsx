import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Switch 
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { Button } from '../../components/common/FormComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Instructor Quizzes Screen ---
export const InstructorQuizzesScreen = () => {
  const { colors, typography } = useTheme();

  const QUIZZES = [
    { id: '1', title: 'React Basics Quiz', course: 'React Native for Pros', attempts: 450, avgScore: '82%' },
    { id: '2', title: 'Mid-term Assessment', course: 'UI Design Masterclass', attempts: 120, avgScore: '75%' },
  ];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[typography.h1, { color: colors.text }]}>Manage Quizzes</Text>
          <Button title="+ Create Quiz" onPress={() => {}} style={{ marginTop: 16 }} />
        </View>

        {QUIZZES.map((quiz) => (
          <View key={quiz.id} style={[styles.quizCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.quizInfo}>
              <Text style={[typography.bodyLarge, { color: colors.text, fontWeight: '700' }]}>{quiz.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>{quiz.course}</Text>
              <View style={styles.quizStats}>
                <Ionicons name="people" size={14} color={colors.textSecondary} />
                <Text style={[typography.caption, { color: colors.textSecondary, marginLeft: 4 }]}>{quiz.attempts} Attempts</Text>
                <Ionicons name="star" size={14} color={colors.primary} style={{ marginLeft: 16 }} />
                <Text style={[typography.caption, { color: colors.primary, fontWeight: '700', marginLeft: 4 }]}>{quiz.avgScore} Avg.</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.actionIcon, { backgroundColor: colors.surface }]}>
              <Ionicons name="pencil" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeScreen>
  );
};

// --- Attendance Management Screen (Instructor) ---
export const InstructorAttendanceScreen = () => {
  const { colors, typography } = useTheme();
  
  const [attendance, setAttendance] = useState<{[key: string]: boolean}>({
    '1': true,
    '2': false,
    '3': true,
  });

  const STUDENTS = [
    { id: '1', name: 'Zubair Shah' },
    { id: '2', name: 'Sara Khan' },
    { id: '3', name: 'Ali Raza' },
  ];

  const toggleAttendance = (id: string) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeScreen>
      <View style={styles.headerPadding}>
        <Text style={[typography.h1, { color: colors.text }]}>Take Attendance</Text>
        <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>May 13, 2026 • React Native Lecture 5</Text>
        <View style={styles.bulkActions}>
          <Button title="Mark All Present" type="outline" onPress={() => {}} style={{ width: '100%' }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listPadding}>
        {STUDENTS.map((student) => (
          <View key={student.id} style={[styles.attendanceRow, { borderBottomColor: colors.border }]}>
            <View style={[styles.avatarSmall, { backgroundColor: colors.surface }]}>
              <Text style={{ fontWeight: '700' }}>{student.name[0]}</Text>
            </View>
            <Text style={[typography.bodyMedium, { color: colors.text, flex: 1, marginLeft: 16 }]}>{student.name}</Text>
            <View style={styles.toggleContainer}>
              <Text style={[typography.caption, { color: attendance[student.id] ? colors.success : colors.error, marginRight: 8, fontWeight: '700' }]}>
                {attendance[student.id] ? 'PRESENT' : 'ABSENT'}
              </Text>
              <Switch 
                value={attendance[student.id]} 
                onValueChange={() => toggleAttendance(student.id)}
                trackColor={{ false: colors.error, true: colors.success }}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footerPadding, { borderTopColor: colors.border }]}>
        <Button title="Save Attendance" onPress={() => {}} />
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  quizInfo: {
    flex: 1,
  },
  quizStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerPadding: {
    padding: 24,
  },
  bulkActions: {
    marginTop: 20,
  },
  listPadding: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  attendanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerPadding: {
    padding: 24,
    borderTopWidth: 1,
  },
});
