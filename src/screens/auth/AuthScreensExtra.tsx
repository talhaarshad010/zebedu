import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TextInput
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import { Input, Button } from '../../components/common/FormComponents';
import { useAuth } from '../../context/AuthContext';

// --- Forgot Password Screen ---

type ForgotPasswordScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const [email, setEmail] = useState('');

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[typography.h2, { color: colors.text }]}>Reset Password</Text>
          <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginTop: 8 }]}>
            Enter your email to receive a password reset link
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

          <Button
            title="Send Reset Link"
            onPress={() => {}}
            style={{ marginTop: 12 }}
          />
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
            Back to <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

// --- OTP Verification Screen ---

type OTPVerificationScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'OTPVerification'>;
  route: RouteProp<AuthStackParamList, 'OTPVerification'>;
};

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({ navigation, route }) => {
  const { colors, typography } = useTheme();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(45);
  const { signIn } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    // Navigate to dashboard or success screen
    console.log('Verifying OTP:', otp.join(''));
    signIn(route.params?.role || 'student');
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[typography.h2, { color: colors.text }]}>Verify Email</Text>
          <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginTop: 8 }]}>
            We've sent a 4-digit code to {route.params?.email || 'your email'}
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View 
              key={index} 
              style={[
                styles.otpBox, 
                { backgroundColor: colors.surface, borderColor: digit ? colors.primary : colors.border }
              ]}
            >
              <TextInput
                style={[styles.otpInput, { color: colors.text, ...typography.h2 }]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(val) => {
                  const newOtp = [...otp];
                  newOtp[index] = val;
                  setOtp(newOtp);
                }}
              />
            </View>
          ))}
        </View>

        <View style={styles.timerContainer}>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
            Resend in <Text style={{ color: colors.primary, fontWeight: '600' }}>
              00:{timer < 10 ? `0${timer}` : timer}
            </Text>
          </Text>
        </View>

        <Button
          title="Verify"
          onPress={handleVerify}
          style={{ width: '100%', marginTop: 24 }}
        />

        <TouchableOpacity 
          disabled={timer > 0}
          style={[styles.resendButton, { opacity: timer > 0 ? 0.5 : 1 }]}
          onPress={() => setTimer(45)}
        >
          <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  backButton: {
    marginTop: 'auto',
    alignSelf: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  otpBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    textAlign: 'center',
    width: '100%',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resendButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});
