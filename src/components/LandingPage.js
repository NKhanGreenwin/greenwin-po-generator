import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Building2, Lock, Key, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f5132 0%, #198754 50%, #20c997 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    pointer-events: none;
  }
`;

const LoginCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 480px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  margin-bottom: 2.5rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const LogoIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(25, 135, 84, 0.3);
`;

const CompanyName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #0f5132;
  margin: 0;
  letter-spacing: -0.025em;
`;

const AppTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #198754;
  margin: 0.5rem 0 0 0;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 1rem 0 0 0;
`;

const AuthSection = styled.div`
  margin: 2rem 0;
`;

const AuthTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const AuthDescription = styled.p`
  color: #64748b;
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const AuthInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  &.success {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
    letter-spacing: normal;
    text-transform: none;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  
  &.success {
    color: #10b981;
  }
  
  &.error {
    color: #ef4444;
  }
`;

const AuthButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(25, 135, 84, 0.25);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(25, 135, 84, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SecurityInfo = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const SecurityTitle = styled.h4`
  color: #166534;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SecurityText = styled.p`
  color: #15803d;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  opacity: 0.1;
  color: white;
`;

function LandingPage({ onAuthorized }) {
  const [authCode, setAuthCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputStatus, setInputStatus] = useState(''); // '', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (authCode.toUpperCase() === 'XYZ') {
      setInputStatus('success');
      setTimeout(() => {
        onAuthorized();
      }, 500);
    } else {
      setInputStatus('error');
      setError('Invalid authorization code. Please check with your system administrator.');
      setAuthCode('');
      setTimeout(() => {
        setInputStatus('');
      }, 2000);
    }

    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setAuthCode(e.target.value);
    setError('');
    setInputStatus('');
  };

  return (
    <LandingContainer>
      <FloatingElements>
        <FloatingIcon
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '10%', left: '10%' }}
        >
          <Building2 size={48} />
        </FloatingIcon>
        <FloatingIcon
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ top: '20%', right: '15%' }}
        >
          <Shield size={36} />
        </FloatingIcon>
        <FloatingIcon
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{ bottom: '15%', left: '20%' }}
        >
          <Key size={40} />
        </FloatingIcon>
      </FloatingElements>

      <LoginCard
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Header>
          <LogoContainer>
            <LogoIcon>
              <Building2 size={32} color="white" />
            </LogoIcon>
            <div>
              <CompanyName>Greenwin</CompanyName>
              <AppTitle>PO Generator</AppTitle>
            </div>
          </LogoContainer>
          <Subtitle>
            Secure Purchase Order Management System
          </Subtitle>
        </Header>

        <AuthSection>
          <AuthTitle>
            <Lock size={20} />
            Employee Access Required
          </AuthTitle>
          <AuthDescription>
            Please enter your authorization code to access the system
          </AuthDescription>

          <form onSubmit={handleSubmit}>
            <InputContainer>
              <AuthInput
                type="text"
                value={authCode}
                onChange={handleInputChange}
                placeholder="Enter authorization code"
                maxLength={10}
                className={inputStatus}
                disabled={isLoading}
              />
              <InputIcon className={inputStatus}>
                {inputStatus === 'success' && <CheckCircle size={20} />}
                {inputStatus === 'error' && <AlertTriangle size={20} />}
                {inputStatus === '' && <Key size={20} />}
              </InputIcon>
            </InputContainer>

            <AuthButton
              type="submit"
              disabled={!authCode.trim() || isLoading}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Lock size={16} />
                  </motion.div>
                  Verifying...
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Access System
                </>
              )}
            </AuthButton>
          </form>

          {error && (
            <ErrorMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertTriangle size={16} />
              {error}
            </ErrorMessage>
          )}
        </AuthSection>

        <SecurityInfo>
          <SecurityTitle>
            <Shield size={16} />
            Secure Access
          </SecurityTitle>
          <SecurityText>
            This system is restricted to authorized Greenwin employees only. 
            Your access is logged and monitored for security purposes.
          </SecurityText>
        </SecurityInfo>
      </LoginCard>
    </LandingContainer>
  );
}

export default LandingPage; 