'use client';

import React from 'react';
import { Box } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Image from 'next/image';
import { colors } from '@/constants';
import Locations from '@/components/locations';

const UploadImagePreview = ({
  files,
  setFiles,
  locations,
  setLocations,
}: {
  files: UploadFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  locations: string[];
  setLocations: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      {files.map((file: UploadFile, idx: number) => {
        const filePath = URL.createObjectURL(file.data);
        const removeFile = () => {
          const newArr = [...files];
          newArr.splice(idx, 1);
          setFiles(newArr);
        };

        return (
          <Box position="relative" key={idx}>
            <Image
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              style={{
                width: '100%',
                objectFit: 'contain',
              }}
              src={filePath}
              alt="image-for-upload"
              onLoad={() => URL.revokeObjectURL(filePath)}
            />
            <Box
              onClick={removeFile}
              component="span"
              sx={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: colors.bgDarkTranslucent,
                cursor: 'pointer',
              }}
            >
              <CloseRoundedIcon
                sx={{
                  color: colors.backgroundPrimary,
                  fontSize: '11px',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
              }}
            >
              <Locations
                index={idx}
                locations={locations}
                setLocations={setLocations}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default UploadImagePreview;
