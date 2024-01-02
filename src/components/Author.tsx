'use client';

import { Route } from 'next';
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import UserIcon from '@mui/icons-material/AccountCircle';
import FollowersBadge from '@/components/FollowersBadge';
import { colors } from '@/constants';

export type AuthorProps = {
  light?: boolean;
  authorName: string;
  authorRoute?: Route;
  followers?: number;
};

const Author: React.FC<AuthorProps> = ({
  light = true,
  authorName,
  authorRoute,
  followers = 0,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: light ? colors.textLight : colors.textPrimary,
      }}
    >
      <Link
        onClick={e => e.stopPropagation()}
        href={authorRoute ? authorRoute : '/'}
      >
        <UserIcon
          sx={{
            fontSize: '45px',
          }}
        />
      </Link>
      <Stack>
        <Link
          onClick={e => e.stopPropagation()}
          href={authorRoute ? authorRoute : '/'}
        >
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: { xs: '16px', lg: '18px' },
              fontWeight: 600,
            }}
          >
            {authorName}
          </Typography>
        </Link>
        <FollowersBadge light={light} followers={followers} />
      </Stack>
    </Box>
  );
};

export default Author;
