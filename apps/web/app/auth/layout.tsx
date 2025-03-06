'use client';

import { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { SocialButtons } from '../components/social-buttons';
import { useAppAuth } from '../lib/hooks';
import ErrorBoundary from '../components/error-boundary';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function isCustomEvent(event: Event): event is CustomEvent<string> {
  return 'detail' in event;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
}) => {
  const [error, setError] = useState<string>('');
  const { isLoading } = useAppAuth();

  useEffect(() => {
    const handleAuthError = (event: Event) => {
      if (isCustomEvent(event)) {
        setError(event.detail);
      }
    };

    window.addEventListener('auth-error', handleAuthError);
    return () => {
      window.removeEventListener('auth-error', handleAuthError);
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
}; 