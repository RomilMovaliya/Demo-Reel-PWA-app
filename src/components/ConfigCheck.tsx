'use client';

import { useEffect, useState } from 'react';

const ConfigCheck = () => {
  const [configStatus, setConfigStatus] = useState<{
    userPoolId: boolean;
    clientId: boolean;
    region: boolean;
  }>({
    userPoolId: false,
    clientId: false,
    region: false,
  });

  useEffect(() => {
    setConfigStatus({
      userPoolId: !!process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
      clientId: !!process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
      region: !!process.env.NEXT_PUBLIC_AWS_REGION,
    });
  }, []);

  const allConfigured = Object.values(configStatus).every(Boolean);

  if (allConfigured) {
    return null; // Don't show anything if all is good
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center text-sm z-50">
      <strong>Configuration Error:</strong> Missing AWS Cognito environment variables.
      {!configStatus.userPoolId && ' USER_POOL_ID'}
      {!configStatus.clientId && ' CLIENT_ID'}
      {!configStatus.region && ' REGION'}
    </div>
  );
};

export default ConfigCheck;