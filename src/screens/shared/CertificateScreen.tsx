import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions,
  Share,
  ScrollView
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { Button } from '../../components/common/FormComponents';

const { width } = Dimensions.get('window');

export const CertificateScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'I just completed "React Native for Pros" on Zebedu! 🎓',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={{ fontSize: 24 }}>✕</Text>
        </TouchableOpacity>
        <Text style={[typography.h2, { color: colors.text }]}>Certificate</Text>
        <View style={{ width: 44 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.certificateWrapper, { backgroundColor: colors.card, shadowColor: colors.primary }]}>
          <View style={[styles.borderBox, { borderColor: colors.primary }]}>
            <Text style={[styles.brand, { color: colors.primary }]}>ZEBEDU</Text>
            <Text style={[styles.certTitle, { color: colors.text }]}>CERTIFICATE</Text>
            <Text style={[styles.subTitle, { color: colors.textSecondary }]}>OF COMPLETION</Text>
            
            <View style={styles.divider} />
            
            <Text style={[styles.presentText, { color: colors.textSecondary }]}>This is to certify that</Text>
            <Text style={[styles.studentName, { color: colors.text }]}>Ahmed Ali</Text>
            
            <Text style={[styles.courseText, { color: colors.textSecondary }]}>
              has successfully completed the course
            </Text>
            <Text style={[styles.courseName, { color: colors.primary }]}>React Native for Pros</Text>
            
            <View style={styles.footerRow}>
              <View style={styles.signBox}>
                <View style={[styles.signLine, { backgroundColor: colors.border }]} />
                <Text style={[typography.caption, { color: colors.textSecondary }]}>Director</Text>
              </View>
              <View style={styles.dateBox}>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>May 13, 2026</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Button 
            title="Download as PDF" 
            onPress={() => {}} 
            style={{ marginBottom: 16 }}
          />
          <Button 
            title="Share with Friends" 
            onPress={handleShare} 
            type="outline"
          />
        </View>
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
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  certificateWrapper: {
    width: '100%',
    aspectRatio: 0.7,
    padding: 20,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 40,
  },
  borderBox: {
    flex: 1,
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 10,
  },
  certTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 2,
  },
  subTitle: {
    fontSize: 12,
    letterSpacing: 6,
    marginBottom: 40,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#D1D5DB',
    marginBottom: 40,
  },
  presentText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  studentName: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 40,
  },
  courseText: {
    fontSize: 14,
    marginBottom: 10,
  },
  courseName: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 60,
  },
  footerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  signBox: {
    alignItems: 'center',
  },
  signLine: {
    width: 100,
    height: 1,
    marginBottom: 8,
  },
  dateBox: {
    justifyContent: 'flex-end',
  },
  actions: {
    width: '100%',
    paddingBottom: 40,
  },
});
