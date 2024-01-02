import React from 'react';

import { Box } from '@mui/material';

import OverlayTopContent, {
  OverlayTopContentProps,
} from '@/components/OverlayTopContent';
import OverlayBottomContent, {
  OverlayBottomContentProps,
} from '@/components/OverlayBottomContent';
import Link from 'next/link';
import { routes } from '@/constants';

interface GalleryItemOverlayProps
  extends OverlayTopContentProps,
    OverlayBottomContentProps {
  imageId: string;
  showDelete?: boolean;
  onDelete?: () => void;
}

const GalleryItemOverlay: React.FC<GalleryItemOverlayProps> = ({
  imageId,
  favoriteRoute,
  addRoute,
  authorName,
  authorRoute,
  downloadRoute,
  showDelete,
  onDelete,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(22, 22, 22, 0.20)',
        transition: '0.5s',
        opacity: 0,
        ':hover': {
          opacity: 1,
        },
      }}
    >
      <Link
        href={`${routes.images}/${imageId}`}
        className={'block w-full h-full cursor-zoom-in'}
      ></Link>
      <OverlayTopContent
        favoriteRoute={favoriteRoute}
        addRoute={addRoute}
        showDelete={showDelete}
        onDelete={onDelete}
      />
      <OverlayBottomContent
        authorName={authorName}
        authorRoute={authorRoute}
        downloadRoute={downloadRoute}
      />
    </Box>
  );
};

export default GalleryItemOverlay;
