export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTPVerification: { email: string, role?: 'student' | 'instructor' };
};

export type StudentTabParamList = {
  Home: undefined;
  Courses: undefined;
  MyLearning: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  StudentMain: undefined;
  InstructorMain: undefined;
};
