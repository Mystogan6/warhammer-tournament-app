'use client';

import { useState, useEffect } from 'react';
import styles from '../page.module.css';
import SocialButtons from '../components/social-buttons';
import { useAppAuth } from '../lib/hooks';
import ErrorBoundary from '../components/error-boundary';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [error, setError] = useState('');
  const { isLoading } = useAppAuth();

  useEffect(() => {
    const handleAuthError = (event: CustomEvent<string>) => {
      setError(event.detail);
    };

    window.addEventListener('auth-error', handleAuthError as EventListener);
    return () => {
      window.removeEventListener('auth-error', handleAuthError as EventListener);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className={styles.authContainer}>
        <div className={styles.formSection}>
          {children}
        </div>

        <div className={styles.divider}>
          <span>Or continue with</span>
        </div>

        <div className={styles.socialSection}>
          <SocialButtons 
            isLoading={isLoading}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </ErrorBoundary>
  );
} 