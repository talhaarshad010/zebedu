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
import { Input, Button } from '../../components/common/FormComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- Edit Profile Screen ---
export const EditProfileScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  
  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[typography.h2, { color: colors.text, marginLeft: 20 }]}>Edit Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <View style={[styles.avatarLarge, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>A</Text>
            <TouchableOpacity style={[styles.editBadge, { backgroundColor: colors.card }]}>
              <Ionicons name="camera" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <Input label="Full Name" placeholder="Ahmed Ali" value="Ahmed Ali" />
        <Input label="Email" placeholder="ahmed.ali@example.com" value="ahmed.ali@example.com" />
        <Input label="Phone Number" placeholder="+92 300 1234567" />
        <Input label="City" placeholder="Karachi" />
        
        <Button title="Save Changes" onPress={() => navigation.goBack()} style={{ marginTop: 24 }} />
      </ScrollView>
    </SafeScreen>
  );
};

// --- Language Preference Screen ---
export const LanguagePreferenceScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  const [selected, setSelected] = useState(['Urdu', 'English']);
  
  const LANGUAGES = ['Urdu', 'Sindhi', 'Punjabi', 'Balochi', 'English', 'Pashto'];

  const toggleLang = (lang: string) => {
    if (selected.includes(lang)) {
      setSelected(selected.filter(l => l !== lang));
    } else {
      setSelected([...selected, lang]);
    }
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[typography.h2, { color: colors.text, marginLeft: 20 }]}>Language Preference</Text>
      </View>

      <View style={styles.content}>
        <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginBottom: 24 }]}>
          Choose the languages you'd like to see courses in.
        </Text>

        <View style={styles.langGrid}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity 
              key={lang} 
              onPress={() => toggleLang(lang)}
              style={[
                styles.langChip, 
                { 
                  backgroundColor: selected.includes(lang) ? colors.primary : colors.surface,
                  borderColor: selected.includes(lang) ? colors.primary : colors.border
                }
              ]}
            >
              <Text style={[
                typography.bodyMedium, 
                { color: selected.includes(lang) ? '#FFF' : colors.text, fontWeight: '600' }
              ]}>
                {lang}
              </Text>
              {selected.includes(lang) && <Ionicons name="checkmark" size={18} color="#FFF" style={{ marginLeft: 8 }} />}
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Save Preference" onPress={() => navigation.goBack()} style={{ marginTop: 'auto' }} />
      </View>
    </SafeScreen>
  );
};

// --- My Certificates List Screen ---
export const CertificateListScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  
  const CERTIFICATES = [
    { id: '1', title: 'React Native for Pros', date: 'May 12, 2026', instructor: 'Sir Tariq' },
    { id: '2', title: 'UI Design Basics', date: 'April 20, 2026', instructor: 'Sara Khan' },
  ];

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[typography.h2, { color: colors.text, marginLeft: 20 }]}>My Certificates</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {CERTIFICATES.map((cert) => (
          <TouchableOpacity 
            key={cert.id} 
            onPress={() => navigation.navigate('Certificate')}
            style={[styles.certCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={[styles.certIcon, { backgroundColor: colors.primary + '10' }]}>
              <Ionicons name="document-text" size={24} color={colors.primary} />
            </View>
            <View style={styles.certInfo}>
              <Text style={[typography.bodyLarge, { color: colors.text, fontWeight: '700' }]}>{cert.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>by {cert.instructor} • {cert.date}</Text>
            </View>
            <Ionicons name="download-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
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
  content: {
    padding: 24,
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  langGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  certIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  certInfo: {
    flex: 1,
    marginLeft: 16,
  },
});
