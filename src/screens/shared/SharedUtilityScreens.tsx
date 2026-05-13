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
import { CourseCard } from '../../components/student/DashboardComponents';

// --- Notifications Screen ---
export const NotificationsScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();

  const NOTIFICATIONS = [
    { id: '1', title: 'New Enrollment', message: 'Zubair Shah enrolled in your course!', time: '2 mins ago', type: 'enrolment', read: false },
    { id: '2', title: 'Course Update', message: 'Sir Tariq uploaded a new lecture.', time: '1 hour ago', type: 'update', read: true },
    { id: '3', title: 'Quiz Reminder', message: 'You have a pending quiz in UI Design.', time: '5 hours ago', type: 'reminder', read: false },
  ];

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 24 }}>⬅️</Text>
        </TouchableOpacity>
        <Text style={[typography.h2, { color: colors.text, marginLeft: 20 }]}>Notifications</Text>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {NOTIFICATIONS.map((notif) => (
          <TouchableOpacity 
            key={notif.id} 
            style={[
              styles.notifCard, 
              { 
                backgroundColor: notif.read ? colors.background : colors.primary + '10',
                borderLeftColor: notif.read ? 'transparent' : colors.primary
              }
            ]}
          >
            <View style={[styles.notifIcon, { backgroundColor: colors.surface }]}>
              <Text>{notif.type === 'enrolment' ? '👤' : notif.type === 'update' ? '📹' : '📝'}</Text>
            </View>
            <View style={styles.notifText}>
              <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: notif.read ? '500' : '700' }]}>
                {notif.title}
              </Text>
              <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: 2 }]}>
                {notif.message}
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 8 }]}>
                {notif.time}
              </Text>
            </View>
            {!notif.read && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeScreen>
  );
};

// --- Search Results Screen ---
export const SearchResultsScreen = ({ route, navigation }: any) => {
  const { colors, typography } = useTheme();
  const [query, setQuery] = useState(route.params?.query || '');

  const RESULTS = [
    { id: '1', title: 'React Native for Pros', instructor: 'Sir Tariq', rating: 4.9, language: 'Urdu', price: 'PKR 1500' },
    { id: '2', title: 'UI Design Basics', instructor: 'Sara Khan', rating: 4.7, language: 'English', price: 'Free' },
  ];

  return (
    <SafeScreen>
      <View style={styles.searchHeader}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 18, marginRight: 12 }}>⬅️</Text>
          </TouchableOpacity>
          <TextInput 
            value={query}
            onChangeText={setQuery}
            autoFocus
            style={[styles.searchInput, { color: colors.text, ...typography.bodyMedium }]}
          />
        </View>
      </View>

      <View style={styles.filterRow}>
        {['Courses', 'Instructors', 'Category', 'Language'].map((f) => (
          <TouchableOpacity key={f} style={[styles.filterChip, { borderColor: colors.border }]}>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>{f} ▾</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: 16 }]}>
          {RESULTS.length} results found for "{query}"
        </Text>
        {RESULTS.map((item) => (
          <CourseCard key={item.id} {...item} />
        ))}
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  searchHeader: {
    padding: 24,
    paddingBottom: 0,
  },
  searchBar: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  listContent: {
    padding: 24,
  },
  notifCard: {
    flexDirection: 'row',
    padding: 20,
    borderLeftWidth: 4,
    marginBottom: 2,
    alignItems: 'flex-start',
  },
  notifIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notifText: {
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
});
