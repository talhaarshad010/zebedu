import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const MyLearningScreen = () => {
  const { colors, typography } = useTheme();
  const [activeTab, setActiveTab] = useState('In Progress');

  const COURSES = [
    { id: '1', title: 'React Native for Pros', instructor: 'Sir Tariq', progress: 65, status: 'In Progress', image: require('../../assets/images/mobile_app.png') },
    { id: '2', title: 'Sindhi Language Masterclass', instructor: 'Ahmed Ali', progress: 100, status: 'Completed', image: require('../../assets/images/ui_ux.png') },
    { id: '3', title: 'UI Design Fundamentals', instructor: 'Sara Khan', progress: 0, status: 'Saved', image: require('../../assets/images/ui_ux.png') },
  ];

  const filteredCourses = COURSES.filter(c => c.status === activeTab);

  return (
    <SafeScreen>
      <View style={styles.header}>
        <Text style={[typography.h1, { color: colors.text }]}>My Learning</Text>
        <View style={styles.tabRow}>
          {['In Progress', 'Completed', 'Saved'].map((tab) => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, { borderBottomColor: activeTab === tab ? colors.primary : 'transparent' }]}
            >
              <Text style={[
                typography.bodyMedium, 
                { color: activeTab === tab ? colors.primary : colors.textSecondary, fontWeight: '600' }
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <TouchableOpacity 
              key={course.id} 
              style={[styles.learningCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={[styles.thumbnail, { backgroundColor: colors.secondary }]}>
                {course.image && <Image source={course.image} style={styles.thumbnailImage} resizeMode="cover" />}
              </View>
              <View style={styles.info}>
                <Text style={[typography.h3, { color: colors.text }]} numberOfLines={1}>{course.title}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>{course.instructor}</Text>
                
                {activeTab === 'In Progress' && (
                  <View style={styles.progressRow}>
                    <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                      <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${course.progress}%` }]} />
                    </View>
                    <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>{course.progress}%</Text>
                  </View>
                )}

                {activeTab === 'Completed' && (
                  <TouchableOpacity style={[styles.certificateBtn, { borderColor: colors.primary }]}>
                    <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>Get Certificate</Text>
                  </TouchableOpacity>
                )}

                {activeTab === 'Saved' && (
                  <TouchableOpacity style={[styles.resumeBtn, { backgroundColor: colors.primary }]}>
                    <Text style={[typography.caption, { color: '#FFF', fontWeight: '700' }]}>Enroll Now</Text>
                  </TouchableOpacity>
                )}
              </View>
              {activeTab === 'In Progress' && (
                <TouchableOpacity style={styles.resumeIcon}>
                  <Ionicons name="play-circle" size={32} color={colors.primary} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
              <Ionicons name="search-outline" size={48} color={colors.textSecondary} />
            </View>
            <Text style={[typography.h3, { color: colors.text }]}>No courses found</Text>
            <Text style={[typography.bodySmall, { color: colors.textSecondary, textAlign: 'center', marginTop: 8 }]}>
              You haven't added any courses to this section yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 24,
    paddingBottom: 0,
  },
  tabRow: {
    flexDirection: 'row',
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingBottom: 12,
    marginRight: 32,
    borderBottomWidth: 2,
  },
  listContent: {
    padding: 24,
  },
  learningCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  emptyIconBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
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
  resumeIcon: {
    marginLeft: 12,
  },
  certificateBtn: {
    marginTop: 12,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  resumeBtn: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});
