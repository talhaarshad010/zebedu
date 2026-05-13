import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Image 
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { Input, Button } from '../../components/common/FormComponents';
import { useAuth } from '../../context/AuthContext';

const LANGUAGES = ['Urdu', 'Sindhi', 'Punjabi', 'Balochi', 'English', 'Pashto'];

export const StudentFirstTimeSetup = () => {
  const { colors, typography } = useTheme();
  const { completeSetup } = useAuth();
  
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.progressBar}>
            <View style={[styles.progressLine, { backgroundColor: colors.primary, width: '33%' }]} />
          </View>
          <Text style={[typography.h2, { color: colors.text, marginTop: 24 }]}>
            Tell us about yourself
          </Text>
          <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginTop: 8 }]}>
            Help us personalize your learning experience
          </Text>
        </View>

        <View style={styles.avatarSection}>
          <TouchableOpacity style={[styles.avatarCircle, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={{ fontSize: 40 }}>👤</Text>
            <View style={[styles.cameraBadge, { backgroundColor: colors.primary }]}>
              <Text style={{ fontSize: 12 }}>📷</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Input
            label="Phone Number"
            placeholder="+92 3XX XXXXXXX"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
          
          <Input
            label="City / Region"
            placeholder="e.g. Karachi, Sindh"
            value={region}
            onChangeText={setRegion}
          />

          <View style={styles.languageSection}>
            <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: 12 }]}>
              Preferred Languages (Select multiple)
            </Text>
            <View style={styles.chipContainer}>
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLanguages.includes(lang);
                return (
                  <TouchableOpacity
                    key={lang}
                    onPress={() => toggleLanguage(lang)}
                    style={[
                      styles.chip,
                      { 
                        backgroundColor: isSelected ? colors.primary : colors.surface,
                        borderColor: isSelected ? colors.primary : colors.border
                      }
                    ]}
                  >
                    <Text style={[
                      typography.bodySmall, 
                      { color: isSelected ? '#FFFFFF' : colors.text, fontWeight: isSelected ? '600' : '400' }
                    ]}>
                      {lang}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <Button
          title="Continue"
          onPress={completeSetup}
          style={{ marginTop: 40, marginBottom: 20 }}
        />
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  progressLine: {
    height: '100%',
    borderRadius: 2,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraBadge: {
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
  form: {
    flex: 1,
  },
  languageSection: {
    marginTop: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
});
