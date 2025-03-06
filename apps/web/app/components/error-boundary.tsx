'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import styles from '../page.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className={styles.errorBoundary}>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <button 
        onClick={resetError}
        className={styles.submitButton}
      >
        Try again
      </button>
    </div>
  );
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public resetError = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  public render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorFallback 
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 