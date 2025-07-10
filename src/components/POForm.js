import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  ShoppingCart, 
  Building, 
  User, 
  Calendar, 
  DollarSign, 
  FileText, 
  Send,
  Plus,
  Trash2,
  Store
} from 'lucide-react';

const FormContainer = styled.div`
  padding: 2.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  line-height: 1.5;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #0f5132;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.6;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled(motion.div)`
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  color: #0f5132;
  letter-spacing: -0.015em;
  margin: 0;
`;

const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0; /* Prevents grid overflow */
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
  text-transform: none;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 400;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
`;

const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 400;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;
  height: auto;
  min-height: 50px; /* Match input field height */

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
  }

  option {
    padding: 0.5rem;
    font-size: 0.9375rem;
    font-weight: 400;
  }
`;

const GLCodeSelect = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 400;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;
  height: auto;
  min-height: 50px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
  }

  option {
    padding: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TextArea = styled.textarea`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  transition: all 0.2s ease;
  background: white;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemRow = styled.div`
  padding: 1.25rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemTopRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.8fr 1.2fr auto;
  gap: 1rem;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: stretch;
  }
`;

const ItemBottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #198754 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(25, 135, 84, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1.25rem 2rem;
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  box-shadow: 0 8px 25px rgba(25, 135, 84, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(25, 135, 84, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.8125rem;
  font-weight: 400;
  margin-top: 0.25rem;
`;

const TotalsContainer = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
  
  &.final-total {
    background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
    color: white;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 0.5rem;
    font-weight: 700;
    font-size: 1.0625rem;
  }
`;

const TotalRowLabel = styled.span`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #374151;
  
  .final-total & {
    color: white;
  }
`;

const TotalRowValue = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f5132;
  
  .final-total & {
    color: white;
  }
`;

function POForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [items, setItems] = useState([{ description: '', qty: '', unitPrice: '', glCode: '', expenseType: '' }]);

  // Property code mapping
  const propertyCodeMapping = {
    "2360 Weston Road": "west2360",
    "2450 & 2460 Weston Road": "west2450", 
    "255 & 265 Westwood Road": "west0255",
    "2200 Roche Court": "roch2200",
    "57 Forest Avenue": "fore0057",
    "772 Paisley Road, 4 Ryde Road and 3 Candlewood Drive": "pais0772",
    "160 Market Street": "mark0160",
    "145 Cosburn Avenue": "cosb0145",
    "151 Hughson Street South": "hugh0151",
    "294 Chandler Drive": "chan0286"
  };

  // GL Code options with expense types
  const glCodeOptions = [
    { code: "5000-0100", name: "Repairs & Maintenance", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0101", name: "InSuite - Cleaning", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0103", name: "InSuite - Electrical Repairs and Supplies", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0104", name: "InSuite - Flooring Repairs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0105", name: "InSuite - Painting & Plastering", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0106", name: "InSuite - Appliance Repairs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0107", name: "InSuite - Maintenance Chargeback", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0108", name: "InSuite - Pest Control", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0109", name: "InSuite - Plumbing", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0300", name: "Non Contract - Repair & Maintenance", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0301", name: "Non Contract - Boiler/HVAC and Electrical", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0302", name: "Non Contract - Cleaning", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0306", name: "Non Contract - Elevator", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0307", name: "Non Contract - Fire and Life Safety", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0309", name: "Non Contract - Landscaping", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0310", name: "Non Contract - Painting and Plastering", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0312", name: "Non Contract - Parking and Garage", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0313", name: "Non Contract - Pest Control", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0314", name: "Non Contract - Plumbing Repairs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0316", name: "Non Contract - Amenities", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0318", name: "Non Contract - Roof Repairs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0321", name: "Non Contract - Snow Removal", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0322", name: "Non Contract - Building Supplies", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0323", name: "Non Contract - Elevator and Intercom - Telephone", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0324", name: "Non Contract - Waste Disposal", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0325", name: "Non Contract - Doors and Windows", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0327", name: "Non Contract - Security", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0335", name: "Non Contract - Property owned Vehicle costs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0350", name: "Non Contract - Generator (Fuel & Repair)", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0400", name: "Contract - Boiler/HVAC and Electrical", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0401", name: "Contract - Cleaning", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0403", name: "Contract - Elevator", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0404", name: "Contract - Fire and Life Safety", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0405", name: "Contract - Landscaping", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0406", name: "Contract - Pest Control", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0407", name: "Contract - Pool", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0408", name: "Contract - Snow Removal", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0409", name: "Contract - Waste Disposal", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0410", name: "Contract - Security", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0411", name: "Contract - Generator", expenseType: "PMC Opex (Contract)" },
    { code: "5000-1706", name: "Marketing Leasing Costs", expenseType: "PMC - Opex (Marketing)" },
    { code: "5000-1800", name: "Advertising and Promotion", expenseType: "PMC - Opex (Marketing)" },
    { code: "5000-1806", name: "Marketing Materials", expenseType: "PMC - Opex (Marketing)" },
    { code: "5000-1702", name: "Office and Supplies", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-1712", name: "Computer Licensing", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-1717", name: "Resident and Employee events", expenseType: "PMC Opex (Non-Contract)" },
    { code: "8000-1000", name: "In-Suite Capital Cost", expenseType: "PMC - Suite TO" },
    { code: "8000-1200", name: "PMC - Suite Turnover - First Turn", expenseType: "PMC - Suite TO" },
    { code: "8000-1201", name: "PMC - Suite Turnover - Second turn", expenseType: "PMC - Suite TO" },
    { code: "8000-1202", name: "PMC - Suite Turnover - Submetering Refresh", expenseType: "PMC - Suite TO" },
    { code: "8000-1203", name: "PMC - Suite Turnover - Standard Turn", expenseType: "PMC - Suite TO" },
    { code: "8000-1204", name: "PMC - Suite Renovations - Occupied Units", expenseType: "PMC - Suite TO" },
    { code: "8000-1206", name: "PMC - Suite Renovations - Chargeback", expenseType: "PMC - Suite TO" },
    { code: "8000-1001", name: "Common Area Capital Cost", expenseType: "PMC - Capex" },
    { code: "8000-1300", name: "PMC - Amenities", expenseType: "PMC - Capex" },
    { code: "8000-1301", name: "PMC - Balconies", expenseType: "PMC - Capex" },
    { code: "8000-1302", name: "PMC - Base Building / Electrical", expenseType: "PMC - Capex" },
    { code: "8000-1303", name: "PMC - Building Envelope & Coating", expenseType: "PMC - Capex" },
    { code: "8000-1304", name: "PMC - Contingency", expenseType: "PMC - Capex" },
    { code: "8000-1305", name: "PMC - Corridor & Lobby Upgrades", expenseType: "PMC - Capex" },
    { code: "8000-1306", name: "PMC - Elevators", expenseType: "PMC - Capex" },
    { code: "8000-1307", name: "PMC - Energy Initiatives", expenseType: "PMC - Capex" },
    { code: "8000-1308", name: "PMC - Entrance Upgrades", expenseType: "PMC - Capex" },
    { code: "8000-1309", name: "PMC - Fire & Life", expenseType: "PMC - Capex" },
    { code: "8000-1310", name: "PMC - Landscaping Upgrades", expenseType: "PMC - Capex" },
    { code: "8000-1311", name: "PMC - Parking Garage & Asphalt", expenseType: "PMC - Capex" },
    { code: "8000-1312", name: "PMC - Plumbing, Boiler & Mechanical/HVAC", expenseType: "PMC - Capex" },
    { code: "8000-1313", name: "PMC - Roof Repairs or Replacement", expenseType: "PMC - Capex" },
    { code: "8000-1314", name: "PMC - Security Upgrades", expenseType: "PMC - Capex" },
    { code: "8000-1315", name: "PMC - Suite Addition", expenseType: "PMC - Capex" },
    { code: "8000-1316", name: "PMC - Windows & Doors", expenseType: "PMC - Capex" },
    { code: "8000-1317", name: "PMC - Insurance Claims", expenseType: "PMC - Capex" }
  ];



  // Watch for property changes and auto-populate property code
  const selectedProperty = watch("property");
  useEffect(() => {
    if (selectedProperty && propertyCodeMapping[selectedProperty]) {
      setValue("propertyCode", propertyCodeMapping[selectedProperty]);
    }
  }, [selectedProperty, setValue]);



  const addItem = () => {
    setItems([...items, { description: '', qty: '', unitPrice: '', glCode: '', expenseType: '' }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    // Auto-populate expense type when GL code is selected
    if (field === 'glCode' && value) {
      const selectedGLCode = glCodeOptions.find(option => option.code === value);
      if (selectedGLCode) {
        newItems[index]['expenseType'] = selectedGLCode.expenseType;
      }
    }
    
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const qty = parseFloat(item.qty) || 1;
      const price = parseFloat(item.unitPrice) || 0;
      return sum + (qty * price);
    }, 0);
  };

  const calculateHST = (subtotal) => {
    return subtotal * 0.13;
  };

  const calculateTotal = (subtotal, hst) => {
    return subtotal + hst;
  };

  // Format currency with commas
  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const onFormSubmit = (data) => {
    const subtotal = calculateSubtotal();
    const hst = calculateHST(subtotal);
    const total = calculateTotal(subtotal, hst);
    
    const formData = {
      ...data,
      items: items.filter(item => item.description.trim() !== ''),
      subtotal: subtotal.toFixed(2),
      hst: hst.toFixed(2),
      totalWithHST: total.toFixed(2),
      submittedAt: new Date().toISOString()
    };
    
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <FormHeader>
        <Title>Create Purchase Order Request</Title>
        <Subtitle>
          Quick and easy form to submit your purchase order request
        </Subtitle>
      </FormHeader>

      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            <User size={24} color="#198754" />
            <SectionTitle>Requestor Information</SectionTitle>
          </SectionHeader>
          
          <FieldGroup>
            <Field>
              <Label>Full Name *</Label>
              <Input
                {...register("requesterName", { required: "Name is required" })}
                placeholder="Enter your full name"
              />
              {errors.requesterName && <ErrorText>{errors.requesterName.message}</ErrorText>}
            </Field>
            
            <Field>
              <Label>Email Address *</Label>
              <Input
                type="email"
                {...register("requesterEmail", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="your.email@company.com"
              />
              {errors.requesterEmail && <ErrorText>{errors.requesterEmail.message}</ErrorText>}
            </Field>
          </FieldGroup>
        </Section>

        <Section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionHeader>
            <Building size={24} color="#198754" />
            <SectionTitle>Property & Work Details</SectionTitle>
          </SectionHeader>
          
          <FieldGroup>
            <Field>
              <Label>Property *</Label>
              <Select {...register("property", { required: "Property selection is required" })}>
                <option value="">Select Property</option>
                <option value="2360 Weston Road">2360 Weston Road</option>
                <option value="2450 & 2460 Weston Road">2450 & 2460 Weston Road</option>
                <option value="255 & 265 Westwood Road">255 & 265 Westwood Road</option>
                <option value="2200 Roche Court">2200 Roche Court</option>
                <option value="57 Forest Avenue">57 Forest Avenue</option>
                <option value="772 Paisley Road, 4 Ryde Road and 3 Candlewood Drive">772 Paisley Road, 4 Ryde Road and 3 Candlewood Drive</option>
                <option value="160 Market Street">160 Market Street</option>
                <option value="145 Cosburn Avenue">145 Cosburn Avenue</option>
                <option value="151 Hughson Street South">151 Hughson Street South</option>
                <option value="294 Chandler Drive">294 Chandler Drive</option>
              </Select>
              {errors.property && <ErrorText>{errors.property.message}</ErrorText>}
            </Field>

            <Field>
              <Label>Property Code (Auto-populated)</Label>
              <Input
                {...register("propertyCode")}
                placeholder="Select property above to auto-fill"
                readOnly
                style={{
                  backgroundColor: '#f8fafc',
                  color: '#64748b',
                  cursor: 'not-allowed'
                }}
              />
            </Field>

            <Field>
              <Label>Unit Number</Label>
              <Input
                {...register("unitNumber")}
                placeholder="Enter unit number"
              />
            </Field>
            
            <Field>
              <Label>Required By Date *</Label>
              <Input
                type="date"
                {...register("requiredDate", { required: "Required date is needed" })}
              />
              {errors.requiredDate && <ErrorText>{errors.requiredDate.message}</ErrorText>}
            </Field>
            
            <Field>
              <Label>Priority *</Label>
              <Select {...register("priority", { required: "Priority is required" })}>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </Select>
              {errors.priority && <ErrorText>{errors.priority.message}</ErrorText>}
            </Field>
          </FieldGroup>

          <Field style={{ marginTop: '1.5rem' }}>
            <Label>Description of Work *</Label>
            <TextArea
              {...register("descriptionOfWork", { required: "Description of work is required" })}
              style={{ minHeight: '120px' }}
            />
            {errors.descriptionOfWork && <ErrorText>{errors.descriptionOfWork.message}</ErrorText>}
          </Field>
        </Section>

        <Section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <SectionHeader>
            <Store size={24} color="#198754" />
            <SectionTitle>Vendor Information</SectionTitle>
          </SectionHeader>
          
          <Field>
            <Label>Vendor/Supplier Name *</Label>
            <Input
              {...register("vendorName", { required: "Vendor/Supplier name is required" })}
              placeholder="Name of vendor or supplier"
            />
            {errors.vendorName && <ErrorText>{errors.vendorName.message}</ErrorText>}
          </Field>
        </Section>

        <Section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader>
            <DollarSign size={24} color="#198754" />
            <SectionTitle>Items & Pricing</SectionTitle>
          </SectionHeader>
          
          <ItemsContainer>
            {items.map((item, index) => (
              <ItemRow key={index}>
                <ItemTopRow>
                  <Field>
                    <Label>Item Description *</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Describe the item or service"
                      required
                    />
                  </Field>

                  <Field>
                    <Label>Qty</Label>
                    <Input
                      type="number"
                      min="1"
                      max="999"
                      value={item.qty}
                      onChange={(e) => updateItem(index, 'qty', e.target.value)}
                      placeholder="1"
                      style={{ minWidth: '80px' }}
                    />
                  </Field>
                  
                  <Field>
                    <Label>Estimated Cost</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                      placeholder="0.00"
                    />
                  </Field>

                  {items.length > 1 && (
                    <RemoveButton type="button" onClick={() => removeItem(index)}>
                      <Trash2 size={16} />
                    </RemoveButton>
                  )}
                </ItemTopRow>

                <ItemBottomRow>
                  <Field>
                    <Label>GL Code</Label>
                    <GLCodeSelect
                      value={item.glCode}
                      onChange={(e) => updateItem(index, 'glCode', e.target.value)}
                    >
                      <option value="">Select GL Code</option>
                      {glCodeOptions.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.code} - {option.name}
                        </option>
                      ))}
                    </GLCodeSelect>
                  </Field>

                  <Field>
                    <Label>Expense Type</Label>
                    <Input
                      value={item.expenseType}
                      readOnly
                      placeholder="Auto-populated from GL Code"
                      style={{
                        backgroundColor: '#f8fafc',
                        color: '#64748b',
                        cursor: 'not-allowed'
                      }}
                    />
                  </Field>
                </ItemBottomRow>
              </ItemRow>
            ))}
            
            <AddButton type="button" onClick={addItem}>
              <Plus size={16} />
              Add Another Item
            </AddButton>
          </ItemsContainer>

          <TotalsContainer>
            <TotalRow>
              <TotalRowLabel>Subtotal:</TotalRowLabel>
              <TotalRowValue>${formatCurrency(calculateSubtotal())}</TotalRowValue>
            </TotalRow>
            <TotalRow>
              <TotalRowLabel>HST (13%):</TotalRowLabel>
              <TotalRowValue>${formatCurrency(calculateHST(calculateSubtotal()))}</TotalRowValue>
            </TotalRow>
            <TotalRow className="final-total">
              <TotalRowLabel>Total:</TotalRowLabel>
              <TotalRowValue>${formatCurrency(calculateTotal(calculateSubtotal(), calculateHST(calculateSubtotal())))}</TotalRowValue>
            </TotalRow>
          </TotalsContainer>
        </Section>

        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send size={20} />
          Submit Purchase Order Request
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}

export default POForm; 