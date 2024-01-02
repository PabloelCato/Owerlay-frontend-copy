'use client';

import React from 'react';
import { Stack, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';

const UploadErrorImageStack = ({
  filePath,
  fileName,
}: {
  filePath: string;
  fileName: string;
}) => {
  return (
    <Stack>
      <Stack
        sx={{
          position: 'relative',
          width: '100px',
          height: '106px',
        }}
      >
        <Image
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          style={{
            width: 'auto',
            height: '100%',
            maxHeight: '80px',
            objectFit: 'contain',
          }}
          src={filePath}
          alt="image-upload-error"
          onLoad={() => URL.revokeObjectURL(filePath)}
        />
        <Tooltip title={fileName}>
          <Typography
            sx={{
              p: '0 5px',
              mt: '5px',
              fontSize: '14px',
              textAlign: 'center',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {fileName}
          </Typography>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default UploadErrorImageStack;
