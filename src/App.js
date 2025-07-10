import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import POForm from './components/POForm';
import SuccessModal from './components/SuccessModal';

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

  const handleFormSubmit = (formData) => {
    setSubmittedData(formData);
    setShowSuccessModal(true);
    
    // Here you would typically send the data to your ticketing system
    console.log('Form submitted:', formData);
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