import Link from 'next/link';
import styles from './dashboard.module.css';
import { ROUTES } from '../lib/routes';

export default function Dashboard() {
  // Hardcoded user for now
  const user = {
    name: "John Doe"
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>Warhammer App</div>
          <div className={styles.userInfo}>
            <span>Welcome, {user.name}</span>
            <Link href={ROUTES.LOGIN} className={styles.logoutButton}>Logout</Link>
          </div>
        </nav>
      </header>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Your Dashboard, {user.name}!
        </h1>
        <p className={styles.description}>
          Get started by exploring your personalized content below.
        </p>
      </main>
    </div>
  );
} 