'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../page.module.css';
import LoginForm from './login/login-form';
import SignupForm from './signup/signup-form';
import SocialButtons from '../components/social-buttons';
import { useAppAuth } from '../lib/hooks';

const AuthPage = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const [error, setError] = useState('');
  const { isLoading } = useAppAuth();

  return (
    <div className={styles.authContainer}>
      <div className={styles.formSection}>
        {mode === 'login' ? (
          <LoginForm onError={setError} />
        ) : (
          <SignupForm onError={setError} />
        )}
      </div>

      <div className={styles.socialSection}>
        <SocialButtons 
          onError={setError}
          isLoading={isLoading}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default AuthPage; 