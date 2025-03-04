import { cookies } from 'next/headers';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from './components/logout-button';
import { ROUTES } from './lib/routes';

const getAuthStatus = async () => {
  // This will be replaced with actual auth check using cookies/session
  return false;
};

const Page = async () => {
  const isAuthenticated = await getAuthStatus();

  if (isAuthenticated) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <div className={styles.logo}>
              Warhammer App
            </div>
            <div className={styles.navLinks}>
              <Link href="/dashboard" className={styles.dashboardLink}>
                Dashboard
              </Link>
              <LogoutButton />
            </div>
          </nav>
        </header>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome back!</h1>
          <p className={styles.description}>
            Ready to continue your Warhammer journey?
          </p>
          <div className={styles.cta}>
            <Link href="/dashboard" className={styles.ctaButton}>
              Go to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // If not authenticated, show public landing page
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>Warhammer App</div>
          <div className={styles.navLinks}>
            <Link href={ROUTES.LOGIN} className={styles.loginLink}>
              Sign in
            </Link>
            <Link href={ROUTES.SIGNUP} className={styles.signupButton}>
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Your Warhammer Journey Starts Here</h1>
        <p className={styles.description}>
          Join our community of Warhammer enthusiasts. Track your collection, plan your battles, and connect with fellow players.
        </p>
        <div className={styles.cta}>
          <Link href={ROUTES.SIGNUP} className={styles.ctaButton}>
            Get Started
          </Link>
          <Link href={ROUTES.ABOUT} className={styles.secondaryButton}>
            Learn More
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Page;
