import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const titleColor = '#374151';
const dataColor = '#7c7c85';

const ImageStats = () => {
  return (
    <Stack spacing={6} direction={'row'}>
      <Box>
        <Typography
          fontSize={'smaller'}
          fontWeight={'bolder'}
          display={'block'}
          color={titleColor}
        >
          Views
        </Typography>
        <Typography fontSize={'smaller'} display={'block'} color={dataColor}>
          133,256
        </Typography>
      </Box>
      <Box>
        <Typography
          fontSize={'smaller'}
          fontWeight={'bolder'}
          display={'block'}
          color={titleColor}
        >
          Downloads
        </Typography>
        <Typography fontSize={'smaller'} display={'block'} color={dataColor}>
          1,256
        </Typography>
      </Box>
      <Box>
        <Typography
          fontSize={'smaller'}
          fontWeight={'bolder'}
          display={'block'}
          color={titleColor}
        >
          Tags
        </Typography>
        <Typography fontSize={'smaller'} display={'block'} color={dataColor}>
          Tag1, Tag2, Tag3
        </Typography>
      </Box>
    </Stack>
  );
};

export default ImageStats;
