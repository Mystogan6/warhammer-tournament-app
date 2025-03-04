'use client';

import Image from 'next/image';
import styles from '../page.module.css';
import { useAppAuth } from '../lib/hooks';

export type SocialProvider = 'google' | 'facebook' | 'discord';

interface SocialButtonsProps {
  onError?: (error: string) => void;
  isLoading?: boolean;
}

const SocialButtons = ({ onError, isLoading = false }: SocialButtonsProps) => {
  const { login } = useAppAuth();

  const handleSocialLogin = async (provider: SocialProvider) => {
    // In a real app, this would redirect to the OAuth provider
    const result = await login({ username: 'demo_user', password: 'demo' });
    if (!result.success && onError) {
      onError(`${provider} login failed`);
    }
  };

  return (
    <div className={styles.socialButtons}>
      <button 
        type="button" 
        className={styles.socialButton} 
        disabled={isLoading}
        onClick={() => handleSocialLogin('google')}
      >
        <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
        Google
      </button>
      <button 
        type="button" 
        className={styles.socialButton} 
        disabled={isLoading}
        onClick={() => handleSocialLogin('facebook')}
      >
        <Image src="/facebook-icon.svg" alt="Facebook" width={20} height={20} />
        Facebook
      </button>
      <button 
        type="button" 
        className={styles.socialButton} 
        disabled={isLoading}
        onClick={() => handleSocialLogin('discord')}
      >
        <Image src="/discord-icon.svg" alt="Discord" width={20} height={20} />
        Discord
      </button>
    </div>
  );
};

export default SocialButtons; 