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
import { Button } from '../../components/common/FormComponents';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- Manage Courses Screen ---
export const ManageCoursesScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  const [activeTab, setActiveTab] = useState('Published');

  const MY_COURSES = [
    { id: '1', title: 'React Native for Pros', enrolled: 1250, revenue: 'PKR 45,000', status: 'Published', image: require('../../assets/images/mobile_app.png') },
    { id: '2', title: 'Advanced JavaScript', enrolled: 0, revenue: 'PKR 0', status: 'Draft', image: require('../../assets/images/mobile_app.png') },
    { id: '3', title: 'UI Design Basics', enrolled: 850, revenue: 'PKR 20,000', status: 'Published', image: require('../../assets/images/ui_ux.png') },
  ];

  const filteredCourses = MY_COURSES.filter(c => c.status === activeTab);

  return (
    <SafeScreen>
      <View style={styles.header}>
        <Text style={[typography.h1, { color: colors.text }]}>My Courses</Text>
        <TouchableOpacity 
          style={[styles.createBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('CreateCourse')}
        >
          <Text style={[typography.button, { color: '#FFF', fontSize: 14 }]}>+ Create New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabRow}>
        {['Published', 'Draft', 'Archived'].map((tab) => (
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

      <ScrollView contentContainerStyle={styles.listContent}>
        {filteredCourses.map((course) => (
          <View key={course.id} style={[styles.courseItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.miniThumbnail, { backgroundColor: colors.surface }]}>
              {course.image && <Image source={course.image} style={styles.thumbnailImage} resizeMode="cover" />}
            </View>
            <View style={styles.courseInfo}>
              <Text style={[typography.bodyLarge, { color: colors.text, fontWeight: '700' }]} numberOfLines={1}>
                {course.title}
              </Text>
              <View style={styles.statLine}>
                <Ionicons name="people" size={14} color={colors.textSecondary} />
                <Text style={[typography.caption, { color: colors.textSecondary, marginLeft: 4 }]}>{course.enrolled} Students</Text>
                <Ionicons name="wallet" size={14} color={colors.textSecondary} style={{ marginLeft: 16 }} />
                <Text style={[typography.caption, { color: colors.textSecondary, marginLeft: 4 }]}>{course.revenue}</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.editIcon, { backgroundColor: colors.surface }]}>
              <Ionicons name="pencil" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeScreen>
  );
};

// --- Instructor Profile Screen ---
export const InstructorProfileScreen = () => {
  const { colors, typography } = useTheme();
  const { signOut } = useAuth();

  const MENU = [
    { title: 'Payout Settings', icon: 'card-outline' },
    { title: 'Bank Details', icon: 'account-balance-outline' },
    { title: 'Notification Preferences', icon: 'notifications-outline' },
    { title: 'Help & Support', icon: 'help-circle-outline' },
  ];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.profileContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={[styles.avatarLarge, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>T</Text>
          </View>
          <Text style={[typography.h2, { color: colors.text, marginTop: 16 }]}>Sir Tariq</Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>Senior Software Engineer</Text>
          
          <View style={styles.instructorStats}>
            <View style={styles.instrStatItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[typography.h3, { color: colors.text }]}>4.9</Text>
                <Ionicons name="star" size={14} color="#F59E0B" style={{ marginLeft: 4 }} />
              </View>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>Rating</Text>
            </View>
            <View style={[styles.dividerVertical, { backgroundColor: colors.border }]} />
            <View style={styles.instrStatItem}>
              <Text style={[typography.h3, { color: colors.text }]}>12k+</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>Students</Text>
            </View>
            <View style={[styles.dividerVertical, { backgroundColor: colors.border }]} />
            <View style={styles.instrStatItem}>
              <Text style={[typography.h3, { color: colors.text }]}>08</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>Courses</Text>
            </View>
          </View>
        </View>

        <View style={styles.bioSection}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: 8 }]}>Bio</Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary, lineHeight: 22 }]}>
            Passionate educator and engineer with over 10 years of experience in the tech industry. 
            Teaching in Urdu and Sindhi to make quality education accessible.
          </Text>
        </View>

        <View style={styles.menuList}>
          {MENU.map((item, idx) => (
            <TouchableOpacity key={idx} style={[styles.menuRow, { borderBottomColor: colors.border }]}>
              <View style={[styles.menuIconBox, { backgroundColor: colors.surface }]}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[typography.bodyMedium, { color: colors.text, flex: 1, fontWeight: '600' }]}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
          <Text style={[typography.bodyMedium, { color: colors.error, fontWeight: '700' }]}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  createBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
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
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  miniThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  courseInfo: {
    flex: 1,
    marginLeft: 16,
  },
  statLine: {
    flexDirection: 'row',
    marginTop: 4,
  },
  editIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    padding: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  instructorStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  instrStatItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dividerVertical: {
    width: 1,
    height: 30,
  },
  bioSection: {
    marginBottom: 32,
  },
  menuList: {
    marginBottom: 32,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoutBtn: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});
