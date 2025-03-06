'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../../page.module.css';
import { ROUTES } from '../../lib/routes';
import { userApi } from '../../lib/api/users';
import { useAppNavigation } from '../../lib/hooks/use-app-navigation';

interface LoginFormProps {
  onError?: (error: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onError }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { navigate } = useAppNavigation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username: string = formData.get('username')?.toString() || '';
    const password: string = formData.get('password')?.toString() || '';

    const result = await userApi.login({ username, password });
    
    if (!result.success) {
      onError?.(result.error || 'Invalid username or password');
      setIsLoading(false);
      return;
    }

    // Navigate to dashboard on success
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className={styles.formBox}>
      <h1 className={styles.title}>Welcome Back</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter your username"
            className={styles.input}
            required
            disabled={isLoading}
            autoComplete="username"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            className={styles.input}
            required
            disabled={isLoading}
            autoComplete="current-password"
          />
        </div>
        
        <button 
          type="submit" 
          className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
        
        <p className={styles.signupText}>
          Don't have an account? <Link href={ROUTES.SIGNUP}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}; 