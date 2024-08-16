import React from 'react';
import { Field, ErrorMessage } from 'formik';

const AccountInfo: React.FC = () => (
  <div className="space-y-6">
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Username</label>
      <Field
        name="username"
        placeholder="Username"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage name="username" component="div" className="text-sm text-red-600 mt-1" />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Password</label>
      <Field
        type="password"
        name="password"
        placeholder="Password"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
    </div>
  </div>
);

export default AccountInfo;