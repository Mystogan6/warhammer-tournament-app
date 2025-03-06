'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../../page.module.css';
import { ROUTES } from '../../lib/routes';
import { userApi } from '../../lib/api/users';
import { useAppNavigation } from '../../lib/hooks/use-app-navigation';

interface SignupFormProps {
  onError?: (error: string) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onError }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { navigate } = useAppNavigation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email: string = formData.get('email')?.toString() || '';
    const username: string = formData.get('username')?.toString() || '';
    const password: string = formData.get('password')?.toString() || '';

    const result = await userApi.create({ email, username, password });
    
    if (!result.success) {
      onError?.(result.error || 'Failed to create account');
      setIsLoading(false);
      return;
    }

    // After successful signup, log the user in
    const loginResult = await userApi.login({ username, password });
    
    if (!loginResult.success) {
      onError?.(loginResult.error || 'Account created but login failed');
      setIsLoading(false);
      return;
    }

    // Navigate to dashboard on success
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className={styles.formBox}>
      <h1 className={styles.title}>Create Account</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email"
            className={styles.input}
            required
            disabled={isLoading}
            autoComplete="email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Choose a username"
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
            placeholder="Create a password"
            className={styles.input}
            required
            disabled={isLoading}
            autoComplete="new-password"
          />
        </div>
        
        <button 
          type="submit" 
          className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <p className={styles.signupText}>
          Already have an account? <Link href={ROUTES.LOGIN}>Sign in</Link>
        </p>
      </form>
    </div>
  );
}; 