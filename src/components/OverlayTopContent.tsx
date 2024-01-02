'use client';

import React from 'react';
import { Route } from 'next';
import { useRouter } from 'next/navigation';

import { Box } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ButtonOwerlay from '@/components/ButtonOwerlay';
import { routes } from '@/constants';

export type OverlayTopContentProps = {
  galleryItem?: boolean;
  buttonVariant?: 'outlined' | 'contained' | 'danger';
  favoriteRoute?: Route;
  addRoute?: Route;
  showDelete?: boolean;
  onDelete?: () => void;
};

const OverlayTopContent: React.FC<OverlayTopContentProps> = ({
  galleryItem = true,
  buttonVariant = 'contained',
  favoriteRoute,
  addRoute,
  showDelete = false,
  onDelete,
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
        position: galleryItem ? 'absolute' : 'relative',
        width: '100%',
        top: galleryItem ? '1rem' : 'auto',
        right: galleryItem ? '1rem' : 'auto',
        display: 'flex',
        gap: 1,
        justifyContent: { xs: 'center', sm: 'flex-end' },
      }}
    >
      <ButtonOwerlay
        variant={buttonVariant}
        onClick={e => handleClick(e, favoriteRoute ? favoriteRoute : '')}
      >
        <FavoriteRoundedIcon fontSize="medium" />
      </ButtonOwerlay>
      <ButtonOwerlay
        variant={buttonVariant}
        onClick={e => handleClick(e, addRoute ? addRoute : '')}
      >
        <AddIcon fontSize="medium" />
      </ButtonOwerlay>
      <ButtonOwerlay
        variant={buttonVariant}
        onClick={e => {
          e.stopPropagation();
          if (typeof onDelete === 'function') {
            onDelete();
          } else {
            console.error('onDelete is not a function');
          }
        }}
      >
        <DeleteOutlineIcon fontSize="medium" />
      </ButtonOwerlay>
    </Box>
  );
};

export default OverlayTopContent;
