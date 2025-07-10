import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Clock, DollarSign, User, Building } from 'lucide-react';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1000;
`;

const Modal = styled(motion.div)`
  background: white;
  border-radius: 24px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Header = styled.div`
  padding: 2rem 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 25px rgba(25, 135, 84, 0.3);
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f5132;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const Content = styled.div`
  padding: 1.5rem 2rem 2rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`;

const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  color: #0f5132;
  font-weight: 600;
`;

const ItemsList = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #e2e8f0;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemDescription = styled.div`
  font-weight: 500;
  color: #374151;
`;

const ItemDetails = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const ItemTotal = styled.div`
  font-weight: 600;
  color: #0f5132;
`;

const TotalAmount = styled.div`
  background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 1rem;
`;

const TotalLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const TotalValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
    transform: scale(1.05);
  }
`;

const ActionButtons = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &.primary {
    background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(25, 135, 84, 0.3);
    }
  }
  
  &.secondary {
    background: white;
    color: #374151;
    border-color: #d1d5db;
    
    &:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }
  }
`;

const TicketNumber = styled.div`
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const TicketLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const TicketValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: 'Monaco', 'Consolas', monospace;
`;

function SuccessModal({ data, onClose }) {
  if (!data) return null;

  const generateTicketNumber = () => {
    const prefix = 'PO';
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${date}-${random}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Modal
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>
            <X size={20} color="#6b7280" />
          </CloseButton>

          <Header>
            <SuccessIcon>
              <CheckCircle size={40} color="white" />
            </SuccessIcon>
            <Title>Request Submitted Successfully!</Title>
            <Subtitle>
              Your purchase order request has been forwarded to our ticketing system for processing.
            </Subtitle>
          </Header>

          <Content>
            <TicketNumber>
              <TicketLabel>Ticket Number</TicketLabel>
              <TicketValue>{generateTicketNumber()}</TicketValue>
            </TicketNumber>

                         <Section>
               <SectionTitle>
                 <User size={20} color="#198754" />
                 Request Details
               </SectionTitle>
               <InfoGrid>
                 <InfoItem>
                   <InfoLabel>Requestor</InfoLabel>
                   <InfoValue>{data.requesterName}</InfoValue>
                 </InfoItem>
                 {data.property && (
                   <InfoItem>
                     <InfoLabel>Property</InfoLabel>
                     <InfoValue>{data.property}</InfoValue>
                   </InfoItem>
                 )}
                 {data.propertyCode && (
                   <InfoItem>
                     <InfoLabel>Property Code</InfoLabel>
                     <InfoValue>{data.propertyCode}</InfoValue>
                   </InfoItem>
                 )}
                 <InfoItem>
                   <InfoLabel>Priority</InfoLabel>
                   <InfoValue>{data.priority}</InfoValue>
                 </InfoItem>
                 <InfoItem>
                   <InfoLabel>Required By</InfoLabel>
                   <InfoValue>{formatDate(data.requiredDate)}</InfoValue>
                 </InfoItem>
               </InfoGrid>
             </Section>

                         {data.vendorName && (
               <Section>
                 <SectionTitle>
                   <Building size={20} color="#198754" />
                   Vendor Information
                 </SectionTitle>
                 <InfoGrid>
                   <InfoItem>
                     <InfoLabel>Vendor/Supplier Name</InfoLabel>
                     <InfoValue>{data.vendorName}</InfoValue>
                   </InfoItem>
                 </InfoGrid>
               </Section>
             )}

                           {data.items && data.items.length > 0 && (
                 <Section>
                   <SectionTitle>
                     <DollarSign size={20} color="#198754" />
                     Items & Pricing
                   </SectionTitle>
                   <ItemsList>
                     {data.items.map((item, index) => (
                       <ItemRow key={index}>
                         <div>
                           <ItemDescription>{item.description}</ItemDescription>
                           {item.unitPrice && (
                             <ItemDetails>
                               Estimated Cost: {formatCurrency(item.unitPrice)}
                             </ItemDetails>
                           )}
                         </div>
                       </ItemRow>
                     ))}
                   </ItemsList>
                   
                   {data.subtotal && parseFloat(data.subtotal) > 0 && (
                     <div style={{ marginTop: '1rem' }}>
                       <div style={{ 
                         background: '#f8fafc', 
                         padding: '1rem', 
                         borderRadius: '12px',
                         border: '1px solid #e2e8f0'
                       }}>
                         <div style={{ 
                           display: 'flex', 
                           justifyContent: 'space-between', 
                           padding: '0.5rem 0',
                           borderBottom: '1px solid #e2e8f0'
                         }}>
                           <span style={{ fontWeight: '500', color: '#374151' }}>Subtotal:</span>
                           <span style={{ fontWeight: '600', color: '#0f5132' }}>{formatCurrency(data.subtotal)}</span>
                         </div>
                         <div style={{ 
                           display: 'flex', 
                           justifyContent: 'space-between', 
                           padding: '0.5rem 0',
                           borderBottom: '1px solid #e2e8f0'
                         }}>
                           <span style={{ fontWeight: '500', color: '#374151' }}>HST (13%):</span>
                           <span style={{ fontWeight: '600', color: '#0f5132' }}>{formatCurrency(data.hst)}</span>
                         </div>
                         <div style={{ 
                           background: 'linear-gradient(135deg, #198754 0%, #0f5132 100%)',
                           color: 'white',
                           padding: '1rem',
                           borderRadius: '8px',
                           marginTop: '0.5rem',
                           display: 'flex',
                           justifyContent: 'space-between',
                           fontWeight: '700',
                           fontSize: '1.1rem'
                         }}>
                           <span>Total:</span>
                           <span>{formatCurrency(data.totalWithHST)}</span>
                         </div>
                       </div>
                     </div>
                   )}
                 </Section>
               )}

                         {data.descriptionOfWork && (
               <Section>
                 <SectionTitle>
                   <Clock size={20} color="#198754" />
                   Description of Work
                 </SectionTitle>
                 <InfoItem>
                   <InfoValue style={{ fontWeight: 400, lineHeight: 1.6 }}>
                     {data.descriptionOfWork}
                   </InfoValue>
                 </InfoItem>
               </Section>
             )}
          </Content>

          <ActionButtons>
            <Button className="primary" onClick={onClose}>
              Submit Another Request
            </Button>
          </ActionButtons>
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
}

export default SuccessModal; 