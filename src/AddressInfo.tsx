import React from 'react';
import { Field, ErrorMessage } from 'formik';

const AddressInfo: React.FC = () => (
  <div className="space-y-6">
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Street Address</label>
      <Field
        name="streetAddress"
        placeholder="Street Address"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage name="streetAddress" component="div" className="text-sm text-red-600 mt-1" />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">City</label>
      <Field
        name="city"
        placeholder="City"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage name="city" component="div" className="text-sm text-red-600 mt-1" />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">State</label>
      <Field
        name="state"
        placeholder="State"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage name="state" component="div" className="text-sm text-red-600 mt-1" />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Zip Code</label>
      <Field
        name="zipCode"
        placeholder="Zip Code"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage name="zipCode" component="div" className="text-sm text-red-600 mt-1" />
    </div>
  </div>
);

export default AddressInfo;