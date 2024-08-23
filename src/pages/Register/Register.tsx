import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationProcess: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:8080/register', values);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again. in register');
    }
  };

  switch (step) {
    case 1:
      return (
        <Step1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <Step2
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    case 3:
      return (
        <Step3
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return null;
  }
};

export default RegistrationProcess;