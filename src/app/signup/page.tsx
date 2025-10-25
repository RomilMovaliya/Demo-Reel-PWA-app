'use client';

import { signupUserInitialValues, signupUserSchema } from '@/utils/validation';
import { FormikProvider, useFormik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import { authSignUp, authConfirmSignUp } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: signupUserInitialValues,
    validationSchema: signupUserSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');
      
      const result = await authSignUp(values);
      
      if (result.success) {
        setSuccess('Account created! Please check your email for verification code.');
        setShowConfirmation(true);
      } else {
        setError(result.error || 'Sign up failed');
      }
      
      setIsLoading(false);
    },
    enableReinitialize: true,
    validateOnMount: true,
  });

  const handleConfirmSignUp = async () => {
    if (!confirmationCode.trim()) {
      setError('Please enter the confirmation code');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await authConfirmSignUp({
      email: formik.values.email,
      confirmationCode: confirmationCode.trim(),
    });

    if (result.success) {
      setSuccess('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setError(result.error || 'Verification failed');
    }

    setIsLoading(false);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg py-6! sm:p-8 border border-gray-200">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          {showConfirmation ? 'Verify Your Email' : 'Create Your Account'}
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

        {showConfirmation ? (
          <div className="py-5! px-10! flex flex-col gap-3">
            <p className="text-sm text-gray-600 mb-4">
              We've sent a verification code to {formik.values.email}. Please enter it below:
            </p>
            <div>
              <label htmlFor="confirmationCode" className="block text-md font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                id="confirmationCode"
                name="confirmationCode"
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full border border-gray-300 rounded-md px-3! py-1! sm:px-4 sm:py-2.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <button
              type="button"
              onClick={handleConfirmSignUp}
              disabled={isLoading}
              className="w-full py-2 sm:py-2.5 h-10 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="w-full py-2 text-sm text-blue-600 hover:text-blue-500 transition"
            >
              Back to Sign Up
            </button>
          </div>
        ) : (
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit} className="py-5! px-10! flex flex-col gap-3">
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-md font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John"
                className="w-full border border-gray-300 rounded-md px-3! py-1! sm:px-4 sm:py-2.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {touched.first_name && errors.first_name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-md font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Doe"
                className="w-full border border-gray-300 rounded-md px-3! py-1! sm:px-4 sm:py-2.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {touched.last_name && errors.last_name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.last_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@example.com"
                className="w-full border py-1! border-gray-300 rounded-md px-3!  sm:px-4 sm:py-2.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                className="w-full border py-1! border-gray-300 rounded-md px-3! sm:px-4 sm:py-2.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {touched.password && errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
              )}
            </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 sm:py-2.5 h-10 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          </FormikProvider>
        )}

        <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-600 underline hover:text-blue-500 transition"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
