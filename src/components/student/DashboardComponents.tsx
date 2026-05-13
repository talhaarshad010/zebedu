import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image,
  Dimensions,
  StyleProp,
  ViewStyle
} from 'react-native';
import { useTheme } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- Dashboard Header ---
export const DashboardHeader: React.FC<{ name: string }> = ({ name }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={[typography.bodyMedium, { color: colors.textSecondary }]}>Good morning,</Text>
        <Text style={[typography.h2, { color: colors.text }]}>{name} 👋</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
          <View style={[styles.badge, { backgroundColor: colors.error }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarMini}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{name[0]}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Course Card ---
interface CourseCardProps {
  title: string;
  instructor: string;
  image?: any;
  progress?: number;
  rating: number;
  language: string;
  price?: string;
  horizontal?: boolean;
  onPress?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  instructor, 
  image,
  progress, 
  rating, 
  language,
  price,
  horizontal,
  onPress
}) => {
  const { colors, typography } = useTheme();

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.courseCard, 
        { 
          backgroundColor: colors.card,
          width: horizontal ? width * 0.7 : '100%',
          marginRight: horizontal ? 16 : 0,
          marginBottom: horizontal ? 0 : 16,
        }
      ]}
      activeOpacity={0.9}
    >
      <View style={[styles.thumbnail, { backgroundColor: colors.secondary }]}>
        {image && <Image source={image} style={styles.thumbnailImage} resizeMode="cover" />}
        <View style={[styles.languageBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.languageText}>{language}</Text>
        </View>
      </View>
      <View style={styles.courseInfo}>
        <Text style={[typography.h3, { color: colors.text }]} numberOfLines={1}>{title}</Text>
        <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>{instructor}</Text>
        
        {progress !== undefined ? (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${progress}%` }]} />
            </View>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>{progress}% complete</Text>
          </View>
        ) : (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={[typography.bodySmall, { color: colors.text, marginLeft: 4 }]}>{rating}</Text>
            <Text style={[typography.bodyMedium, { color: colors.primary, fontWeight: '700', marginLeft: 'auto' }]}>
              {price || 'Free'}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarMini: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  avatarCircle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  thumbnail: {
    height: 140,
    width: '100%',
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  languageBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  languageText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  courseInfo: {
    padding: 16,
  },
  progressContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});
