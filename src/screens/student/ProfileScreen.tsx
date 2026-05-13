import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Image
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ProfileScreen = ({ navigation }: any) => {
  const { colors, typography, isDark } = useTheme();
  const { signOut } = useAuth();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

  const SETTINGS = [
    { id: '1', title: 'My Certificates', icon: 'certificate-outline', type: 'link', screen: 'CertificateList' },
    { id: '2', title: 'Language Preference', icon: 'language-outline', type: 'link', value: 'Urdu, English', screen: 'LanguagePreference' },
    { id: '3', title: 'Notifications', icon: 'notifications-outline', type: 'toggle', value: isNotificationsEnabled, onToggle: setIsNotificationsEnabled },
    { id: '4', title: 'Help & Support', icon: 'help-circle-outline', type: 'link' },
    { id: '5', title: 'Privacy Policy', icon: 'lock-closed-outline', type: 'link' },
    { id: '6', title: 'Terms & Conditions', icon: 'document-text-outline', type: 'link' },
  ];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.avatarLarge, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>A</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('EditProfile')}
              style={[styles.editBadge, { backgroundColor: colors.surface }]}
            >
              <Ionicons name="pencil" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={[typography.h2, { color: colors.text, marginTop: 16 }]}>Ahmed Ali</Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>ahmed.ali@example.com</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('EditProfile')}
            style={[styles.editProfileBtn, { borderColor: colors.primary }]}
          >
            <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menu}>
          {SETTINGS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => item.screen && navigation.navigate(item.screen)}
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              disabled={item.type === 'toggle'}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.surface }]}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.menuText}>
                <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: '600' }]}>{item.title}</Text>
                {item.value && typeof item.value === 'string' && (
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.value}</Text>
                )}
              </View>
              {item.type === 'toggle' ? (
                <Switch 
                  value={item.value as boolean} 
                  onValueChange={item.onToggle}
                  trackColor={{ false: colors.border, true: colors.primary }}
                />
              ) : (
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={signOut}
        >
          <Text style={[typography.bodyMedium, { color: colors.error, fontWeight: '700' }]}>Log Out</Text>
        </TouchableOpacity>

        <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center', marginTop: 24, marginBottom: 40 }]}>
          Version 1.0.0 (Build 12)
        </Text>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editProfileBtn: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  menu: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  logoutBtn: {
    marginTop: 40,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
