import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { CourseCard } from '../../components/student/DashboardComponents';
import { Button } from '../../components/common/FormComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- Browse Courses Screen ---
export const BrowseCoursesScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  const [filter, setFilter] = useState('All');

  const COURSES = [
    { id: '1', title: 'Advanced React Native', instructor: 'Sir Tariq', rating: 4.9, language: 'Urdu', price: 'PKR 1500', image: require('../../assets/images/mobile_app.png') },
    { id: '2', title: 'Sindhi Literature 101', instructor: 'Prof. Jamali', rating: 4.8, language: 'Sindhi', price: 'Free', image: require('../../assets/images/ui_ux.png') },
    { id: '3', title: 'Digital Marketing', instructor: 'Amna Sheikh', rating: 4.7, language: 'English', price: 'PKR 800', image: require('../../assets/images/ui_ux.png') },
    { id: '4', title: 'Python for Beginners', instructor: 'Ali Raza', rating: 4.9, language: 'Urdu', price: 'Free', image: require('../../assets/images/data_science.png') },
  ];

  return (
    <SafeScreen>
      <View style={styles.header}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Ionicons name="search" size={16} color={colors.textSecondary} />
          <TextInput 
            placeholder="Search courses..." 
            style={[styles.searchInput, { color: colors.text, ...typography.bodyMedium }]}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['All', 'Technology', 'Business', 'Design', 'Language'].map((item) => (
            <TouchableOpacity 
              key={item} 
              onPress={() => setFilter(item)}
              style={[
                styles.filterChip, 
                { backgroundColor: filter === item ? colors.primary : colors.surface }
              ]}
            >
              <Text style={[
                typography.caption, 
                { color: filter === item ? '#FFF' : colors.text, fontWeight: '600' }
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        <View style={styles.grid}>
          {COURSES.map((course) => (
            <View key={course.id} style={{ width: '48%', marginBottom: 16 }}>
              <CourseCard 
                {...course} 
                onPress={() => navigation.navigate('CourseDetail', { course })} 
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

// --- Course Detail Screen ---
export const CourseDetailScreen = ({ route, navigation }: any) => {
  const { colors, typography } = useTheme();
  const { course } = route.params || { course: { title: 'Course Detail', instructor: 'Instructor', language: 'Urdu', rating: 4.8, price: 'Free' } };
  const [activeTab, setActiveTab] = useState('Overview');

  const CURRICULUM = [
    { title: 'Introduction', items: ['Welcome to the course', 'What you will learn'] },
    { title: 'Getting Started', items: ['Installation', 'Basic Concepts', 'First Project'] },
  ];

  return (
    <SafeScreen>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={[styles.detailThumbnail, { backgroundColor: colors.secondary }]}>
          {course.image && <Image source={course.image} style={styles.detailThumbnailImage} resizeMode="cover" />}
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={[styles.backFab, { backgroundColor: '#FFFFFF' }]}
          >
            <Ionicons name="arrow-back" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailContent}>
          <View style={styles.badgeRow}>
            <View style={[styles.langBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.langText}>{course.language}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={{ color: '#F59E0B', marginLeft: 4 }}>{course.rating} (1.2k reviews)</Text>
            </View>
          </View>

          <Text style={[typography.h1, { color: colors.text, marginTop: 12 }]}>{course.title}</Text>
          
          <View style={styles.instructorRow}>
            <View style={[styles.avatarMini, { backgroundColor: colors.primary }]}>
              <Text style={{ color: '#FFF' }}>{course.instructor[0]}</Text>
            </View>
            <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginLeft: 12 }]}>
              by <Text style={{ color: colors.text, fontWeight: '600' }}>{course.instructor}</Text>
            </Text>
          </View>

          <View style={styles.tabRow}>
            {['Overview', 'Curriculum', 'Reviews'].map((tab) => (
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

          <View style={styles.tabContent}>
            {activeTab === 'Overview' && (
              <View>
                <Text style={[typography.bodyMedium, { color: colors.textSecondary, lineHeight: 24 }]}>
                  This comprehensive course will take you from a complete beginner to a confident professional. 
                  Learn real-world skills through hands-on projects and expert guidance.
                </Text>
                <Text style={[typography.h3, { color: colors.text, marginTop: 24, marginBottom: 12 }]}>What you'll learn</Text>
                {['Industry best practices', 'Modern workflow', 'Real-world projects'].map((item) => (
                  <View key={item} style={styles.bulletRow}>
                    <Text style={{ color: colors.primary, marginRight: 10 }}>✓</Text>
                    <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'Curriculum' && (
              <View>
                {CURRICULUM.map((section, idx) => (
                  <View key={idx} style={styles.sectionItem}>
                    <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: '700', marginBottom: 12 }]}>
                      {section.title}
                    </Text>
                    {section.items.map((item, i) => (
                      <View key={i} style={[styles.lectureRow, { borderBottomColor: colors.border }]}>
                        <Ionicons name="videocam" size={18} color={colors.primary} style={{ marginRight: 12 }} />
                        <Text style={[typography.bodySmall, { color: colors.textSecondary, flex: 1 }]}>{item}</Text>
                        <Text style={[typography.caption, { color: colors.textSecondary }]}>5:00</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.stickyFooter, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <View>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>Total Price</Text>
          <Text style={[typography.h2, { color: colors.text }]}>{course.price}</Text>
        </View>
        <Button 
          title="Enroll Now" 
          onPress={() => {}} 
          style={{ width: '60%' }}
        />
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  searchBar: {
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
  },
  filterScroll: {
    marginTop: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  listContent: {
    padding: 24,
    paddingTop: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailThumbnail: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  detailThumbnailImage: {
    width: '100%',
    height: '100%',
  },
  backFab: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  detailContent: {
    padding: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  langText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  avatarMini: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 24,
  },
  tab: {
    paddingBottom: 12,
    marginRight: 32,
    borderBottomWidth: 2,
  },
  tabContent: {
    paddingBottom: 100,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionItem: {
    marginBottom: 24,
  },
  lectureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
  },
});
