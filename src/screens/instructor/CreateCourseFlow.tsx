import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { Input, Button } from '../../components/common/FormComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export const CreateCourseFlow = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  const [step, setStep] = useState(1);

  const renderStepIndicator = () => (
    <View style={styles.stepper}>
      {[1, 2, 3, 4].map((i) => (
        <React.Fragment key={i}>
          <View style={[
            styles.stepCircle, 
            { backgroundColor: step >= i ? colors.primary : colors.surface, borderColor: colors.primary }
          ]}>
            <Text style={{ color: step >= i ? '#FFF' : colors.primary, fontWeight: '700' }}>{i}</Text>
          </View>
          {i < 4 && <View style={[styles.stepLine, { backgroundColor: step > i ? colors.primary : colors.border }]} />}
        </React.Fragment>
      ))}
    </View>
  );

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <View>
            <Text style={[typography.h2, { color: colors.text, marginBottom: 8 }]}>Basic Info</Text>
            <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: 24 }]}>Step 1: Tell us the basics of your course</Text>
            <Input label="Course Title" placeholder="e.g. Master React Native" />
            <Input label="Category" placeholder="e.g. Technology" />
            <View style={styles.formGroup}>
              <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: 12 }]}>Difficulty Level</Text>
              <View style={styles.segmentedControl}>
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <TouchableOpacity key={level} style={[styles.segment, { backgroundColor: colors.surface }]}>
                    <Text style={[typography.caption, { color: colors.text }]}>{level}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Input label="Short Description" placeholder="Max 150 characters" multiline />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={[typography.h2, { color: colors.text, marginBottom: 8 }]}>Thumbnail & Media</Text>
            <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: 24 }]}>Step 2: Upload a thumbnail and intro video</Text>
            <TouchableOpacity style={[styles.uploadBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Ionicons name="image-outline" size={40} color={colors.textSecondary} style={{ marginBottom: 12 }} />
              <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>Upload Course Thumbnail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.uploadBox, { backgroundColor: colors.surface, borderColor: colors.border, marginTop: 24 }]}>
              <Ionicons name="videocam-outline" size={40} color={colors.textSecondary} style={{ marginBottom: 12 }} />
              <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>Upload Intro Video (Optional)</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={[typography.h2, { color: colors.text, marginBottom: 8 }]}>Curriculum</Text>
            <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: 24 }]}>Step 3: Build your course content</Text>
            <View style={[styles.curriculumSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: '700' }]}>Section 1: Introduction</Text>
              <View style={[styles.lectureRow, { borderBottomColor: colors.border }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="videocam" size={18} color={colors.primary} style={{ marginRight: 8 }} />
                  <Text style={[typography.bodySmall, { color: colors.text }]}>Lecture 1: Welcome</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="trash-outline" size={18} color={colors.error} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.addLecture}>
                <Text style={{ color: colors.primary, fontWeight: '700' }}>+ Add Lecture</Text>
              </TouchableOpacity>
            </View>
            <Button title="+ Add Section" type="outline" onPress={() => {}} style={{ marginTop: 12 }} />
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={[typography.h2, { color: colors.text, marginBottom: 8 }]}>Pricing & Publish</Text>
            <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: 24 }]}>Step 4: Set the price and launch your course</Text>
            <View style={styles.rowBetween}>
              <Text style={[typography.bodyMedium, { color: colors.text }]}>Paid Course</Text>
              <TouchableOpacity style={[styles.toggle, { backgroundColor: colors.primary }]} />
            </View>
            <Input label="Price (PKR)" placeholder="e.g. 5000" keyboardType="numeric" />
            <Input label="Discount Price (Optional)" placeholder="e.g. 2500" keyboardType="numeric" />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={[typography.h2, { color: colors.text }]}>New Course</Text>
          <View style={{ width: 44 }} />
        </View>

        {renderStepIndicator()}

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {renderStepContent()}
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          {step > 1 && (
            <Button 
              title="Back" 
              type="outline" 
              onPress={() => setStep(step - 1)} 
              style={{ width: '30%' }}
            />
          )}
          <Button 
            title={step === 4 ? "Publish Course" : "Continue"} 
            onPress={() => step < 4 ? setStep(step + 1) : navigation.goBack()} 
            style={{ width: step > 1 ? '65%' : '100%' }}
          />
        </View>
      </KeyboardAvoidingView>
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
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLine: {
    flex: 1,
    height: 2,
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  formGroup: {
    marginBottom: 24,
  },
  segmentedControl: {
    flexDirection: 'row',
    gap: 10,
  },
  segment: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBox: {
    height: 180,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  curriculumSection: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  lectureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginTop: 12,
  },
  addLecture: {
    marginTop: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
  },
  footer: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
});
