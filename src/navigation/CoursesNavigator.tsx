import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BrowseCoursesScreen, CourseDetailScreen } from '../screens/student/CourseDiscoveryScreens';

const Stack = createStackNavigator();

export const CoursesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Browse" component={BrowseCoursesScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
};
