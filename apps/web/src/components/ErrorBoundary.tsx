import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Safe Scroll UI error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-lg p-8">
          <div className="ss-card">
            <h1 className="text-xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-500">
              {this.state.message || 'Unexpected rendering error.'}
            </p>
            <button
              type="button"
              className="ss-btn-primary mt-4"
              onClick={() => window.location.assign('/')}
            >
              Return home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
