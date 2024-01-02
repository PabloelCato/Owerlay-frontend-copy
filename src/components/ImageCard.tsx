'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';

import Author from '@/components/Author';
import OverlayTopContent from '@/components/OverlayTopContent';
import ImageStats from '@/components/ImageStats';
import DownloadMenu from '@/components/DownloadMenu';
import { colors } from '@/constants';

const ImageCard = (cardData: {
  imgURL: string;
  authorName: string;
  authorRoute: string;
  followers: number;
}) => {
  return (
    <Stack spacing={'1rem'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          alignItems: { xs: 'center', md: 'space-between' },
          gap: { xs: '1rem', md: 0 },
        }}
      >
        <Author
          followers={cardData.followers}
          light={false}
          authorName={cardData.authorName}
          authorRoute={cardData.authorRoute}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: '0.5rem', md: '2rem' },
          }}
        >
          <OverlayTopContent buttonVariant={'outlined'} galleryItem={false} />
          <Stack
            direction="row"
            sx={{
              position: 'relative',
              borderRadius: '8px',
              border: '1px solid ' + colors.textPrimary,
              padding: '11px 22px',
            }}
          >
            <Typography
              sx={{
                width: '132px',
                fontSize: '18px',
                fontWeight: 'inherit',
                lineHeight: '24px',
              }}
            >
              Download
            </Typography>
            <DownloadMenu />
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          marginTop: '1rem',
        }}
      >
        <Image
          priority
          src={cardData.imgURL}
          alt="image"
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          style={{
            width: '100%',
            maxHeight: '800px',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box width="100%" height="3.5rem">
        <ImageStats />
      </Box>
    </Stack>
  );
};

export default ImageCard;
