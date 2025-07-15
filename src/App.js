import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import POForm from './components/POForm';
import SuccessModal from './components/SuccessModal';
import { sendDirectEmail, sendPurchaseOrderEmail } from './utils/emailService';
import Confetti from 'react-confetti';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const TourButton = styled.button`
  position: fixed;
  top: 24px;
  right: 32px;
  z-index: 1000;
  background: #f9c846;
  color: #14532d;
  font-weight: 600;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 12px rgba(249,200,70,0.10);
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: #ffe066;
    box-shadow: 0 4px 16px rgba(249,200,70,0.16);
  }
`;

const Badge = styled.div`
  position: fixed;
  top: 80px;
  right: 32px;
  z-index: 1100;
  background: #198754;
  color: #fff;
  font-weight: 700;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  font-size: 1.1rem;
  box-shadow: 0 2px 12px rgba(25,135,84,0.10);
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Form submitted:', formData);
      
      // Send email to Starlight_Po@greenwin.freshservice.com
      const emailResult = await sendDirectEmail(formData);
      
      // Update form data with email result
      const updatedFormData = {
        ...formData,
        ticketNumber: emailResult.ticketNumber,
        emailSent: emailResult.success,
        emailMessage: emailResult.message
      };
      
      setSubmittedData(updatedFormData);
      setShowSuccessModal(true);
      
      if (emailResult.success) {
        console.log('Email sent successfully:', emailResult);
      } else {
        console.error('Email sending failed:', emailResult.error);
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Still show success modal even if email fails
      setSubmittedData({
        ...formData,
        ticketNumber: `PO-${Date.now().toString().slice(-6)}`,
        emailSent: false,
        emailMessage: 'Failed to send email automatically. Please contact support.'
      });
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTourEnd = () => {
    setShowConfetti(true);
    setShowBadge(true);
    setTimeout(() => setShowConfetti(false), 4000);
    setTimeout(() => setShowBadge(false), 6000);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmittedData(null);
  };

  return (
    <AppContainer>
      <TourButton onClick={() => setRunTour(true)}>Start Guided Tour</TourButton>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={400} />}
      {showBadge && <Badge>🏅 Guided Tour Complete!</Badge>}
      <MainContent>
        <ContentWrapper
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Routes>
            <Route path="/" element={
              <POForm 
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                runTour={runTour}
                onTourEnd={() => { setRunTour(false); handleTourEnd(); }}
              />
            } />
          </Routes>
        </ContentWrapper>
      </MainContent>
      {showSuccessModal && (
        <SuccessModal 
          data={submittedData} 
          onClose={closeSuccessModal} 
        />
      )}
    </AppContainer>
  );
}

export default App; 