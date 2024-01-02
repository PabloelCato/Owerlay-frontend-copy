'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, LinearProgress, useTheme } from '@mui/material';
import {
  colors,
  galleryItemsGap,
  mainContentMaxWidth,
  routes,
} from '@/constants';
import GalleryItemOverlay from '@/components/GalleryItemOverlay';
import Image from 'next/image';
import BottomContentMobile from '@/components/BottomContentMobile';
import Link from 'next/link';

type GalleryItem = {
  id: number;
  imageURL: string;
  uuid: string;
  uploaderName: string;
  location: string;
  description: string;
  tags: string[];
};

const ImageGallery: React.FC<{
  userUuid?: string;
  showDelete?: boolean;
  onDelete?: (uuid: string) => Promise<void>;
}> = ({ userUuid, showDelete, onDelete }) => {
  const theme = useTheme();
  const mobileScr = useMediaQuery(theme.breakpoints.down('sm'));
  const smallScr = useMediaQuery(theme.breakpoints.down('md'));
  const mediumScr = useMediaQuery(theme.breakpoints.between('sm', 'xl'));
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<React.ReactNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDelete = useCallback(async uuid => {
    try {
      const response = await fetch(
        `http://localhost:8000/images?uuid=${uuid}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Error deleting image');
      }

      console.log('Image deleted successfully');

      // Update the images state to remove the deleted image
      setImages(currentImages =>
        currentImages.filter(image => image.uuid !== uuid),
      );
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  }, []); // Add any dependencies here if necessary

  useEffect(() => {
    console.log('ImageGallery useEffect running');
    setLoading(true);
    const fetchUrl = userUuid
      ? `http://localhost:8000/images?uuid=${userUuid}`
      : `http://localhost:8000/images`;

    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, [userUuid]);

  const generateMasonryGrid = useCallback(() => {
    let columns: number = mobileScr ? 1 : mediumScr ? 2 : 3;
    let columnContainers: { [key: string]: GalleryItem[] } = {};

    for (let i = 0; i < columns; i++) {
      columnContainers[`column${i}`] = [];
    }
    images.forEach((item, i) => {
      columnContainers[`column${i % columns}`].push(item);
    });

    const masonryGrid = [];

    for (let i = 0; i < columns; i++) {
      let columnContents: React.JSX.Element[] = [];
      columnContainers[`column${i}`].forEach(item => {
        columnContents.push(
          <Box key={item.id} sx={{ position: 'relative' }}>
            {smallScr ? (
              <React.Fragment>
                <Link
                  href={`${routes.images}/${item.id}`}
                  className={'cursor-zoom-in'}
                >
                  <Image
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ width: '100%' }}
                    src={item.imageURL}
                    alt="Gallery image"
                  />
                </Link>
                <BottomContentMobile />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Image
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ width: '100%' }}
                  src={item.imageURL}
                  alt="Gallery image"
                />
                <GalleryItemOverlay
                  imageId={item.id != null ? item.id.toString() : ''}
                  authorName={item.location}
                  favoriteRoute={'/'}
                  addRoute={'/'}
                  authorRoute={'/'}
                  downloadRoute={'/'}
                  showDelete={showDelete}
                  onDelete={() => handleDelete(item.uuid)}
                />
              </React.Fragment>
            )}
          </Box>,
        );
      });

      const columnElement = (
        <Box
          key={`Column${i}`}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: galleryItemsGap,
          }}
        >
          {columnContents}
        </Box>
      );

      masonryGrid.push(columnElement);
    }
    return masonryGrid;
  }, [images, mobileScr, smallScr, mediumScr, showDelete, handleDelete]);

  useEffect(() => {
    if (!loading) {
      const items = generateMasonryGrid();
      setGalleryItems(items);
    }
  }, [generateMasonryGrid, loading]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: galleryItemsGap,
        width: { xs: '100%', md: '85%', lg: '70%' },
        maxWidth: mainContentMaxWidth,
        color: colors.textSecondary,
      }}
    >
      {galleryItems}
    </Box>
  );
};

export default ImageGallery;
