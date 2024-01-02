'use client';

import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import OwerlaySearchIcon from '@/components/icons/OwerlaySearchIcon';
import { colors, routes } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Search = ({ searchFieldId }: { searchFieldId: number }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();
  const handleSearch = () => {
    if (searchValue) {
      router.push(`${routes.search}?query=${searchValue}`);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <TextField
        //pass as prop different id for Search components in different places,
        // in order to avoid warning: "Duplicate form field id in the same form"
        id={`website-search-${searchFieldId}`}
        fullWidth
        autoComplete="off"
        sx={{
          height: '100%',
          '& .MuiOutlinedInput-root': {
            height: '100%',
            background: colors.backgroundPrimary,
            '& input': {
              height: '100%',
              padding: { xs: '0 1rem 0 2.2rem', sm: '0 1rem 0 3rem' },
            },
          },
        }}
        placeholder="Discover quality images"
        inputProps={{ 'aria-label': 'search' }}
        onChange={e => setSearchValue(e.target.value)}
        onKeyUp={e => (e.key === 'Enter' ? handleSearch() : null)}
      />
      <Box
        sx={{
          width: '2.5rem',
          top: 0,
          left: 0,
          height: '100%',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.textPrimary,
          '> a > svg': {
            opacity: 0.7,
            '&:hover': {
              opacity: 1,
            },
          },
        }}
      >
        <Link href={searchValue ? `${routes.search}?query=${searchValue}` : ''}>
          <OwerlaySearchIcon fill={colors.textPrimary} />
        </Link>
      </Box>
    </Box>
  );
};

export default Search;
