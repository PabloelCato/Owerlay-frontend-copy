import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { Box } from '@mui/material';
import OwerlayThemeProvider from '@/components/OwerlayThemeProvider';
import { OwerlayContextProvider } from '@/components/OwerlayContextProvider';
import UploadModal from '@/components/UploadModal';

export const metadata: Metadata = {
  title: 'Owerlay',
  description: 'Owerlay - a virtual gallery',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Box component="body">
        <OwerlayContextProvider>
          <OwerlayThemeProvider options={{ key: 'mui' }}>
            {children}
            {modal}
            <UploadModal />
          </OwerlayThemeProvider>
        </OwerlayContextProvider>
      </Box>
    </html>
  );
}
