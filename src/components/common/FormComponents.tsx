import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  View, 
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useTheme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'outline' | 'ghost';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  loading, 
  disabled, 
  type = 'primary',
  style,
  textStyle,
  icon
}) => {
  const { colors, typography } = useTheme();

  const getBgColor = () => {
    if (disabled) return colors.border;
    switch (type) {
      case 'primary': return colors.primary;
      case 'secondary': return colors.secondary;
      case 'outline': return 'transparent';
      case 'ghost': return 'transparent';
      default: return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    switch (type) {
      case 'primary': return '#FFFFFF';
      case 'secondary': return colors.primary;
      case 'outline': return colors.primary;
      case 'ghost': return colors.textSecondary;
      default: return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { 
          backgroundColor: getBgColor(),
          borderWidth: type === 'outline' ? 1.5 : 0,
          borderColor: colors.primary,
        },
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.buttonContent}>
          {icon && <View style={styles.buttonIcon}>{icon}</View>}
          <Text style={[typography.button, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  error?: string;
  icon?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry,
  keyboardType = 'default',
  error
}) => {
  const { colors, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: 8 }]}>
          {label}
        </Text>
      )}
      <View style={[
        styles.inputWrapper,
        { 
          backgroundColor: colors.surface,
          borderColor: error ? colors.error : (isFocused ? colors.primary : colors.border),
          borderWidth: isFocused || error ? 1.5 : 1,
        }
      ]}>
        <TextInput
          style={[styles.textInput, { color: colors.text, ...typography.bodyMedium }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary + '80'}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Text style={{ fontSize: 18 }}>{isPasswordVisible ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[typography.caption, { color: colors.error, marginTop: 4 }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    height: '100%',
  },
  eyeIcon: {
    marginLeft: 10,
  },
});
