'use client';

import { Amplify } from 'aws-amplify';
import { useEffect } from 'react';

const AmplifyProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const userPoolId = process.env.NEXT_PUBLIC_AWS_USER_POOL_ID;
    const userPoolClientId = process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID;
    const region = process.env.NEXT_PUBLIC_AWS_REGION;

    // Debug logging
    console.log('AWS Config Debug:', {
      userPoolId: userPoolId ? `${userPoolId.substring(0, 10)}...` : 'NOT SET',
      userPoolClientId: userPoolClientId ? `${userPoolClientId.substring(0, 10)}...` : 'NOT SET',
      region: region || 'NOT SET'
    });

    if (!userPoolId || !userPoolClientId || !region) {
      console.error('Missing AWS Cognito environment variables!');
      return;
    }

    const awsConfig = {
      Auth: {
        Cognito: {
          userPoolId,
          userPoolClientId,
          region,
          signUpVerificationMethod: 'code' as const,
          loginWith: {
            email: true,
          },
        },
      },
    };

    // Configure Amplify on the client side
    Amplify.configure(awsConfig);
    console.log('Amplify configured successfully');
  }, []);

  return <>{children}</>;
};

export default AmplifyProvider;