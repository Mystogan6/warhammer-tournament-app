'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '../page.module.css';
import { useAppAuth } from '../lib/hooks';

const LogoutButton = () => {
  const { logout } = useAppAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const confirmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (confirmRef.current && !confirmRef.current.contains(event.target as Node)) {
        setShowConfirm(false);
        setError(null);
      }
    };

    if (showConfirm) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showConfirm]);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setError(null);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    const result = await logout();
    if (!result.success) {
      setError(result.error || 'Failed to logout');
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
      className={styles.logoutButton}
    >
      Logout
    </button>
  );
};

export default LogoutButton; 