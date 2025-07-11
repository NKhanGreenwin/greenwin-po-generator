import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import POForm from './components/POForm';
import SuccessModal from './components/SuccessModal';
import { sendDirectEmail, sendPurchaseOrderEmail } from './utils/emailService';

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

function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmittedData(null);
  };

  return (
    <AppContainer>
      <MainContent>
        <ContentWrapper
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <POForm 
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
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