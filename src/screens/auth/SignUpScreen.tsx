import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { Input, Button } from '../../components/common/FormComponents';
import { useAuth } from '../../context/AuthContext';

type SignUpScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
};

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const { signIn } = useAuth();
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    signIn(role);
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[typography.h2, { color: colors.text }]}>
              Create Account
            </Text>
            <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginTop: 8 }]}>
              Join Zebedu and start learning today
            </Text>
          </View>

          <View style={styles.roleContainer}>
            <TouchableOpacity 
              onPress={() => setRole('student')}
              style={[
                styles.roleCard, 
                { 
                  backgroundColor: colors.card,
                  borderColor: role === 'student' ? colors.primary : colors.border,
                  borderWidth: role === 'student' ? 2 : 1,
                }
              ]}
            >
              <Text style={{ fontSize: 32, marginBottom: 8 }}>👨‍🎓</Text>
              <Text style={[typography.bodySmall, { color: colors.text, fontWeight: '700' }]}>Student</Text>
              {role === 'student' && <View style={[styles.check, { backgroundColor: colors.primary }]} />}
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setRole('instructor')}
              style={[
                styles.roleCard, 
                { 
                  backgroundColor: colors.card,
                  borderColor: role === 'instructor' ? colors.primary : colors.border,
                  borderWidth: role === 'instructor' ? 2 : 1,
                }
              ]}
            >
              <Text style={{ fontSize: 32, marginBottom: 8 }}>👨‍🏫</Text>
              <Text style={[typography.bodySmall, { color: colors.text, fontWeight: '700' }]}>Instructor</Text>
              {role === 'instructor' && <View style={[styles.check, { backgroundColor: colors.primary }]} />}
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <Input
              label="Email Address"
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title="Create Account"
              onPress={() => navigation.navigate('OTPVerification', { email, role })}
              style={{ marginTop: 24 }}
            />

            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <Text style={[typography.caption, { color: colors.textSecondary, marginHorizontal: 16 }]}>
                or join with
              </Text>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            </View>

            <Button
              title="Join with Google"
              onPress={() => {}}
              type="outline"
              style={{ borderColor: colors.border }}
              textStyle={{ color: colors.text }}
              icon={<Text style={{ fontSize: 20 }}>G</Text>}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                Already have an account? <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 32,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  roleCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  check: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  form: {
    width: '100%',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 32,
    alignItems: 'center',
  },
});
