'use client';

import { signinUserInitialValues, signinUserSchema } from '@/utils/validation';
import { FormikProvider, useFormik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import { authSignIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
    const router = useRouter();
    const { refreshAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: signinUserInitialValues,
        validationSchema: signinUserSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setError('');

            const result = await authSignIn(values);

            if (result.success && result.isSignedIn) {
                await refreshAuth(); // Refresh auth context
                router.push('/'); // Redirect to home or dashboard
            } else {
                setError(result.error || 'Login failed');
            }

            setIsLoading(false);
        },
        enableReinitialize: true,
        validateOnMount: true,
    });

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = formik;

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8 py-10">
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg py-6! sm:p-8 border border-gray-200">
                <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                    Login to your account
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <FormikProvider value={formik}>
                    <form onSubmit={handleSubmit} className="py-5! px-10! flex flex-col gap-3">

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

                        <Link
                            href="/forgot-password"
                            className=" text-xs text-right mt-[-10px]! text-blue-600 underline hover:text-blue-500 transition"
                        >
                            forgot password?
                        </Link>


                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 sm:py-2.5 h-10 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Login'}
                        </button>
                    </form>
                </FormikProvider>

                <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        href="/signup"
                        className="font-medium text-blue-600 underline hover:text-blue-500 transition"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
