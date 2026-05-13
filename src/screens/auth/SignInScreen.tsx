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

type SignInScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'SignIn'>;
};

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signIn('student');
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
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>Z</Text>
            </View>
            <Text style={[typography.h2, { color: colors.text, marginTop: 24 }]}>
              Welcome Back
            </Text>
            <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginTop: 8 }]}>
              Sign in to continue your learning journey
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email Address"
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleSignIn}
              style={{ marginTop: 24 }}
            />

            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <Text style={[typography.caption, { color: colors.textSecondary, marginHorizontal: 16 }]}>
                or continue with
              </Text>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            </View>

            <Button
              title="Sign in with Google"
              onPress={() => {}}
              type="outline"
              style={{ borderColor: colors.border }}
              textStyle={{ color: colors.text }}
              icon={<Text style={{ fontSize: 20 }}>G</Text>}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                Don't have an account? <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign Up</Text>
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
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0D4DA1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
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
