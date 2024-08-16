import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import PersonalInfo from './PersonalInfo';
import AddressInfo from './AddressInfo';
import AccountInfo from './AccountInfo';
import Modal from './Modal';

interface FormValues {
  fullName: string;
  email: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  username: string;
  password: string;
}

const validationSchema = [
  Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
  }),
  Yup.object({
    streetAddress: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Zip Code is required'),
  }),
  Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  }),
];

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues: FormValues = {
    fullName: '',
    email: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    username: '',
    password: '',
  };

  const handleNext = (values: FormValues) => {
    if (step < validationSchema.length - 1) {
      setStep(step + 1);
    } else {
      console.log('Form Submitted', values);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button onClick={openModal} className="px-4 py-2 bg-blue-600 text-white hover:bg-green-600 flex justify-center items-center rounded-md">
        Sign Up
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema[step]}
          onSubmit={handleNext}
        >
          <Form>
            {step === 0 && <PersonalInfo />}
            {step === 1 && <AddressInfo />}
            {step === 2 && <AccountInfo />}
            <div className="mt-4">
              {step > 0 && (
                <button type="button" onClick={handleBack} className="px-4 py-2 bg-gray-600 text-white hover:bg-red-600 rounded-md mr-2">
                  Back
                </button>
              )}
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white hover:bg-green-600 rounded-md">
                {step === validationSchema.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default App;