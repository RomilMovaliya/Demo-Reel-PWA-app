'use client';

import { FormikProvider, useFormik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import { authResetPassword, authConfirmResetPassword } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
});

const resetPasswordSchema = yup.object().shape({
  confirmationCode: yup.string().required('Confirmation code is required'),
  newPassword: yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
});

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emailFormik = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');

      const result = await authResetPassword({ email: values.email });

      if (result.success) {
        setEmail(values.email);
        setSuccess('Reset code sent to your email!');
        setShowResetForm(true);
      } else {
        setError(result.error || 'Failed to send reset code');
      }

      setIsLoading(false);
    },
  });

  const resetFormik = useFormik({
    initialValues: { confirmationCode: '', newPassword: '' },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');

      const result = await authConfirmResetPassword({
        email,
        confirmationCode: values.confirmationCode,
        newPassword: values.newPassword,
      });

      if (result.success) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(result.error || 'Failed to reset password');
      }

      setIsLoading(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg py-6! sm:p-8 border border-gray-200">
        <h1 className="text-center text-xl sm:text-3xl font-bold text-gray-800 mb-6">
          {showResetForm ? 'Reset Password' : 'Forgot Password'}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {showResetForm ? (
          <FormikProvider value={resetFormik}>
            <form onSubmit={resetFormik.handleSubmit} className="py-5! px-10! flex flex-col gap-3">
              <p className="text-sm text-gray-600 mb-4">
                Enter the code sent to {email} and your new password:
              </p>
              
              <div>
                <label htmlFor="confirmationCode" className="block text-md font-medium text-gray-700 mb-1">
                  Confirmation Code
                </label>
                <input
                  id="confirmationCode"
                  name="confirmationCode"
                  type="text"
                  value={resetFormik.values.confirmationCode}
                  onChange={resetFormik.handleChange}
                  onBlur={resetFormik.handleBlur}
                  placeholder="Enter 6-digit code"
                  className="w-full border border-gray-300 rounded-md px-3! py-1! sm:px-4 sm:py-2.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                {resetFormik.touched.confirmationCode && resetFormik.errors.confirmationCode && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{resetFormik.errors.confirmationCode}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-md font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={resetFormik.values.newPassword}
                  onChange={resetFormik.handleChange}
                  onBlur={resetFormik.handleBlur}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-md px-3! py-1! sm:px-4 sm:py-2.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                {resetFormik.touched.newPassword && resetFormik.errors.newPassword && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{resetFormik.errors.newPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 sm:py-2.5 h-10 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>

              <button
                type="button"
                onClick={() => setShowResetForm(false)}
                className="w-full py-2 text-sm text-blue-600 hover:text-blue-500 transition"
              >
                Back to Email Entry
              </button>
            </form>
          </FormikProvider>
        ) : (
          <FormikProvider value={emailFormik}>
            <form onSubmit={emailFormik.handleSubmit} className="py-5! px-10! flex flex-col gap-3">
              <div>
                <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={emailFormik.values.email}
                  onChange={emailFormik.handleChange}
                  onBlur={emailFormik.handleBlur}
                  placeholder="you@example.com"
                  className="w-full border py-1! border-gray-300 rounded-md px-3! sm:px-4 sm:py-2.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                {emailFormik.touched.email && emailFormik.errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{emailFormik.errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 sm:py-2.5 h-10 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          </FormikProvider>
        )}

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
