import { 
  signUp, 
  signIn, 
  signOut, 
  confirmSignUp, 
  resetPassword, 
  confirmResetPassword,
  getCurrentUser,
  fetchAuthSession
} from 'aws-amplify/auth';

export interface SignUpParams {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface ConfirmSignUpParams {
  email: string;
  confirmationCode: string;
}

export interface ResetPasswordParams {
  email: string;
}

export interface ConfirmResetPasswordParams {
  email: string;
  confirmationCode: string;
  newPassword: string;
}

// Sign up a new user
export const authSignUp = async ({ email, password, first_name, last_name }: SignUpParams) => {
  try {
    // Check if Amplify is configured
    if (!process.env.NEXT_PUBLIC_AWS_USER_POOL_ID) {
      throw new Error('Auth UserPool not configured. Please check your environment variables.');
    }

    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          given_name: first_name,
          family_name: last_name,
        },
      },
    });

    return {
      success: true,
      isSignUpComplete,
      userId,
      nextStep,
    };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return {
      success: false,
      error: error.message || 'Sign up failed',
    };
  }
};

// Confirm sign up with verification code
export const authConfirmSignUp = async ({ email, confirmationCode }: ConfirmSignUpParams) => {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode,
    });

    return {
      success: true,
      isSignUpComplete,
      nextStep,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Confirmation failed',
    };
  }
};

// Sign in user
export const authSignIn = async ({ email, password }: SignInParams) => {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });

    return {
      success: true,
      isSignedIn,
      nextStep,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Sign in failed',
    };
  }
};

// Sign out user
export const authSignOut = async () => {
  try {
    await signOut();
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Sign out failed',
    };
  }
};

// Reset password
export const authResetPassword = async ({ email }: ResetPasswordParams) => {
  try {
    const output = await resetPassword({ username: email });
    return {
      success: true,
      nextStep: output.nextStep,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Password reset failed',
    };
  }
};

// Confirm password reset
export const authConfirmResetPassword = async ({ 
  email, 
  confirmationCode, 
  newPassword 
}: ConfirmResetPasswordParams) => {
  try {
    await confirmResetPassword({
      username: email,
      confirmationCode,
      newPassword,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Password reset confirmation failed',
    };
  }
};

// Get current authenticated user
export const getCurrentAuthUser = async () => {
  try {
    const user = await getCurrentUser();
    return {
      success: true,
      user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'No authenticated user',
    };
  }
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const session = await fetchAuthSession();
    return !!session.tokens?.accessToken;
  } catch {
    return false;
  }
};