import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  TextInput,
  StatusBar,
  Platform,
  Image,
  Modal,
  FlatList
} from 'react-native';
import Video from 'react-native-video';
import { useTheme } from '../../theme';
import { SafeScreen } from '../../components/common/SafeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export const VideoPlayerScreen = ({ route, navigation }: any) => {
  const { colors, typography } = useTheme();
  const [activeTab, setActiveTab] = useState('Content');
  const [selectedLang, setSelectedLang] = useState('Urdu');
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { course } = route.params || { course: { title: '1. Introduction to the Course', image: null } };

  const LANGUAGES = [
    { id: '1', label: 'Urdu', code: 'UR' },
    { id: '2', label: 'English', code: 'EN' },
    { id: '3', label: 'Sindhi', code: 'SD' },
    { id: '4', label: 'Punjabi', code: 'PB' },
  ];

  const LECTURES = [
    { id: '1', title: '1. Introduction to the Course', duration: '10:00', completed: true },
    { id: '2', title: '2. Setting up the Environment', duration: '15:30', completed: false, locked: false },
    { id: '3', title: '3. Advanced Components', duration: '22:00', completed: false, locked: true },
    { id: '4', title: '4. State Management Deep Dive', duration: '18:45', completed: false, locked: true },
  ];

  return (
    <View style={[styles.mainContainer, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Immersive Video Section */}
      <View style={[styles.playerSection, { backgroundColor: '#000' }]}>
        <Video
          source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
          paused={!isPlaying}
          poster={course?.image ? Image.resolveAssetSource(course.image).uri : undefined}
          posterResizeMode="cover"
          onEnd={() => setIsPlaying(false)}
        />
        
        {!isPlaying && (
          <View style={styles.videoOverlay}>
            <TouchableOpacity 
              style={styles.masterPlayBtn}
              onPress={() => setIsPlaying(true)}
            >
              <View style={styles.playIconInner}>
                <Ionicons name="play" size={44} color="#FFF" style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Top Floating Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.circleBtn}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setIsLangModalVisible(true)}
            style={styles.langBadge}
          >
            <Ionicons name="globe-outline" size={16} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={[typography.caption, { color: '#FFF', fontWeight: '700' }]}>{selectedLang}</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Floating Controls */}
        <View style={styles.bottomControls}>
          <View style={styles.progressBarWrapper}>
            <View style={[styles.progressBarBase, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '45%' }]} />
            </View>
            <View style={styles.timeInfo}>
              <Text style={styles.timeLabel}>12:45 / 30:00</Text>
              <TouchableOpacity>
                <Text style={styles.timeLabel}>1.25x</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Screen Content */}
      <View style={styles.contentHeader}>
        <Text style={[typography.h2, { color: colors.text }]}>{course?.title || '1. Introduction to the Course'}</Text>
        <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>Section: Getting Started</Text>
      </View>

      {/* Modern Tabs */}
      <View style={[styles.tabBar, { borderBottomColor: colors.border, backgroundColor: '#FFF' }]}>
        {['Content', 'Notes', 'Q&A'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && { borderBottomColor: colors.primary }]}
          >
            <Text style={[
              typography.bodyMedium, 
              { 
                color: activeTab === tab ? colors.primary : colors.textSecondary, 
                fontWeight: '700' 
              }
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {activeTab === 'Content' && (
          <View>
            {LECTURES.map((lecture) => (
              <TouchableOpacity 
                key={lecture.id} 
                style={[styles.lectureCard, { borderBottomColor: colors.border }]}
                disabled={lecture.locked}
              >
                <View style={[styles.statusIcon, { backgroundColor: colors.surface }]}>
                  {lecture.completed ? (
                    <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                  ) : lecture.locked ? (
                    <Ionicons name="lock-closed" size={20} color={colors.textSecondary} />
                  ) : (
                    <Ionicons name="play-circle" size={24} color={colors.primary} />
                  )}
                </View>
                <View style={styles.lectureText}>
                  <Text style={[
                    typography.bodyMedium, 
                    { color: lecture.locked ? colors.textSecondary : colors.text, fontWeight: '600' }
                  ]}>
                    {lecture.title}
                  </Text>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>{lecture.duration}</Text>
                </View>
                {!lecture.locked && <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'Notes' && (
          <View style={styles.notesPanel}>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TextInput 
                placeholder="Write your note here..."
                placeholderTextColor={colors.textSecondary}
                multiline
                style={[styles.textInput, { color: colors.text }]}
              />
              <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]}>
                <Text style={styles.saveBtnText}>Save Note at 12:45</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'Q&A' && (
          <View style={styles.qaPanel}>
            <Text style={[typography.bodyMedium, { color: colors.textSecondary, textAlign: 'center', marginVertical: 40 }]}>
              Have a question? Ask Sir Tariq.
            </Text>
            <TouchableOpacity style={[styles.askBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.askBtnText}>Ask a Question</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={isLangModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsLangModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: '#FFF' }]}>
            <View style={styles.modalHeader}>
              <Text style={[typography.h3, { color: '#000' }]}>Select Language</Text>
              <TouchableOpacity onPress={() => setIsLangModalVisible(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.langOption, 
                    selectedLang === item.label && { backgroundColor: colors.primary + '10' }
                  ]}
                  onPress={() => {
                    setSelectedLang(item.label);
                    setIsLangModalVisible(false);
                  }}
                >
                  <Text style={[
                    typography.bodyMedium, 
                    { color: selectedLang === item.label ? colors.primary : colors.text, fontWeight: selectedLang === item.label ? '700' : '400' }
                  ]}>
                    {item.label}
                  </Text>
                  {selectedLang === item.label && <Ionicons name="checkmark" size={20} color={colors.primary} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  playerSection: {
    height: width * 0.6,
    width: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  videoContent: {},
  masterPlayBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  playIconInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topControls: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 22,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  progressBarWrapper: {
    width: '100%',
  },
  progressBarBase: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  contentHeader: {
    padding: 24,
    paddingBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  tabItem: {
    paddingBottom: 12,
    marginRight: 32,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  scrollBody: {
    padding: 24,
  },
  lectureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lectureText: {
    flex: 1,
  },
  notesPanel: {
    marginTop: 8,
  },
  inputContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  textInput: {
    minHeight: 120,
    fontSize: 15,
    textAlignVertical: 'top',
  },
  saveBtn: {
    alignSelf: 'flex-end',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveBtnText: {
    color: '#FFF',
    fontWeight: '700',
  },
  qaPanel: {
    paddingBottom: 24,
  },
  askBtn: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  askBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  langOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
});
