import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getRemoteConfig } from 'firebase/remote-config';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

// Initialize App Check
if (typeof window !== 'undefined') {
  if (process.env.NODE_ENV !== 'production') {
    // Use debug provider for development
    // You'll need to set this debug token in Firebase Console
    window.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_DEBUG_TOKEN || 'debug-token';
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''),
      isTokenAutoRefreshEnabled: true,
    });
  } else {
    // Use reCAPTCHA for production
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  }
}

export const perf = getPerformance(app);

// Initialize Remote Config
export const remoteConfig = getRemoteConfig(app);

// Set default values and cache settings
remoteConfig.defaultConfig = {
  max_words_limit: 100,
};

// Set cache expiration to 1 hour (3600 seconds)
remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

export const getLogin = (onSuccess) => {
  const auth = getAuth();
  onAuthStateChanged(auth, onSuccess);
};

export const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
};
