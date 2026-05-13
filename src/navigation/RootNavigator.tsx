import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { AuthNavigator } from './AuthNavigator';
import { StudentFirstTimeSetup } from '../screens/student/FirstTimeSetupScreen';
// Placeholders for now
import { View, Text } from 'react-native';

import { StudentTabNavigator } from './StudentTabNavigator';
import { VideoPlayerScreen } from '../screens/student/VideoPlayerScreen';
import { QuizScreen } from '../screens/student/StudentLearningExtra';
import { CertificateScreen } from '../screens/shared/CertificateScreen';

import { InstructorTabNavigator } from './InstructorTabNavigator';
import { CreateCourseFlow } from '../screens/instructor/CreateCourseFlow';
import { InstructorQuizzesScreen, InstructorAttendanceScreen } from '../screens/instructor/InstructorToolsExtra';
import { NotificationsScreen, SearchResultsScreen } from '../screens/shared/SharedUtilityScreens';
import { 
  EditProfileScreen, 
  LanguagePreferenceScreen, 
  CertificateListScreen 
} from '../screens/student/ProfileSubScreens';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const { role, isFirstTime } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!role ? (
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
      ) : role === 'student' ? (
        <>
          {isFirstTime ? (
            <Stack.Screen name="StudentSetup" component={StudentFirstTimeSetup} />
          ) : (
            <>
              <Stack.Screen name="StudentMain" component={StudentTabNavigator} />
              <Stack.Screen 
                name="VideoPlayer" 
                component={VideoPlayerScreen} 
              />
              <Stack.Screen 
                name="Quiz" 
                component={QuizScreen} 
                options={{ presentation: 'modal' }}
              />
              <Stack.Screen 
                name="Certificate" 
                component={CertificateScreen} 
                options={{ presentation: 'modal' }}
              />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="LanguagePreference" component={LanguagePreferenceScreen} />
              <Stack.Screen name="CertificateList" component={CertificateListScreen} />
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="InstructorMain" component={InstructorTabNavigator} />
          <Stack.Screen name="CreateCourse" component={CreateCourseFlow} />
          <Stack.Screen name="InstructorQuizzes" component={InstructorQuizzesScreen} />
          <Stack.Screen name="InstructorAttendance" component={InstructorAttendanceScreen} />
        </>
      )}

      {/* Shared Screens */}
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
    </Stack.Navigator>
  );
};
