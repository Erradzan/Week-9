import React from 'react';
import { Field, ErrorMessage } from 'formik';

const PersonalInfo: React.FC = () => (
  <div className="space-y-6">
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Full Name</label>
      <Field
        name="fullName"
        placeholder="Full Name"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage name="fullName" component="div" className="text-sm text-red-600 mt-1" />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Email</label>
      <Field
        name="email"
        placeholder="Email"
        type="email"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Date of Birth</label>
      <Field
        name="dateOfBirth"
        placeholder="YYYY-MM-DD"
        type="date"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage name="dateOfBirth" component="div" className="text-sm text-red-600 mt-1" />
    </div>
  </div>
);

export default PersonalInfo;