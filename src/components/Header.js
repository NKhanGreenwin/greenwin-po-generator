import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  User, 
  Clock, 
  Save, 
  RotateCcw, 
  FileText, 
  HelpCircle,
  Bell,
  Settings,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #0f5132 0%, #198754 100%);
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 20px rgba(15, 81, 50, 0.15);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
    animation: float 8s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-10px, -5px) rotate(1deg); }
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoPlaceholder = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #0f5132;
`;

const BrandInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CompanyName = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.025em;
`;

const AppTitle = styled.h2`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin: 0;
`;

const MiddleSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const SessionInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1rem;
  border-radius: 12px;
`;

const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f5132;
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const UserName = styled.span`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
`;

const UserRole = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
`;

const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuickActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid rgba(0, 0, 0, 0.9);
  }
`;

const ActionButtonContainer = styled.div`
  position: relative;
`;

const StatusBadge = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: #20c997;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(32, 201, 151, 0.5);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }
`;

const NotificationBadge = styled(motion.div)`
  position: relative;
  cursor: pointer;
`;

const NotificationDot = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 8px;
  height: 8px;
  background: #ff4757;
  border-radius: 50%;
  border: 2px solid white;
`;

const FormProgress = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  min-width: 160px;
`;

const ProgressBarContainer = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  height: 6px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #20c997 0%, #198754 100%);
  border-radius: 8px;
`;

const ProgressText = styled.div`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
`;

const ProgressIcon = styled.div`
  color: rgba(255, 255, 255, 0.8);
`;



function Header({ onSaveDraft, onClearForm, onHelp, formProgress = 0 }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressStatus = (progress) => {
    if (progress === 0) return 'Not Started';
    if (progress < 25) return 'Getting Started';
    if (progress < 50) return 'In Progress';
    if (progress < 75) return 'Half Complete';
    if (progress < 100) return 'Almost Done';
    return 'Complete';
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection>
          <LogoContainer
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LogoPlaceholder>
              {/* 
                To replace with actual Greenwin logo, replace the LogoIcon div below with:
                <img 
                  src="/path/to/greenwin-logo.svg" 
                  alt="Greenwin Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              */}
              <LogoIcon>
                <Building2 size={28} />
              </LogoIcon>
            </LogoPlaceholder>
            <BrandInfo>
              <CompanyName>Greenwin</CompanyName>
              <AppTitle>Purchase Order Generator</AppTitle>
            </BrandInfo>
          </LogoContainer>
        </LogoSection>

        <RightSection>
          <QuickActions>
            <ActionButtonContainer>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSaveDraft}
                onMouseEnter={(e) => e.target.setAttribute('data-tooltip', 'true')}
                onMouseLeave={(e) => e.target.removeAttribute('data-tooltip')}
              >
                <Save size={16} />
              </ActionButton>
              <Tooltip
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: 'none' }}
              >
                Save Draft
              </Tooltip>
            </ActionButtonContainer>
            
            <ActionButtonContainer>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClearForm}
              >
                <RotateCcw size={16} />
              </ActionButton>
              <Tooltip
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Clear Form
              </Tooltip>
            </ActionButtonContainer>
            
            <ActionButtonContainer>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onHelp}
              >
                <HelpCircle size={16} />
              </ActionButton>
              <Tooltip
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Help & Support
              </Tooltip>
            </ActionButtonContainer>

            <ActionButtonContainer>
              <NotificationBadge whileHover={{ scale: 1.05 }}>
                <ActionButton>
                  <Bell size={16} />
                </ActionButton>
                <NotificationDot />
              </NotificationBadge>
              <Tooltip
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Notifications (1)
              </Tooltip>
            </ActionButtonContainer>
          </QuickActions>
          <StatusBadge
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatusDot />
            System Online
          </StatusBadge>
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header; 