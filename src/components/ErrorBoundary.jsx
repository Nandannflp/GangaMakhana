import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at top left, rgba(212, 175, 55, 0.08), transparent 30%), linear-gradient(180deg, #fdfbf7 0%, #f7f3eb 100%)',
          padding: '24px',
          fontFamily: 'var(--font-secondary, sans-serif)',
          color: 'var(--color-text, #1A4331)',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '550px',
            background: 'var(--color-card, #ffffff)',
            border: '1px solid var(--color-border, rgba(0,0,0,0.06))',
            borderRadius: '28px',
            padding: '48px 32px',
            boxShadow: '0 20px 40px rgba(26, 67, 49, 0.15)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.12)',
              color: 'var(--color-accent, #D4AF37)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              margin: '0 auto 24px'
            }}>
              ⚠️
            </div>
            
            <h1 style={{
              fontSize: '2.2rem',
              fontFamily: 'var(--font-primary, serif)',
              color: 'var(--color-primary, #1A4331)',
              margin: '0 0 16px 0',
              fontWeight: 700
            }}>
              Unexpected Error Occurred
            </h1>
            
            <p style={{
              color: 'var(--color-text-light, #555555)',
              fontSize: '1.05rem',
              lineHeight: '1.6',
              margin: '0 0 32px 0'
            }}>
              We apologize for the inconvenience. A minor issue occurred while loading this page. You can reload the page or return to the homepage.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'var(--color-primary, #1A4331)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Reload Page
              </button>
              
              <button 
                onClick={this.handleReset}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'transparent',
                  color: 'var(--color-primary, #1A4331)',
                  border: '1px solid var(--color-border, rgba(0,0,0,0.1))',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Back to Homepage
              </button>
            </div>
            
            <p style={{
              marginTop: '32px',
              fontSize: '0.85rem',
              color: '#999999'
            }}>
              If this issue persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
