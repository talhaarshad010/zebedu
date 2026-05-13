import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  FlatList
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { DashboardHeader, CourseCard } from '../../components/student/DashboardComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CATEGORIES = ['Technology', 'Business', 'Design', 'Health', 'Science'];

const CONTINUE_LEARNING = [
  { 
    id: '1', 
    title: 'Full Stack Web Dev', 
    instructor: 'Sir Tariq', 
    progress: 65, 
    language: 'Urdu',
    image: require('../../assets/images/mobile_app.png')
  },
  { 
    id: '2', 
    title: 'UI/UX Design Masterclass', 
    instructor: 'Ahmed Ali', 
    progress: 30, 
    language: 'Sindhi',
    image: require('../../assets/images/ui_ux.png')
  },
];

const POPULAR_COURSES = [
  { id: '3', title: 'Mobile App Marketing', instructor: 'Sara Khan', rating: 4.8, language: 'English', price: 'Free', image: require('../../assets/images/mobile_app.png') },
  { id: '4', title: 'Data Science with Python', instructor: 'Zubair Shah', rating: 4.9, language: 'Urdu', price: 'PKR 1200', image: require('../../assets/images/data_science.png') },
  { id: '5', title: 'Graphic Design Basics', instructor: 'Irfan Junejo', rating: 4.7, language: 'Punjabi', price: 'Free', image: require('../../assets/images/ui_ux.png') },
];

export const DashboardScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('Technology');

  return (
    <SafeScreen>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader name="Ahmed" />

        <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
          <Ionicons name="search-outline" size={20} color={colors.textSecondary} style={{ marginRight: 12 }} />
          <TextInput 
            placeholder="Search courses, instructors..." 
            placeholderTextColor={colors.textSecondary + '80'}
            style={[styles.searchInput, { color: colors.text, ...typography.bodyMedium }]}
          />
          <TouchableOpacity onPress={() => navigation.navigate('SearchResults', { query: '' })}>
            <Ionicons name="mic-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={[styles.banner, { backgroundColor: colors.primary }]}>
            <View style={styles.bannerText}>
              <Text style={[typography.h2, { color: '#FFF' }]}>Master New Skills</Text>
              <Text style={[typography.bodyMedium, { color: '#E8F0FB', marginTop: 4 }]}>
                Get 50% off on your first pro course!
              </Text>
              <TouchableOpacity style={styles.bannerBtn} onPress={() => navigation.navigate('Courses')}>
                <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '700' }]}>
                  Explore Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 16 }]}>Continue Learning</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CONTINUE_LEARNING.map((course) => (
              <CourseCard 
                key={course.id} 
                {...course} 
                horizontal 
                onPress={() => navigation.navigate('VideoPlayer', { course })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 16 }]}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity 
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.categoryChip, 
                  { 
                    backgroundColor: selectedCategory === cat ? colors.primary : colors.surface,
                    borderColor: colors.border
                  }
                ]}
              >
                <Text style={[
                  typography.bodySmall, 
                  { color: selectedCategory === cat ? '#FFF' : colors.text, fontWeight: '600' }
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.h3, { color: colors.text }]}>Popular Courses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
              <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>See All</Text>
            </TouchableOpacity>
          </View>
          {POPULAR_COURSES.map((course) => (
            <CourseCard 
              key={course.id} 
              {...course} 
              onPress={() => navigation.navigate('Courses', { 
                screen: 'CourseDetail',
                params: { course }
              })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  searchContainer: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    height: '100%',
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
  banner: {
    height: 160,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
  },
  bannerText: {
    width: '70%',
  },
  bannerBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
});
