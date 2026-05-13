import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Platform } from 'react-native';
import { useTheme } from '../theme';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { InstructorDashboardScreen } from '../screens/instructor/InstructorDashboardScreen';
import { ManageCoursesScreen, InstructorProfileScreen } from '../screens/instructor/InstructorManagementScreens';
import { ViewStudentProgressScreen, CourseInsightsScreen } from '../screens/instructor/InstructorAnalyticsScreens';

const Tab = createBottomTabNavigator();

export const InstructorTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          paddingTop: 8,
          borderTopWidth: 1,
          elevation: 0,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'grid-outline';
          else if (route.name === 'MyCourses') iconName = 'book-outline';
          else if (route.name === 'Students') iconName = 'people-outline';
          else if (route.name === 'Analytics') iconName = 'bar-chart-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={InstructorDashboardScreen} />
      <Tab.Screen name="MyCourses" component={ManageCoursesScreen} />
      <Tab.Screen name="Students" component={ViewStudentProgressScreen} />
      <Tab.Screen name="Analytics" component={CourseInsightsScreen} />
      <Tab.Screen name="Profile" component={InstructorProfileScreen} />
    </Tab.Navigator>
  );
};
