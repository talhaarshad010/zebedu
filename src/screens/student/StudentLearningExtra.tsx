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
import { Button } from '../../components/common/FormComponents';

const { width } = Dimensions.get('window');

// --- Quiz Screen ---
export const QuizScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const QUESTIONS = [
    {
      q: "What is the primary language used for React Native development?",
      options: ["Java", "Swift", "JavaScript/TypeScript", "Python"],
      correct: 2
    },
    {
      q: "Which component is used for scrolling in React Native?",
      options: ["ScrollLayout", "ScrollView", "ListView", "FlatListOnly"],
      correct: 1
    }
  ];

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <SafeScreen>
        <View style={styles.resultsContainer}>
          <Text style={{ fontSize: 80, marginBottom: 20 }}>🎉</Text>
          <Text style={[typography.h1, { color: colors.text }]}>Quiz Completed!</Text>
          <Text style={[typography.bodyLarge, { color: colors.textSecondary, marginTop: 12 }]}>Your Score</Text>
          <View style={[styles.scoreCircle, { borderColor: colors.primary }]}>
            <Text style={[typography.h1, { color: colors.primary, fontSize: 48 }]}>80%</Text>
          </View>
          <Button 
            title="Back to Course" 
            onPress={() => navigation.goBack()} 
            style={{ width: '100%', marginTop: 40 }}
          />
          <TouchableOpacity onPress={() => setShowResults(false)} style={{ marginTop: 20 }}>
            <Text style={[typography.bodyMedium, { color: colors.primary, fontWeight: '600' }]}>Retake Quiz</Text>
          </TouchableOpacity>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <View style={styles.quizHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20 }}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressHeader}>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>Question {currentQuestion + 1} of {QUESTIONS.length}</Text>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }]} />
          </View>
        </View>
        <Text style={[typography.bodySmall, { color: colors.error, fontWeight: '700' }]}>12:45</Text>
      </View>

      <ScrollView contentContainerStyle={styles.quizContent}>
        <Text style={[typography.h2, { color: colors.text, marginBottom: 32 }]}>
          {QUESTIONS[currentQuestion].q}
        </Text>

        {QUESTIONS[currentQuestion].options.map((option, idx) => (
          <TouchableOpacity 
            key={idx}
            onPress={() => setSelectedOption(idx)}
            style={[
              styles.optionCard, 
              { 
                backgroundColor: selectedOption === idx ? colors.primary + '15' : colors.card,
                borderColor: selectedOption === idx ? colors.primary : colors.border
              }
            ]}
          >
            <View style={[
              styles.optionLabel, 
              { backgroundColor: selectedOption === idx ? colors.primary : colors.surface }
            ]}>
              <Text style={{ color: selectedOption === idx ? '#FFF' : colors.text, fontWeight: '700' }}>
                {String.fromCharCode(65 + idx)}
              </Text>
            </View>
            <Text style={[typography.bodyMedium, { color: colors.text, flex: 1, marginLeft: 16 }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.quizFooter}>
        <Button 
          title={currentQuestion === QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"} 
          onPress={handleNext}
          disabled={selectedOption === null}
        />
      </View>
    </SafeScreen>
  );
};

// --- Attendance Screen ---
export const AttendanceScreen = () => {
  const { colors, typography } = useTheme();

  const STATS = [
    { label: 'Attendance', value: '92%', color: '#16A34A' },
    { label: 'Present', value: '24', color: '#16A34A' },
    { label: 'Absent', value: '02', color: '#DC2626' },
  ];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.attendanceContainer} showsVerticalScrollIndicator={false}>
        <Text style={[typography.h1, { color: colors.text, marginBottom: 24 }]}>Attendance</Text>

        <View style={[styles.calendarCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.calendarHeader}>
            <Text style={[typography.h3, { color: colors.text }]}>May 2026</Text>
            <View style={styles.calendarNav}>
              <TouchableOpacity><Text>‹</Text></TouchableOpacity>
              <TouchableOpacity><Text style={{ marginLeft: 20 }}>›</Text></TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.calendarGrid}>
            {/* Simple Grid Placeholder */}
            {Array.from({ length: 31 }).map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.dayBox, 
                  { 
                    backgroundColor: i % 7 === 0 ? colors.error + '20' : (i % 5 === 0 ? colors.border : colors.success + '20'),
                    borderColor: i % 7 === 0 ? colors.error : (i % 5 === 0 ? colors.border : colors.success)
                  }
                ]}
              >
                <Text style={[typography.caption, { color: colors.text, fontWeight: '700' }]}>{i + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsRow}>
          {STATS.map((stat, idx) => (
            <View key={idx} style={[styles.attStatCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[typography.h2, { color: stat.color }]}>{stat.value}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 16 }]}>Recent Sessions</Text>
          {[1, 2, 3].map((i) => (
            <View key={i} style={[styles.sessionRow, { borderBottomColor: colors.border }]}>
              <View style={styles.sessionInfo}>
                <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: '600' }]}>Web Development - Lecture {i}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>May {10 + i}, 2026 • 10:00 AM</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                <Text style={{ color: colors.success, fontSize: 10, fontWeight: 'bold' }}>PRESENT</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  progressHeader: {
    flex: 1,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    width: '100%',
    borderRadius: 3,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  quizContent: {
    padding: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  optionLabel: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  attendanceContainer: {
    padding: 24,
  },
  calendarCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarNav: {
    flexDirection: 'row',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  dayBox: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  attStatCard: {
    width: '31%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  sessionInfo: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
