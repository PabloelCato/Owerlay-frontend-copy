'use client';

import React from 'react';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

import { Box } from '@mui/material';

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ButtonOwerlay from '@/components/ButtonOwerlay';
import Author, { AuthorProps } from '@/components/Author';
import { routes } from '@/constants';

export interface OverlayBottomContentProps extends AuthorProps {
  downloadRoute?: Route;
}

const OverlayBottomContent: React.FC<OverlayBottomContentProps> = ({
  authorName,
  authorRoute,
  downloadRoute,
}) => {
  const router = useRouter();
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    route: Route,
  ) => {
    e.stopPropagation();
    router.push(route ? route : routes.home);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        padding: '1rem',
        bottom: 0,
        left: 0,
        display: 'flex',
        gap: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Author
        followers={10000}
        authorName={authorName}
        authorRoute={authorRoute}
      ></Author>
      <ButtonOwerlay
        onClick={e => handleClick(e, downloadRoute ? downloadRoute : '')}
      >
        <FileDownloadOutlinedIcon
          sx={{
            fontSize: '1.5rem',
          }}
        />
      </ButtonOwerlay>
    </Box>
  );
};

export default OverlayBottomContent;
