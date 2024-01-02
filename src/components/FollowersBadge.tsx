import React from 'react';
import { Box, Typography } from '@mui/material';

import OwerlayPeopleIcon from '@/components/icons/OwerlayPeopleIcon';
import { colors } from '@/constants';

type FollowersBadgeProps = {
  followers: number;
  light?: boolean;
};

const FollowersBadge: React.FC<FollowersBadgeProps> = ({
  followers,
  light,
}) => {
  const followersString = `${
    followers > 1000 ? (followers / 1000).toFixed(1) + 'k' : followers
  }`;

  return (
    <Box
      display={'flex'}
      gap={'0.5rem'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <OwerlayPeopleIcon fill={light ? colors.textLight : colors.textPrimary} />
      <Typography
        sx={{
          fontSize: { xs: '14px', lg: '16px' },
          fontWeight: 400,
        }}
      >
        {followersString} Followers
      </Typography>
    </Box>
  );
};

export default FollowersBadge;
