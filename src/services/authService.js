import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Authentication Service
 * Handles all authentication-related operations
 */

export const authService = {
  /**
   * Register new user with email and password
   */
  async register(email, password, displayName = '') {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name if provided
      if (displayName) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }
      
      return {
        success: true,
        user: userCredential.user
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  },

  /**
   * Login with email and password
   */
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  },

  /**
   * Login with Google OAuth
   */
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const userCredential = await signInWithPopup(auth, provider);
      return {
        success: true,
        user: userCredential.user
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  },

  /**
   * Logout current user
   */
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  },

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'Password reset email sent'
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  },

  /**
   * Get current user
   */
  getCurrentUser() {
    return auth.currentUser;
  },

  /**
   * Get user ID
   */
  getUserId() {
    return auth.currentUser?.uid || null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return auth.currentUser !== null;
  },

  /**
   * Convert Firebase error codes to user-friendly messages
   */
  getErrorMessage(error) {
    const errorMessages = {
      'auth/email-already-in-use': 'This email is already registered',
      'auth/invalid-email': 'Invalid email address',
      'auth/operation-not-allowed': 'Operation not allowed',
      'auth/weak-password': 'Password is too weak (minimum 6 characters)',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/invalid-credential': 'Invalid email/password. If you previously used Google, please continue with Google or use "Forgot Password" to set a password.',
      'auth/account-exists-with-different-credential': 'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
      'auth/network-request-failed': 'Network error. Check your connection',
      'auth/popup-closed-by-user': 'Sign-in popup was closed',
      'auth/cancelled-popup-request': 'Sign-in was cancelled'
    };

    return errorMessages[error.code] || error.message || 'An error occurred';
  }
};

export default authService;