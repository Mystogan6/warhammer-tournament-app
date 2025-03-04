import styles from "../../page.module.css";
import LoginForm from './login-form';

export const metadata = {
  title: 'Login - Warhammer App',
  description: 'Sign in to your Warhammer App account',
};

export default function LoginPage() {
  return <LoginForm />;
} 