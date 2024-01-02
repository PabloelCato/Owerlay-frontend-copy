import React from 'react';
import { getGalleryItem } from '@/lib/getGalleryItem';
import ModalOwerlay from '@/components/ModalOwerlay';
import ImageCard from '@/components/ImageCard';

const Page = async ({ params }: { params: { id: string } }) => {
  const { img, author } = await getGalleryItem(params.id);
  return (
    <ModalOwerlay>
      <ImageCard
        followers={10000}
        imgURL={img}
        authorName={author}
        authorRoute={'/author'}
      />
    </ModalOwerlay>
  );
};

export default Page;
