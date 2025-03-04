'use client';

import Link from 'next/link';
import styles from '../../page.module.css';
import { useAppAuth } from '../../lib/hooks';
import { ROUTES } from '../../lib/routes';

const SignupForm = () => {
  const { login, isLoading } = useAppAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // In a real app, this would create a new user account
    await login({ username, password });
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

export default SignupForm; 