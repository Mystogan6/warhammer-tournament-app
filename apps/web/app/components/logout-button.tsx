'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '../page.module.css';
import { useAppAuth } from '../lib/hooks';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const { logout } = useAppAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const confirmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target: Element | null = event.target instanceof Element ? event.target : null;
      if (confirmRef.current && target && !confirmRef.current.contains(target)) {
        setShowConfirm(false);
        setError(null);
      }
    };

    if (showConfirm) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showConfirm]);

  const handleLogoutClick = (): void => {
    setShowConfirm(true);
  };

  const handleCancel = (): void => {
    setShowConfirm(false);
    setError(null);
  };

  const handleConfirm = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const result = await logout();
    if (!result.success) {
      setError('Failed to logout');
      setIsLoading(false);
    }
  };

  if (showConfirm) {
    return (
      <div className={styles.logoutConfirm} ref={confirmRef}>
        <p>Are you sure you want to logout?</p>
        <div className={styles.logoutButtons}>
          <button
            onClick={handleConfirm}
            className={`${styles.logoutButton} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Yes, Logout'}
          </button>
          <button
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={handleLogoutClick}
      className={`${styles.logoutButton} ${className || ''}`}
    >
      Logout
    </button>
  );
}; 