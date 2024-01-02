import React from 'react';
import { Alert } from '@mui/material';

interface AlertProps {
  severity: 'error' | 'warning' | 'info' | 'success';
}

const MessageBanners = ({ messages }: { messages: MessageBanners }) => {
  const banners: React.ReactNode[] = [];

  const messageTypeMap: { [key: string]: string } = {
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  for (const [_, value] of Object.entries(messages)) {
    for (const [k, v] of Object.entries(value)) {
      const bannerType = messageTypeMap[k] || 'success';
      if (v) {
        banners.push(
          <Alert
            key={`${k}-${Date.now().toString().slice(-4)}`}
            severity={bannerType as AlertProps['severity']}
            sx={{
              width: '100%',
            }}
          >
            {v as string}
          </Alert>,
        );
      }
    }
  }
  return banners;
};

export default MessageBanners;
